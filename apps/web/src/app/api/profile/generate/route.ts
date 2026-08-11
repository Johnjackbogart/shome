import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { jsonError, parseBody } from "@/server/api";
import { getSessionOrNull } from "@/server/auth";

export const runtime = "nodejs";

const generateSchema = z.object({
  prompt: z.string().trim().min(2, "describe the portfolio you want").max(4_000),
  // Supplying the current draft lets a person make iterative requests while
  // keeping enough room for a useful model response.
  currentHtml: z.string().max(30_000).optional(),
});

const INSTRUCTIONS = `You create complete portfolio-page drafts for shome.

Return only a self-contained HTML fragment for the page body, beginning with a <style> tag. Do not use Markdown fences or explain your choices.

The result is inserted into a sandboxed iframe and sanitized before publication. Use only these HTML elements: div, section, article, aside, header, footer, nav, main, h1-h6, p, a, img, ul, ol, li, blockquote, code, pre, hr, br, strong, em, b, i, u, s, span, figure, figcaption, table, thead, tbody, tr, td, th, details, summary, mark, small, sub, sup, style. Do not use JavaScript, event handlers, external CSS, iframes, forms, SVG, or video. Keep all CSS in the style tag and make it responsive. Include an introduction, selected work, and a contact/link area. Use thoughtful placeholder copy when the brief omits details.`;

function cleanHtml(output: string): string {
  return output
    .trim()
    .replace(/^```(?:html)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

export async function POST(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const body = await parseBody(req, generateSchema);
  if (!body.ok) return body.res;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return jsonError(503, "OpenAI is not configured. Add OPENAI_API_KEY to apps/web/.env.");
  }

  const existing = body.data.currentHtml?.trim();
  const input = `Portfolio brief:\n${body.data.prompt}${
    existing ? `\n\nCurrent draft (improve or replace it to match the brief):\n${existing}` : ""
  }`;

  try {
    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model: process.env.OPENAI_PORTFOLIO_MODEL ?? "gpt-5.6-terra",
      instructions: INSTRUCTIONS,
      input,
      max_output_tokens: 5_000,
      reasoning: { effort: "low" },
      safety_identifier: createHash("sha256").update(session.user.id).digest("hex"),
      store: false,
      text: { verbosity: "high" },
    });
    const html = cleanHtml(response.output_text);
    if (html.includes("<") === false) {
      return jsonError(502, "OpenAI did not return a usable portfolio draft. Please try again.");
    }
    return NextResponse.json({ html });
  } catch (err) {
    console.error("portfolio generation failed", err);
    return jsonError(502, "OpenAI could not generate a portfolio right now. Please try again.");
  }
}

"use client";

import type { AppStyle } from "@shome/core";
import {
  type DragEvent,
  type PointerEvent,
  type UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type EditorMode = "visual" | "code" | "preview";
type CodePane = "html" | "css";
type VisualPane = "blocks" | "overlay";

type BuilderBlock = {
  id: string;
  html: string;
  label: string;
  detail: string;
};

type BuilderModel = {
  shell: string;
  slotMarkup: string;
  blocks: BuilderBlock[];
};

type BlockTemplate = {
  id: string;
  label: string;
  detail: string;
  html: string;
};

type BlockTextField = {
  id: string;
  path: number[];
  label: string;
  value: string;
};

type PointerDrag = {
  id: string;
  pointerId: number;
  startX: number;
  startY: number;
  moved: boolean;
};

const LAYOUT_BLOCK_DRAG_TYPE = "application/x-shome-layout-block";
const TEMPLATE_BLOCK_DRAG_TYPE = "application/x-shome-block";
const END_DROP_TARGET = "__shome-layout-end__";

const BLOCK_TEMPLATES: BlockTemplate[] = [
  {
    id: "heading",
    label: "Heading",
    detail: "Start a new section",
    html: `<section class="profile__section">
  <p class="profile__eyebrow">New section</p>
  <h2>Say something memorable.</h2>
  <p>Add the details in the code editor.</p>
</section>`,
  },
  {
    id: "text",
    label: "Text",
    detail: "A simple note",
    html: `<section class="profile__section">
  <p>Write a little more about what you are making, noticing, or sharing.</p>
</section>`,
  },
  {
    id: "divider",
    label: "Divider",
    detail: "Add breathing room",
    html: '<hr class="profile__divider">',
  },
  {
    id: "posts",
    label: "Posts",
    detail: "Your latest updates",
    html: `<section class="profile__section profile__posts">
  <div class="profile__section-heading">
    <h2>From the notebook</h2>
    <span>Latest posts</span>
  </div>
  <shome-posts />
</section>`,
  },
  {
    id: "shop",
    label: "Shop",
    detail: "Your visible products",
    html: `<section class="profile__section">
  <div class="profile__section-heading">
    <h2>Shop</h2>
    <span>Available now</span>
  </div>
  <shome-products />
</section>`,
  },
  {
    id: "stats",
    label: "Stats",
    detail: "Your follower counts",
    html: `<section class="profile__section">
  <div class="profile__section-heading">
    <h2>By the numbers</h2>
    <span>On shome</span>
  </div>
  <shome-stats />
</section>`,
  },
  {
    id: "followers",
    label: "Followers",
    detail: "People who follow you",
    html: `<section class="profile__section">
  <div class="profile__section-heading">
    <h2>Followers</h2>
    <span>People who follow me</span>
  </div>
  <shome-followers />
</section>`,
  },
  {
    id: "following",
    label: "Following",
    detail: "People you follow",
    html: `<section class="profile__section">
  <div class="profile__section-heading">
    <h2>Following</h2>
    <span>People I follow</span>
  </div>
  <shome-following />
</section>`,
  },
];

function shortText(value: string, fallback: string) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (!clean) return fallback;
  return clean.length > 54 ? `${clean.slice(0, 51)}…` : clean;
}

function blockInfo(node: Node, index: number): BuilderBlock {
  const html =
    node instanceof Element
      ? node.outerHTML
      : node.nodeType === Node.COMMENT_NODE
        ? `<!--${node.textContent ?? ""}-->`
        : (node.textContent ?? "");
  const text = shortText(node.textContent ?? "", "Empty block");
  const tagName =
    node instanceof Element
      ? node.tagName.toLowerCase()
      : node.nodeType === Node.COMMENT_NODE
        ? "note"
        : "text";
  const heading = node instanceof Element ? node.querySelector("h1, h2, h3, h4, h5, h6") : null;

  let label = tagName === "text" ? "Text" : tagName[0]?.toUpperCase() + tagName.slice(1);
  if (tagName === "hr") label = "Divider";
  if (tagName === "style") label = "Styles";
  if (html.includes("shome-posts")) label = "Posts";
  if (html.includes("shome-products")) label = "Shop";
  if (html.includes("shome-stats")) label = "Stats";
  if (html.includes("shome-followers")) label = "Followers";
  if (html.includes("shome-following")) label = "Following";
  if (heading?.textContent) label = shortText(heading.textContent, label);

  return {
    id: `block-${index}-${html.length}-${html.slice(0, 16)}`,
    html,
    label,
    detail: tagName === "text" ? text : `${tagName} · ${text}`,
  };
}

function movableNode(node: Node, includeStyles = false) {
  if (node.nodeType === Node.TEXT_NODE) return Boolean(node.textContent?.trim());
  if (node.nodeType === Node.COMMENT_NODE) return true;
  return (
    node.nodeType === Node.ELEMENT_NODE && (includeStyles || (node as Element).tagName !== "STYLE")
  );
}

function createSlot() {
  const slot = document.createElement("shome-builder-slot");
  slot.setAttribute("data-profile-builder", "true");
  return slot;
}

/**
 * The visual editor only moves top-level page blocks. The rest of the source
 * (including all CSS) stays in a shell, which makes switching to Code a
 * lossless way to work with custom markup.
 */
function makeBuilderModel(source: string): BuilderModel | null {
  if (typeof document === "undefined") return null;

  const template = document.createElement("template");
  template.innerHTML = source;
  const topLevel = Array.from(template.content.children);
  const main = topLevel.filter((element) => element.tagName === "MAIN")[0];
  const slot = createSlot();
  let nodes: Node[];

  if (main) {
    // Styles nested inside a main are uncommon, but retaining them as a block
    // is safer than silently dropping custom CSS when the layout is rearranged.
    nodes = Array.from(main.childNodes).filter((node) => movableNode(node, true));
    main.replaceChildren(slot);
  } else {
    nodes = Array.from(template.content.childNodes).filter((node) => movableNode(node));
    const firstNode = nodes[0];
    if (firstNode) {
      template.content.insertBefore(slot, firstNode);
      for (const node of nodes) node.parentNode?.removeChild(node);
    } else {
      template.content.append(slot);
    }
  }

  return {
    shell: template.innerHTML,
    slotMarkup: slot.outerHTML,
    blocks: nodes.map(blockInfo),
  };
}

function sourceFromBlocks(model: BuilderModel, blocks: BuilderBlock[]) {
  return model.shell.replace(
    model.slotMarkup,
    blocks.map((block) => block.html.trim()).join("\n\n"),
  );
}

function splitProfileSource(source: string) {
  const styles: string[] = [];
  const html = source.replace(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi, (_, css: string) => {
    styles.push(css.trim());
    return "";
  });
  return { html: html.trim(), css: styles.filter(Boolean).join("\n\n") };
}

function combineProfileSource(html: string, css: string) {
  const cleanHtml = html.trim();
  const cleanCss = css.trim();
  const style = cleanCss ? `<style>\n${cleanCss}\n</style>` : "";
  return [style, cleanHtml].filter(Boolean).join("\n\n");
}

function formatHtml(source: string) {
  const tokens = source.match(/<!--[\s\S]*?-->|<![^>]*>|<\/?[^>]+>|[^<]+/g) ?? [];
  const voidTags = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "source",
    "track",
    "wbr",
  ]);
  const lines: string[] = [];
  let indent = 0;

  for (const rawToken of tokens) {
    const token = rawToken.trim();
    if (!token) continue;
    const closing = /^<\//.test(token);
    const openingTag = token.match(/^<([a-z][\w-]*)\b/i)?.[1]?.toLowerCase();
    const selfClosing = /\/\s*>$/.test(token) || (openingTag ? voidTags.has(openingTag) : false);
    if (closing) indent = Math.max(0, indent - 1);
    lines.push(`${"  ".repeat(indent)}${token}`);
    if (openingTag && !selfClosing && !closing) indent += 1;
  }

  return lines.join("\n");
}

function formatCss(source: string) {
  const lines: string[] = [];
  let line = "";
  let indent = 0;
  let quote: "'" | '"' | null = null;
  let comment = false;
  let parentheses = 0;

  function flush() {
    const value = line.trim();
    if (value) lines.push(`${"  ".repeat(indent)}${value}`);
    line = "";
  }

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index] ?? "";
    const next = source[index + 1] ?? "";
    if (comment) {
      line += char;
      if (char === "*" && next === "/") {
        line += next;
        index += 1;
        comment = false;
        flush();
      }
      continue;
    }
    if (!quote && char === "/" && next === "*") {
      flush();
      line = "/*";
      index += 1;
      comment = true;
      continue;
    }
    if (quote) {
      line += char;
      if (char === quote && source[index - 1] !== "\\") quote = null;
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
      line += char;
    } else if (char === "(") {
      parentheses += 1;
      line += char;
    } else if (char === ")") {
      parentheses = Math.max(0, parentheses - 1);
      line += char;
    } else if (parentheses === 0 && char === "{") {
      line = `${line.trim()} {`;
      flush();
      indent += 1;
    } else if (parentheses === 0 && char === "}") {
      flush();
      indent = Math.max(0, indent - 1);
      lines.push(`${"  ".repeat(indent)}}`);
    } else if (parentheses === 0 && char === ";") {
      line += char;
      flush();
    } else {
      line += char;
    }
  }
  flush();
  return lines.join("\n");
}

function withBuilderOverlay(doc: string | null, selectedBlockIndex: number | null) {
  if (!doc) return null;
  const overlay = `<style id="shome-builder-overlay">
    body { counter-reset: shome-block; }
    body > main > :not(style), body > :not(style):not(main) {
      position: relative !important;
      outline: 2px solid rgba(99, 102, 241, .8) !important;
      outline-offset: 3px !important;
      counter-increment: shome-block;
    }
    body > main > :not(style)::after, body > :not(style):not(main)::after {
      content: "Block " counter(shome-block);
      position: absolute !important;
      z-index: 2147483647 !important;
      top: .35rem !important;
      right: .35rem !important;
      padding: .2rem .45rem !important;
      border-radius: 999px !important;
      background: #4f46e5 !important;
      color: #fff !important;
      font: 700 11px/1 ui-sans-serif, system-ui, sans-serif !important;
      letter-spacing: .03em !important;
      pointer-events: none !important;
    }
    body > main > :not(style), body > :not(style):not(main) {
      cursor: grab !important;
      user-select: none !important;
      touch-action: none !important;
    }
    [data-shome-builder-selected="true"] {
      outline-color: #f59e0b !important;
      box-shadow: 0 0 0 5px rgba(245, 158, 11, .22) !important;
    }
  </style>`;
  const bridge = `<script>
    (() => {
      const root = document.querySelector("body > main") || document.body;
      const blocks = Array.from(root.children).filter((element) => element.tagName !== "STYLE");
      const selectedIndex = ${selectedBlockIndex ?? -1};
      let drag = null;
      blocks.forEach((block, index) => {
        if (index === selectedIndex) block.setAttribute("data-shome-builder-selected", "true");
        block.setAttribute("data-shome-builder-index", String(index));
        block.addEventListener("pointerdown", (event) => {
          if (!event.isPrimary || event.button !== 0) return;
          drag = {
            index,
            pointerId: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            moved: false,
          };
          event.preventDefault();
          block.setPointerCapture?.(event.pointerId);
          const move = (moveEvent) => {
            if (!drag || drag.index !== index || drag.pointerId !== moveEvent.pointerId) return;
            if (Math.hypot(moveEvent.clientX - drag.x, moveEvent.clientY - drag.y) > 7) {
              drag.moved = true;
              moveEvent.preventDefault();
            }
          };
          const finish = (upEvent) => {
            document.removeEventListener("pointermove", move, true);
            document.removeEventListener("pointerup", finish, true);
            document.removeEventListener("pointercancel", cancel, true);
            if (!drag || drag.index !== index || drag.pointerId !== upEvent.pointerId) return;
            const currentDrag = drag;
            drag = null;
            if (!currentDrag.moved) {
              window.parent.postMessage({ source: "shome-profile-builder", type: "select", index }, "*");
              return;
            }
            const target = document.elementFromPoint(upEvent.clientX, upEvent.clientY)?.closest("[data-shome-builder-index]");
            const targetIndex = Number(target?.getAttribute("data-shome-builder-index"));
            if (!Number.isInteger(targetIndex) || targetIndex === currentDrag.index) return;
            const bounds = target.getBoundingClientRect();
            window.parent.postMessage({
              source: "shome-profile-builder",
              type: "move",
              from: currentDrag.index,
              to: targetIndex,
              before: upEvent.clientY < bounds.top + bounds.height / 2,
            }, "*");
          };
          const cancel = (cancelEvent) => {
            if (drag?.pointerId === cancelEvent.pointerId) drag = null;
            document.removeEventListener("pointermove", move, true);
            document.removeEventListener("pointerup", finish, true);
            document.removeEventListener("pointercancel", cancel, true);
          };
          document.addEventListener("pointermove", move, true);
          document.addEventListener("pointerup", finish, true);
          document.addEventListener("pointercancel", cancel, true);
        });
      });
    })();
  </script>`;
  // This is an editor-only document. Author scripts are stripped by the
  // profile sanitizer; the inline bridge above only reports block selections.
  const interactiveDoc = doc.replace(
    "style-src 'unsafe-inline';",
    "style-src 'unsafe-inline'; script-src 'unsafe-inline';",
  );
  // The bridge needs the profile blocks to exist before it queries them. Keep
  // styles in the head, but put the script at the end of the parsed body.
  return interactiveDoc
    .replace("</head>", `${overlay}</head>`)
    .replace("</body>", `${bridge}</body>`);
}

function escapeCode(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function highlightHtml(source: string) {
  const tagPattern = /<!--[\s\S]*?-->|<\/?[a-z][^>]*>/gi;
  const attributePattern = /([:\w-]+)(\s*=\s*)("[^"]*"|'[^']*'|[^\s"'=<>`]+)/g;
  let result = "";
  let cursor = 0;

  for (const match of source.matchAll(tagPattern)) {
    const tag = match[0];
    const index = match.index ?? 0;
    result += escapeCode(source.slice(cursor, index));
    cursor = index + tag.length;
    if (tag.startsWith("<!--")) {
      result += `<span class="text-slate-500">${escapeCode(tag)}</span>`;
      continue;
    }
    const parts = tag.match(/^(<\/?)([\w:-]+)([\s\S]*?)(\/?>)$/);
    if (!parts) {
      result += `<span class="text-fuchsia-300">${escapeCode(tag)}</span>`;
      continue;
    }
    const opening = parts[1] ?? "";
    const name = parts[2] ?? "";
    const attributes = parts[3] ?? "";
    const closing = parts[4] ?? "";
    let renderedAttributes = "";
    let attributeCursor = 0;
    for (const attribute of attributes.matchAll(attributePattern)) {
      const attributeIndex = attribute.index ?? 0;
      renderedAttributes += escapeCode(attributes.slice(attributeCursor, attributeIndex));
      renderedAttributes += `<span class="text-sky-300">${escapeCode(attribute[1] ?? "")}</span>`;
      renderedAttributes += `<span class="text-slate-400">${escapeCode(attribute[2] ?? "")}</span>`;
      renderedAttributes += `<span class="text-amber-200">${escapeCode(attribute[3] ?? "")}</span>`;
      attributeCursor = attributeIndex + attribute[0].length;
    }
    renderedAttributes += escapeCode(attributes.slice(attributeCursor));
    result += `<span class="text-slate-400">${escapeCode(opening)}</span><span class="text-fuchsia-300">${escapeCode(name)}</span>${renderedAttributes}<span class="text-slate-400">${escapeCode(closing)}</span>`;
  }
  return result + escapeCode(source.slice(cursor));
}

function highlightCss(source: string) {
  const tokenPattern =
    /\/\*[\s\S]*?\*\/|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|#[\da-f]{3,8}\b|@[\w-]+|(?:--)?[\w-]+(?=\s*:)|\b\d+(?:\.\d+)?(?:%|[a-z]+)?\b/gi;
  let result = "";
  let cursor = 0;

  for (const match of source.matchAll(tokenPattern)) {
    const token = match[0];
    const index = match.index ?? 0;
    result += escapeCode(source.slice(cursor, index));
    cursor = index + token.length;
    const color = token.startsWith("/*")
      ? "text-slate-500"
      : token.startsWith('"') || token.startsWith("'")
        ? "text-amber-200"
        : token.startsWith("#")
          ? "text-violet-300"
          : token.startsWith("@")
            ? "text-pink-300"
            : /^(?:--)?[\w-]+$/i.test(token) && source.slice(cursor).match(/^\s*:/)
              ? "text-sky-300"
              : "text-emerald-300";
    result += `<span class="${color}">${escapeCode(token)}</span>`;
  }
  return result + escapeCode(source.slice(cursor));
}

function HighlightedCodeEditor({
  language,
  value,
  onChange,
  placeholder,
  label,
  minHeightClass = "min-h-[32rem]",
}: {
  language: CodePane;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  minHeightClass?: string;
}) {
  const highlighted = useMemo(() => {
    if (!value) return `<span class="text-slate-600">${escapeCode(placeholder)}</span>`;
    return language === "html" ? highlightHtml(value) : highlightCss(value);
  }, [language, placeholder, value]);
  const highlightRef = useRef<HTMLPreElement>(null);

  function syncScroll(event: UIEvent<HTMLTextAreaElement>) {
    const preview = highlightRef.current;
    if (!preview) return;
    preview.scrollTop = event.currentTarget.scrollTop;
    preview.scrollLeft = event.currentTarget.scrollLeft;
  }

  return (
    <div className={`relative ${minHeightClass}`}>
      <pre
        ref={highlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-0 overflow-hidden rounded-xl border border-transparent px-3 py-2 font-mono text-[0.85rem] leading-relaxed whitespace-pre text-slate-200"
      >
        <code
          // biome-ignore lint/security/noDangerouslySetInnerHtml: user source is escaped before syntax spans are added.
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
      <textarea
        className={`input relative w-full resize-y bg-transparent! font-mono text-[0.85rem] leading-relaxed whitespace-pre text-transparent caret-slate-100 selection:bg-indigo-400/40 placeholder:text-transparent ${minHeightClass}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onScroll={syncScroll}
        spellCheck={false}
        wrap="off"
        aria-label={label}
      />
    </div>
  );
}

function moveBlock(blocks: BuilderBlock[], from: number, to: number) {
  const next = [...blocks];
  const [block] = next.splice(from, 1);
  if (!block) return blocks;
  next.splice(to, 0, block);
  return next;
}

function blockWithUpdatedSource(block: BuilderBlock, source: string, index: number): BuilderBlock {
  const template = document.createElement("template");
  template.innerHTML = source;
  const node = Array.from(template.content.childNodes).find(
    (candidate) => candidate.nodeType !== Node.TEXT_NODE || Boolean(candidate.textContent?.trim()),
  );
  if (!node)
    return { ...block, html: source, label: "Empty block", detail: "Add HTML to this block" };
  return { ...blockInfo(node, index), id: block.id, html: source };
}

function textFieldsFromBlock(source: string): BlockTextField[] {
  const template = document.createElement("template");
  template.innerHTML = source;
  const fields: BlockTextField[] = [];

  function visit(node: Node, path: number[]) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      const parent = node.parentElement;
      const tagName = parent?.tagName.toLowerCase();
      if (tagName && !["style", "code", "pre"].includes(tagName)) {
        fields.push({
          id: path.join("."),
          path,
          label: `${tagName} text`,
          value: node.textContent.trim(),
        });
      }
      return;
    }
    node.childNodes.forEach((child, index) => {
      visit(child, [...path, index]);
    });
  }

  visit(template.content, []);
  return fields;
}

function sourceWithTextFields(source: string, fields: BlockTextField[]) {
  const template = document.createElement("template");
  template.innerHTML = source;
  for (const field of fields) {
    let node: Node | undefined = template.content;
    for (const childIndex of field.path) {
      node = node?.childNodes[childIndex] ?? undefined;
    }
    if (node?.nodeType === Node.TEXT_NODE) node.textContent = field.value;
  }
  return template.innerHTML;
}

export function ProfilePageEditor({
  html,
  appStyle,
  onChange,
  previewDoc,
  previewError,
}: {
  html: string;
  appStyle: AppStyle;
  onChange: (html: string) => void;
  previewDoc: string | null;
  previewError: string | null;
}) {
  const [mode, setMode] = useState<EditorMode>("visual");
  const [visualPane, setVisualPane] = useState<VisualPane>("blocks");
  const [codePane, setCodePane] = useState<CodePane>("html");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);
  const [blockEditorPane, setBlockEditorPane] = useState<"text" | "html">("text");
  const [blockDraft, setBlockDraft] = useState("");
  const [blockTextFields, setBlockTextFields] = useState<BlockTextField[]>([]);
  const [blockError, setBlockError] = useState<string | null>(null);
  const [removedBlock, setRemovedBlock] = useState<{ block: BuilderBlock; index: number } | null>(
    null,
  );
  const lastCodeOutput = useRef<string | null>(null);
  const visualFrame = useRef<HTMLIFrameElement>(null);
  const draggedIdRef = useRef<string | null>(null);
  const pointerDrag = useRef<PointerDrag | null>(null);
  const model = useMemo(() => makeBuilderModel(html), [html]);
  const visualPreviewDoc = useMemo(
    () => withBuilderOverlay(previewDoc, selectedBlockIndex),
    [previewDoc, selectedBlockIndex],
  );
  const selectedBlock =
    selectedBlockIndex === null ? null : (model?.blocks[selectedBlockIndex] ?? null);

  useEffect(() => {
    if (mode !== "code" || html === lastCodeOutput.current) return;
    const parts = splitProfileSource(html);
    setHtmlCode(formatHtml(parts.html));
    setCssCode(formatCss(parts.css));
  }, [html, mode]);

  function applyBlocks(blocks: BuilderBlock[]) {
    if (!model) return;
    onChange(sourceFromBlocks(model, blocks));
  }

  function updateCode(nextHtml: string, nextCss: string) {
    const nextSource = combineProfileSource(nextHtml, nextCss);
    lastCodeOutput.current = nextSource;
    onChange(nextSource);
  }

  const openBlockEditor = useCallback(
    (index: number) => {
      const block = model?.blocks[index];
      if (!block) return;
      setSelectedBlockIndex(index);
      setBlockEditorPane("text");
      setBlockDraft(formatHtml(block.html));
      setBlockTextFields(textFieldsFromBlock(block.html));
      setBlockError(null);
    },
    [model],
  );

  function closeBlockEditor() {
    setSelectedBlockIndex(null);
    setBlockDraft("");
    setBlockTextFields([]);
    setBlockError(null);
  }

  function saveBlockEditor() {
    if (!model || selectedBlockIndex === null || !selectedBlock) return;
    const source =
      blockEditorPane === "text"
        ? sourceWithTextFields(selectedBlock.html, blockTextFields)
        : blockDraft;
    if (!source.trim()) {
      setBlockError("A block needs some HTML. Remove it instead if you no longer need it.");
      return;
    }
    const next = [...model.blocks];
    next[selectedBlockIndex] = blockWithUpdatedSource(selectedBlock, source, selectedBlockIndex);
    applyBlocks(next);
    setBlockError(null);
  }

  function moveSelectedBlock(direction: -1 | 1) {
    if (!model || selectedBlockIndex === null || !selectedBlock) return;
    const destination = selectedBlockIndex + direction;
    if (destination < 0 || destination >= model.blocks.length) return;
    onChange(sourceFromBlocks(model, moveBlock(model.blocks, selectedBlockIndex, destination)));
    setSelectedBlockIndex(destination);
    setBlockDraft(formatHtml(selectedBlock.html));
    setBlockTextFields(textFieldsFromBlock(selectedBlock.html));
    setBlockError(null);
  }

  const moveOverlayBlock = useCallback(
    (from: number, target: number, before: boolean) => {
      if (
        !model ||
        from < 0 ||
        target < 0 ||
        from >= model.blocks.length ||
        target >= model.blocks.length
      ) {
        return;
      }
      const targetAfterRemoval = from < target ? target - 1 : target;
      onChange(
        sourceFromBlocks(
          model,
          moveBlock(model.blocks, from, targetAfterRemoval + (before ? 0 : 1)),
        ),
      );
      setSelectedBlockIndex(null);
      setBlockDraft("");
      setBlockTextFields([]);
      setBlockError(null);
    },
    [model, onChange],
  );

  useEffect(() => {
    function receiveBlockSelection(event: MessageEvent) {
      if (event.source !== visualFrame.current?.contentWindow) return;
      const message = event.data as { source?: string; type?: string; index?: unknown } | null;
      if (message?.source !== "shome-profile-builder") {
        return;
      }
      if (
        message.type === "select" &&
        typeof message.index === "number" &&
        Number.isInteger(message.index)
      ) {
        openBlockEditor(message.index);
        return;
      }
      const move = message as { type?: string; from?: unknown; to?: unknown; before?: unknown };
      if (
        move.type === "move" &&
        typeof move.from === "number" &&
        typeof move.to === "number" &&
        typeof move.before === "boolean" &&
        Number.isInteger(move.from) &&
        Number.isInteger(move.to)
      ) {
        moveOverlayBlock(move.from, move.to, move.before);
      }
    }
    window.addEventListener("message", receiveBlockSelection);
    return () => window.removeEventListener("message", receiveBlockSelection);
  }, [moveOverlayBlock, openBlockEditor]);

  function addBlock(templateId: string, index = model?.blocks.length ?? 0) {
    const template = BLOCK_TEMPLATES.find((block) => block.id === templateId);
    if (!model || !template) return;
    const block = blockInfo(
      Object.assign(document.createElement("div"), { innerHTML: template.html }).firstChild ??
        document.createTextNode(template.html),
      model.blocks.length,
    );
    const next = [...model.blocks];
    next.splice(index, 0, block);
    applyBlocks(next);
  }

  function removeBlock(id: string) {
    if (!model) return;
    const index = model.blocks.findIndex((block) => block.id === id);
    const block = model.blocks[index];
    if (!block) return;
    setRemovedBlock({ block, index });
    applyBlocks(model.blocks.filter((item) => item.id !== id));
  }

  function restoreBlock() {
    if (!model || !removedBlock) return;
    const next = [...model.blocks];
    next.splice(Math.min(removedBlock.index, next.length), 0, removedBlock.block);
    setRemovedBlock(null);
    applyBlocks(next);
  }

  function reorder(dragId: string, targetId: string, before: boolean) {
    if (!model || dragId === targetId) return;
    const from = model.blocks.findIndex((block) => block.id === dragId);
    const target = model.blocks.findIndex((block) => block.id === targetId);
    if (from < 0 || target < 0) return;
    const targetAfterRemoval = from < target ? target - 1 : target;
    applyBlocks(moveBlock(model.blocks, from, targetAfterRemoval + (before ? 0 : 1)));
  }

  function draggedLayoutBlockId(event: DragEvent<HTMLElement>) {
    const candidate =
      event.dataTransfer.getData(LAYOUT_BLOCK_DRAG_TYPE) ||
      event.dataTransfer.getData("text/plain") ||
      draggedIdRef.current;
    return model?.blocks.some((block) => block.id === candidate) ? candidate : null;
  }

  function clearDragState() {
    draggedIdRef.current = null;
    pointerDrag.current = null;
    setDraggedId(null);
    setDropTarget(null);
  }

  function setDropEffect(event: DragEvent<HTMLElement>) {
    event.dataTransfer.dropEffect = event.dataTransfer.effectAllowed === "copy" ? "copy" : "move";
  }

  function dropOnBlock(event: DragEvent<HTMLElement>, targetId: string) {
    event.preventDefault();
    event.stopPropagation();
    const templateId = event.dataTransfer.getData(TEMPLATE_BLOCK_DRAG_TYPE);
    const target = model?.blocks.findIndex((block) => block.id === targetId) ?? -1;
    const before =
      event.clientY <
      event.currentTarget.getBoundingClientRect().top + event.currentTarget.offsetHeight / 2;
    if (templateId && target >= 0) addBlock(templateId, target + (before ? 0 : 1));
    else {
      const dragId = draggedLayoutBlockId(event);
      if (dragId) reorder(dragId, targetId, before);
    }
    clearDragState();
  }

  function dropOnCanvas(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    event.stopPropagation();
    const templateId = event.dataTransfer.getData(TEMPLATE_BLOCK_DRAG_TYPE);
    if (templateId) {
      addBlock(templateId);
    } else {
      const dragId = draggedLayoutBlockId(event);
      if (dragId && model) {
        const from = model.blocks.findIndex((block) => block.id === dragId);
        if (from >= 0) applyBlocks(moveBlock(model.blocks, from, model.blocks.length - 1));
      }
    }
    clearDragState();
  }

  function pointerTargetId(clientX: number, clientY: number) {
    const target = document
      .elementFromPoint(clientX, clientY)
      ?.closest<HTMLElement>("[data-shome-layout-block-id]");
    return target?.dataset.shomeLayoutBlockId ?? null;
  }

  function pointerIsOverCanvas(clientX: number, clientY: number) {
    return Boolean(
      document.elementFromPoint(clientX, clientY)?.closest("[data-shome-layout-canvas]"),
    );
  }

  function startPointerDrag(event: PointerEvent<HTMLElement>, id: string) {
    if (event.pointerType === "mouse" || !event.isPrimary) return;
    pointerDrag.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
    draggedIdRef.current = id;
    setDraggedId(id);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function updatePointerDrag(event: PointerEvent<HTMLElement>) {
    const drag = pointerDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (!drag.moved) {
      drag.moved = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 7;
    }
    if (!drag.moved) return;
    event.preventDefault();
    const targetId = pointerTargetId(event.clientX, event.clientY);
    setDropTarget(targetId ?? END_DROP_TARGET);
  }

  function finishPointerDrag(event: PointerEvent<HTMLElement>) {
    const drag = pointerDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (drag.moved) {
      const targetId = pointerTargetId(event.clientX, event.clientY);
      if (targetId && targetId !== drag.id) {
        const target = Array.from(
          document.querySelectorAll<HTMLElement>("[data-shome-layout-block-id]"),
        ).find((element) => element.dataset.shomeLayoutBlockId === targetId);
        const bounds = target?.getBoundingClientRect();
        reorder(drag.id, targetId, !bounds || event.clientY < bounds.top + bounds.height / 2);
      } else if (!targetId && model && pointerIsOverCanvas(event.clientX, event.clientY)) {
        const from = model.blocks.findIndex((block) => block.id === drag.id);
        if (from >= 0) applyBlocks(moveBlock(model.blocks, from, model.blocks.length - 1));
      }
    }
    clearDragState();
  }

  function cancelPointerDrag(event: PointerEvent<HTMLElement>) {
    if (pointerDrag.current?.pointerId !== event.pointerId) return;
    clearDragState();
  }

  const modes: { id: EditorMode; label: string; hint: string }[] = [
    { id: "visual", label: "Visual editor", hint: "Drag & drop" },
    { id: "code", label: "Code", hint: "HTML + CSS" },
    { id: "preview", label: "Preview", hint: "Published view" },
  ];

  return (
    <div className="card">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="font-semibold">Page editor</p>
          <p className="mt-1 text-sm text-slate-400">
            Build visually, inspect the source, or check the live page.
          </p>
        </div>
        <div
          className="flex rounded-xl border border-white/10 bg-black/20 p-1"
          role="tablist"
          aria-label="Page editor mode"
        >
          {modes.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={mode === item.id}
              className={`cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition sm:px-4 ${
                mode === item.id
                  ? "text-slate-950 shadow-sm"
                  : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
              }`}
              style={
                mode === item.id
                  ? { backgroundColor: appStyle.appAccentBackgroundColor }
                  : undefined
              }
              onClick={() => setMode(item.id)}
            >
              <span className="block font-semibold">{item.label}</span>
              <span
                className={`hidden text-[0.68rem] sm:block ${mode === item.id ? "text-slate-700" : "text-slate-500"}`}
              >
                {item.hint}
              </span>
            </button>
          ))}
        </div>
      </div>

      {mode === "visual" && (
        <div role="tabpanel" aria-label="Visual editor" className="grid gap-4">
          <div
            className="flex w-fit rounded-xl border border-white/10 bg-black/20 p-1"
            role="tablist"
            aria-label="Visual editor workspace"
          >
            {(
              [
                ["blocks", "Blocks"],
                ["overlay", "Overlay"],
              ] as const
            ).map(([pane, label]) => (
              <button
                key={pane}
                type="button"
                role="tab"
                aria-selected={visualPane === pane}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  visualPane === pane
                    ? "bg-white text-slate-950"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                }`}
                onClick={() => setVisualPane(pane)}
              >
                {label}
              </button>
            ))}
          </div>

          {visualPane === "blocks" && (
            <div className="grid gap-4 xl:grid-cols-[13rem_minmax(0,1fr)]">
              <aside className="rounded-xl border border-white/10 bg-black/10 p-3">
                <p className="text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase">
                  Add a block
                </p>
                <div className="mt-3 grid gap-2">
                  {BLOCK_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      draggable
                      className="cursor-grab rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-left transition hover:border-indigo-200/40 hover:bg-white/[0.07] active:cursor-grabbing"
                      onClick={() => addBlock(template.id)}
                      onDragStart={(event) => {
                        event.dataTransfer.effectAllowed = "copy";
                        event.dataTransfer.setData(TEMPLATE_BLOCK_DRAG_TYPE, template.id);
                      }}
                    >
                      <span className="block text-sm font-medium text-slate-100">
                        {template.label}
                      </span>
                      <span className="block text-xs text-slate-500">{template.detail}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Click to add, or drag a block into the canvas.
                </p>
              </aside>

              <fieldset
                className="min-h-[28rem] rounded-xl border border-dashed border-white/15 bg-slate-950/45 p-3 sm:p-4"
                aria-label="Page layout canvas"
                data-shome-layout-canvas
                onDragOver={(event) => event.preventDefault()}
                onDrop={dropOnCanvas}
              >
                {!model ? (
                  <p className="grid min-h-56 place-items-center text-sm text-slate-400">
                    Opening visual editor…
                  </p>
                ) : model.blocks.length === 0 ? (
                  <div className="grid min-h-56 place-items-center rounded-lg border border-dashed border-white/10 px-6 text-center">
                    <div>
                      <p className="font-medium">Your canvas is ready.</p>
                      <p className="mt-1 text-sm text-slate-400">
                        Add a block from the left, or use Code to start from scratch.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {model.blocks.map((block, index) => (
                      <article
                        key={block.id}
                        draggable
                        data-shome-layout-block-id={block.id}
                        className={`group flex items-center gap-3 rounded-xl border bg-white/[0.035] p-3 transition ${
                          dropTarget === block.id
                            ? "border-indigo-300 bg-indigo-300/10"
                            : draggedId === block.id
                              ? "border-white/10 opacity-55"
                              : "border-white/10 hover:border-white/25"
                        }`}
                        onDragStart={(event) => {
                          draggedIdRef.current = block.id;
                          setDraggedId(block.id);
                          event.dataTransfer.effectAllowed = "move";
                          event.dataTransfer.setData(LAYOUT_BLOCK_DRAG_TYPE, block.id);
                          event.dataTransfer.setData("text/plain", block.id);
                        }}
                        onDragEnd={clearDragState}
                        onDragOver={(event) => {
                          event.preventDefault();
                          setDropEffect(event);
                          setDropTarget(block.id);
                        }}
                        onDragLeave={(event) => {
                          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                            setDropTarget((current) => (current === block.id ? null : current));
                          }
                        }}
                        onDrop={(event) => dropOnBlock(event, block.id)}
                      >
                        <span
                          className="cursor-grab touch-none select-none text-lg leading-none text-slate-500 active:cursor-grabbing"
                          aria-hidden="true"
                          onPointerDown={(event) => startPointerDrag(event, block.id)}
                          onPointerMove={updatePointerDrag}
                          onPointerUp={finishPointerDrag}
                          onPointerCancel={cancelPointerDrag}
                        >
                          ⠿
                        </span>
                        <span className="text-xs font-semibold tabular-nums text-indigo-200">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-slate-100">
                            {block.label}
                          </p>
                          <p className="truncate text-xs text-slate-500">{block.detail}</p>
                        </div>
                        <div className="flex items-center gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                          <button
                            type="button"
                            className="rounded-md px-2 py-1 text-xs text-indigo-200 hover:bg-indigo-300/10"
                            onClick={() => openBlockEditor(index)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="rounded-md px-2 py-1 text-xs text-slate-300 hover:bg-white/10 disabled:opacity-30"
                            aria-label={`Move ${block.label} up`}
                            disabled={index === 0}
                            onClick={() => applyBlocks(moveBlock(model.blocks, index, index - 1))}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            className="rounded-md px-2 py-1 text-xs text-slate-300 hover:bg-white/10 disabled:opacity-30"
                            aria-label={`Move ${block.label} down`}
                            disabled={index === model.blocks.length - 1}
                            onClick={() => applyBlocks(moveBlock(model.blocks, index, index + 1))}
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            className="rounded-md px-2 py-1 text-xs text-red-300 hover:bg-red-400/10"
                            onClick={() => removeBlock(block.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
                {model && model.blocks.length > 0 && (
                  <fieldset
                    className={`mt-3 grid min-h-14 place-items-center rounded-lg border border-dashed text-xs transition ${
                      dropTarget === END_DROP_TARGET
                        ? "border-indigo-300 bg-indigo-300/10 text-indigo-100"
                        : "border-white/10 text-slate-500"
                    }`}
                    aria-label="Move block to the end of the layout"
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDropEffect(event);
                      setDropTarget(END_DROP_TARGET);
                    }}
                    onDragLeave={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                        setDropTarget((current) => (current === END_DROP_TARGET ? null : current));
                      }
                    }}
                    onDrop={dropOnCanvas}
                  >
                    Drop here to move to the end
                  </fieldset>
                )}
              </fieldset>
            </div>
          )}

          {visualPane === "overlay" && (
            <div className="order-3 min-h-[34rem] overflow-hidden rounded-xl border border-white/10 bg-slate-950/45">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5">
                <div>
                  <p className="text-sm font-semibold">Rendered layout</p>
                  <p className="text-xs text-slate-500">
                    Drag a section to move it, or click it to edit its text.
                  </p>
                </div>
                <span className="badge text-indigo-200">overlay on</span>
              </div>
              {visualPreviewDoc === null ? (
                <div className="grid min-h-[26rem] place-items-center px-6 text-center text-sm text-slate-400">
                  {previewError ?? "building your layout overlay…"}
                </div>
              ) : (
                <iframe
                  ref={visualFrame}
                  className="min-h-[32rem] w-full bg-white"
                  sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
                  srcDoc={visualPreviewDoc}
                  title="Visual page layout"
                />
              )}
            </div>
          )}
          {selectedBlock && selectedBlockIndex !== null && (
            <section
              className={`rounded-xl border border-indigo-300/30 bg-indigo-300/[0.06] p-3 sm:p-4 ${
                visualPane === "overlay" ? "order-2" : ""
              }`}
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold tracking-[0.12em] text-indigo-200 uppercase">
                    Editing block {String(selectedBlockIndex + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-semibold">{selectedBlock.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn-ghost text-sm"
                    disabled={selectedBlockIndex === 0}
                    onClick={() => moveSelectedBlock(-1)}
                  >
                    move up
                  </button>
                  <button
                    type="button"
                    className="btn-ghost text-sm"
                    disabled={selectedBlockIndex === (model?.blocks.length ?? 0) - 1}
                    onClick={() => moveSelectedBlock(1)}
                  >
                    move down
                  </button>
                  <button type="button" className="btn-ghost text-sm" onClick={closeBlockEditor}>
                    close
                  </button>
                </div>
              </div>
              <div
                className="mb-3 flex w-fit rounded-xl border border-white/10 bg-black/20 p-1"
                role="tablist"
                aria-label="Block editor mode"
              >
                {(["text", "html"] as const).map((pane) => (
                  <button
                    key={pane}
                    type="button"
                    role="tab"
                    aria-selected={blockEditorPane === pane}
                    className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition ${
                      blockEditorPane === pane
                        ? "bg-white text-slate-950"
                        : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                    }`}
                    onClick={() => setBlockEditorPane(pane)}
                  >
                    {pane}
                  </button>
                ))}
              </div>
              {blockEditorPane === "text" ? (
                blockTextFields.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-slate-400">
                    This block has no editable text. Use HTML for advanced changes.
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {blockTextFields.map((field, fieldIndex) => (
                      <label key={field.id} className="grid gap-1.5 text-sm text-slate-300">
                        <span className="font-medium capitalize">{field.label}</span>
                        <textarea
                          className="input min-h-20 resize-y"
                          value={field.value}
                          onChange={(event) => {
                            const value = event.target.value;
                            setBlockTextFields((current) =>
                              current.map((item, index) =>
                                index === fieldIndex ? { ...item, value } : item,
                              ),
                            );
                            setBlockError(null);
                          }}
                        />
                      </label>
                    ))}
                  </div>
                )
              ) : (
                <HighlightedCodeEditor
                  language="html"
                  value={blockDraft}
                  onChange={(value) => {
                    setBlockDraft(value);
                    setBlockError(null);
                  }}
                  placeholder="<section>…</section>"
                  label={`HTML for ${selectedBlock.label}`}
                  minHeightClass="min-h-[14rem]"
                />
              )}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div>{blockError && <p className="text-sm text-red-300">{blockError}</p>}</div>
                <div className="ml-auto flex gap-2">
                  <button type="button" className="btn-ghost" onClick={closeBlockEditor}>
                    cancel
                  </button>
                  <button
                    type="button"
                    className="btn"
                    style={{ backgroundColor: appStyle.appAccentBackgroundColor }}
                    onClick={saveBlockEditor}
                  >
                    apply block
                  </button>
                </div>
              </div>
            </section>
          )}
          {removedBlock && (
            <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-900 px-3 py-2 text-sm text-slate-300">
              <span>{removedBlock.block.label} removed.</span>
              <button
                type="button"
                className="text-indigo-200 hover:text-indigo-100 hover:underline"
                onClick={restoreBlock}
              >
                undo
              </button>
            </div>
          )}
        </div>
      )}

      {mode === "code" && (
        <div role="tabpanel" aria-label="Code editor">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              className="btn-ghost text-sm"
              onClick={() => {
                const nextHtml = formatHtml(htmlCode);
                const nextCss = formatCss(cssCode);
                setHtmlCode(nextHtml);
                setCssCode(nextCss);
                updateCode(nextHtml, nextCss);
              }}
            >
              format code
            </button>
          </div>
          <div
            className="mb-3 flex w-fit rounded-xl border border-white/10 bg-black/20 p-1"
            role="tablist"
            aria-label="Source language"
          >
            {(["html", "css"] as const).map((pane) => (
              <button
                key={pane}
                type="button"
                role="tab"
                aria-selected={codePane === pane}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium uppercase transition ${
                  codePane === pane
                    ? "bg-white text-slate-950"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                }`}
                onClick={() => setCodePane(pane)}
              >
                {pane}
              </button>
            ))}
          </div>
          {codePane === "html" ? (
            <HighlightedCodeEditor
              language="html"
              value={htmlCode}
              onChange={(nextHtml) => {
                setHtmlCode(nextHtml);
                updateCode(nextHtml, cssCode);
              }}
              placeholder={"<main>\n  <h1>Hello</h1>\n  <shome-products />\n</main>"}
              label="Profile page HTML"
            />
          ) : (
            <HighlightedCodeEditor
              language="css"
              value={cssCode}
              onChange={(nextCss) => {
                setCssCode(nextCss);
                updateCode(htmlCode, nextCss);
              }}
              placeholder={"body {\n  background: #f5f3ee;\n  color: #1f2933;\n}"}
              label="Profile page CSS"
            />
          )}
        </div>
      )}

      {mode === "preview" && (
        <div role="tabpanel" aria-label="Profile preview" className="min-h-[34rem]">
          <div className="mb-3 flex items-center justify-between gap-3 text-sm">
            <p className="text-slate-400">
              Your draft, rendered with the same safety rules as the public page.
            </p>
            <span className="badge text-emerald-300">live draft</span>
          </div>
          {previewDoc === null ? (
            <div className="card flex min-h-[28rem] items-center justify-center">
              <p className="text-slate-400">{previewError ?? "building your preview…"}</p>
            </div>
          ) : (
            <div className="relative min-h-[30rem]">
              <iframe
                className="h-full min-h-[30rem] w-full rounded-xl border border-white/10 bg-white"
                sandbox="allow-popups allow-popups-to-escape-sandbox"
                srcDoc={previewDoc}
                title="Profile preview"
              />
              {previewError && (
                <p className="absolute inset-x-0 bottom-0 rounded-b-xl bg-red-950/90 px-3 py-2 text-sm text-red-200">
                  Preview is out of date: {previewError}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

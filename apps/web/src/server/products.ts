import { z } from "zod";

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .nullish()
    .transform((value) => value || null);

const optionalHttpUrl = z
  .string()
  .trim()
  .url("must be a valid URL")
  .refine(isHttpUrl, "must use http or https")
  .nullish()
  .transform((value) => value || null);

const checkoutUrl = z
  .string()
  .trim()
  .url("must be a valid URL")
  .refine(isHttpUrl, "must use http or https");

export const createProductSchema = z.object({
  title: z.string().trim().min(1, "title is required").max(160),
  description: optionalText(2_000),
  price: optionalText(80),
  imageUrl: optionalHttpUrl,
  checkoutUrl,
  visible: z.boolean().default(true),
  sortOrder: z.number().int().min(-10_000).max(10_000).default(0),
});

export const updateProductSchema = z
  .object({
    title: z.string().trim().min(1, "title is required").max(160).optional(),
    description: optionalText(2_000).optional(),
    price: optionalText(80).optional(),
    imageUrl: optionalHttpUrl.optional(),
    checkoutUrl: checkoutUrl.optional(),
    visible: z.boolean().optional(),
    sortOrder: z.number().int().min(-10_000).max(10_000).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, "provide at least one product field");

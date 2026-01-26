import { z } from "zod";

export const shortUrlSchema = z.object({
  id: z.string(),
  code: z.string(),
  longUrl: z.string(),
  userId: z.string().optional(),
  clicks: z.number(),
  createdAt: z.date(),
  expiresAt: z.date().optional(),
  alias: z.string().optional(),
  status: z.enum(["ACTIVE", "EXPIRED"]).default("ACTIVE"),
});

export type ShortUrl = z.infer<typeof shortUrlSchema>;

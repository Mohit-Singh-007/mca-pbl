"use server";

import { prisma } from "@/lib/prisma";
import { generateCode } from "@/lib/shortener/generator";
import { isValidUrl } from "@/lib/shortener/validator";
import { revalidatePath } from "next/cache";

export async function createShortUrl({
  longUrl,
  alias,
  expiresAt,
}: {
  longUrl: string;
  alias?: string;
  expiresAt?: string;
}) {
  if (!isValidUrl(longUrl)) throw new Error("Invalid URL");

  const normalizedUrl = longUrl.startsWith("http")
    ? longUrl
    : `https://${longUrl}`;

  const code = alias || (await generateCode());

  const newUrl = await prisma.shortUrl.create({
    data: {
      code,
      longUrl: normalizedUrl,
      alias: alias || undefined,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    },
  });

  revalidatePath("/shortener");

  return newUrl;
}

export async function deleteShortUrl(id: string) {
  await prisma.shortUrl.delete({ where: { id } });
  revalidatePath("/shortener");
}

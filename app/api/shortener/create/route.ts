import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateCode } from "@/lib/shortener/generator";
import { isValidUrl } from "@/lib/shortener/validator";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { longUrl, alias, expiresAt } = await req.json();

  if (!isValidUrl(longUrl)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const code = alias || (await generateCode());
  const normalizedUrl = longUrl.startsWith("http")
    ? longUrl
    : `https://${longUrl}`;

  const data = await prisma.shortUrl.create({
    data: {
      code,
      longUrl: normalizedUrl,
      alias,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    },
  });

  revalidatePath("/shortener");

  return NextResponse.json({ shortUrl: `/s/${data.code}` });
}

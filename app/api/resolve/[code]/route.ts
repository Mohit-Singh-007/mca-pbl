import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  const url = await prisma.shortUrl.findFirst({
    where: {
      OR: [{ code }, { alias: code }],
    },
  });

  if (!url) return new Response("Not Found", { status: 404 });

  if (url.expiresAt && url.expiresAt < new Date()) {
    return new Response("Link Expired", { status: 410 });
  }

  await prisma.shortUrl.update({
    where: { id: url.id },
    data: { clicks: { increment: 1 } },
  });

  redirect(url.longUrl);
}

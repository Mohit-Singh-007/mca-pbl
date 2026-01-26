import { prisma } from "@/lib/prisma";

export default async function getAllUrls() {
  const urls = await prisma.shortUrl.findMany({
    orderBy: { createdAt: "desc" },
  });

  return urls;
}

export type UrlType = Awaited<ReturnType<typeof getAllUrls>>[0];

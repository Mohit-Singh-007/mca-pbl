import { prisma } from "@/lib/prisma";

export default async function getRecentUrls() {
  const recentUrls = await prisma.shortUrl.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return recentUrls;
}

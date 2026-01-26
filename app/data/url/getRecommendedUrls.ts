import { prisma } from "@/lib/prisma";

export default async function getRecommendedUrls() {
  const recentUrls = await prisma.shortUrl.findMany({
    orderBy: {
      clicks: "desc",
    },
    where: {
      status: "ACTIVE",
    },
    select: {
      id: true,
      code: true,
      createdAt: true,
      alias: true,
    },
    take: 3,
  });

  return recentUrls;
}

import { prisma } from "@/lib/prisma";

export default async function getAnalyticsData() {
  const topUrls = await prisma.shortUrl.findMany({
    orderBy: {
      clicks: "desc",
    },
    take: 5,
    select: {
      code: true,
      alias: true,
      clicks: true,
    },
  });

  return topUrls.map((url) => ({
    name: url.alias || url.code,
    clicks: url.clicks,
  }));
}

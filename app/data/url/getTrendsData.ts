import { prisma } from "@/lib/prisma";

export default async function getTrendsData() {
  const now = new Date();
  const startDate = new Date();
  startDate.setDate(now.getDate() - 6);
  startDate.setHours(0, 0, 0, 0);

  const urls = await prisma.shortUrl.findMany({
    where: {
      createdAt: {
        gte: startDate,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Initialize last 7 days with 0
  const trends: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const dateStr = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    trends[dateStr] = 0;
  }

  // Populate data
  urls.forEach((url) => {
    const dateStr = new Date(url.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    if (trends[dateStr] !== undefined) {
      trends[dateStr]++;
    }
  });

  return Object.entries(trends).map(([date, count]) => ({
    date,
    count,
  }));
}

import { prisma } from "@/lib/prisma";

export default async function getUrlDataForDashboard() {
  const [total, activeUrlCount] = await Promise.all([
    prisma.shortUrl.aggregate({
      _count: { id: true },
      _sum: { clicks: true },
    }),

    prisma.shortUrl.count({
      where: {
        status: "ACTIVE",
      },
    }),
  ]);

  return {
    totalUrl: total._count.id,
    totalClicks: total._sum.clicks ?? 0,
    activeUrlCount,
  };
}

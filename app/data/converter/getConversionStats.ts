import { prisma } from "@/lib/prisma";

export async function getConversionStats() {
  const [totalCount, totalSize, recentConversions, typeDistribution, categoryDistribution] =
    await Promise.all([
      prisma.conversionLog.count(),
      prisma.conversionLog.aggregate({
        _sum: { fileSize: true },
      }),
      prisma.conversionLog.findMany({
        where: { status: "COMPLETED" },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.conversionLog.groupBy({
        by: ["type"],
        _count: { id: true },
      }),
      prisma.conversionLog.groupBy({
        by: ["category"],
        _count: { id: true },
      }),
    ]);

  return {
    totalCount,
    totalBytes: totalSize._sum.fileSize || 0,
    recentConversions,
    typeDistribution: typeDistribution.map((t) => ({
      type: t.type,
      count: t._count.id,
    })),
    categoryDistribution: categoryDistribution.map((c) => ({
      category: c.category,
      count: c._count.id,
    })),
  };
}

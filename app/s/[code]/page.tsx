import ExpiredUrlPage from "@/app/_components/url/ExpiredUrlPage";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const url = await prisma.shortUrl.findUnique({
    where: { code },
  });
  if (!url) {
    return <p>Short URL not found</p>;
  }
  if (url.expiresAt && url.expiresAt < new Date()) {
    return <ExpiredUrlPage originalUrl={url.longUrl} />;
  }

  await prisma.shortUrl.update({
    where: { code },
    data: { clicks: { increment: 1 } },
  });

  redirect(url.longUrl);
}

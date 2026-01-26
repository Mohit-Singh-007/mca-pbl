import UrlDialogForm from "@/app/_components/url/UrlDialogForm";
import UrlList from "@/app/_components/url/UrlList";
import getAllUrls from "@/app/data/url/getUrls";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShortUrl, shortUrlSchema } from "@/utils/zodSchema";

export default async function page() {
  const urlsFromDb = await getAllUrls();

  const urls: ShortUrl[] = shortUrlSchema.array().parse(
    urlsFromDb.map((u) => ({
      ...u,
      alias: u.alias ?? undefined,
      userId: u.userId ?? undefined,
      expiresAt: u.expiresAt ?? undefined,
      createdAt: u.createdAt,
    })),
  );
  return (
    <div className="space-y-8 p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="gap-2">
            <CardTitle>All URLs</CardTitle>
            <CardDescription>Manage all your urls here...</CardDescription>
          </div>
          <UrlDialogForm />
        </CardHeader>

        <CardContent>
          <UrlList urls={urls} />
        </CardContent>
      </Card>
    </div>
  );
}

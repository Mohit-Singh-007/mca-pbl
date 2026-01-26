"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Link2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DeleteDialog } from "./DeleteDialog";
import { getUrlStatus } from "@/utils/utils";

type ShortUrl = {
  id: string;
  alias?: string;
  code: string;
  longUrl: string;
  clicks: number;
  status: "ACTIVE" | "EXPIRED";
  createdAt: Date;
  expiresAt?: Date;
};

interface UrlListClientProps {
  urls: ShortUrl[];
}

export default function UrlList({ urls }: UrlListClientProps) {
  const [deletingUrlId, setDeletingUrlId] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    const fullUrl = `${window.location.origin}/s/${code}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success(`URL copied successfully...`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {urls.map((url) => (
          <Card key={url.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex justify-between items-start">
              <CardTitle className="text-sm font-semibold truncate flex items-center gap-1">
                <Link2 className="w-4 h-4 text-blue-600 shrink-0" />
                <a
                  href={`/s/${url.alias || url.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline truncate"
                >
                  {url.alias || url.code}
                </a>
              </CardTitle>
              {/* <Badge
                variant={
                  url.status === "ACTIVE"
                    ? "default"
                    : url.status === "EXPIRED"
                      ? "destructive"
                      : "secondary"
                }
              >
                {url.status}
              </Badge> */}
              <Badge
                variant={
                  getUrlStatus(url.status, url.expiresAt) === "ACTIVE"
                    ? "default"
                    : "destructive"
                }
              >
                {getUrlStatus(url.status, url.expiresAt)}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs text-gray-500 flex flex-wrap gap-3">
                <span>{` • Created: ${new Date(url.createdAt).toLocaleDateString()}`}</span>
                {url.expiresAt && (
                  <span>{` • Expires: ${new Date(url.expiresAt).toLocaleDateString()}`}</span>
                )}
              </p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => handleCopy(url.alias || url.code)}
                  disabled={
                    getUrlStatus(url.status, url.expiresAt) === "EXPIRED"
                  }
                >
                  <Copy className="w-4 h-4 mr-1" /> Copy
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => setDeletingUrlId(url.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeleteDialog
        urlId={deletingUrlId}
        onClose={() => setDeletingUrlId(null)}
      />
    </>
  );
}

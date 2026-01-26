import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileIcon } from "lucide-react";
import { TruncatedFilename } from "./TruncatedFilename";
import DeleteConversionButton from "./DeleteConversionButton";

interface ConversionHistoryProps {
  category?: "IMAGE" | "DOCUMENT" | "PDF_MERGE";
}

export default async function ConversionHistory({
  category,
}: ConversionHistoryProps) {
  const logs = await prisma.conversionLog.findMany({
    where: category ? { category } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium p-3">
                <div className="flex items-center gap-2 max-w-[150px] md:max-w-xs overflow-hidden">
                  <FileIcon className="size-4 text-muted-foreground shrink-0" />
                  <TruncatedFilename name={log.originalName} limit={20} />
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-[10px] whitespace-nowrap">
                  {log.type.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {(log.fileSize / 1024).toFixed(1)} KB
              </TableCell>
              <TableCell>
                {log.status === "COMPLETED" ? (
                  <span className="text-xs text-green-500 font-medium">Done</span>
                ) : log.status === "FAILED" ? (
                  <span className="text-xs text-destructive font-medium" title={log.error || ""}>Failed</span>
                ) : (
                  <span className="text-xs text-amber-500 font-medium animate-pulse">Pending</span>
                )}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(log.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {log.status === "COMPLETED" && (
                    <Button asChild variant="ghost" size="icon" className="size-8">
                      <a href={`/api/convert/download/${log.id}`} download title="Download">
                        <Download className="size-4" />
                      </a>
                    </Button>
                  )}
                  <DeleteConversionButton id={log.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
          {logs.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground italic">
                No conversions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

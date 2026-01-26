import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const log = await prisma.conversionLog.findUnique({
    where: { id },
  });

  if (!log || !log.convertedPath || log.status !== "COMPLETED") {
    return new NextResponse("File not found or processing not complete", {
      status: 404,
    });
  }

  try {
    const fileBuffer = await fs.readFile(log.convertedPath);
    const fileName = `converted-${log.originalName.split(".")[0]}${path.extname(log.convertedPath)}`;

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch {
    return new NextResponse("Error reading file", { status: 500 });
  }
}

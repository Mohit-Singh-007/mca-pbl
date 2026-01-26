"use server";

import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import { revalidatePath } from "next/cache";
import { execFile } from "child_process";

const LIBRE_OFFICE_PATH = "C:/Program Files/LibreOffice/program/soffice.exe";
const LIBRE_PROFILE_DIR = "D:/dsa_storage/libre_profile";

async function convertWithLibre(buffer: Buffer, format: string, fileName: string): Promise<Buffer> {
  const fileId = Math.random().toString(36).substring(7);
  const tempInDir = path.join("D:/dsa_storage/tmp", fileId);
  const tempOutDir = path.join("D:/dsa_storage/tmp", `${fileId}_out`);
  const inputPath = path.join(tempInDir, fileName);

  try {
    await fs.mkdir(tempInDir, { recursive: true });
    await fs.mkdir(tempOutDir, { recursive: true });
    await fs.mkdir(LIBRE_PROFILE_DIR, { recursive: true });
    await fs.writeFile(inputPath, buffer);

    return new Promise((resolve, reject) => {
      // Use direct CLI flags for maximum compatibility on Windows
      const args = [
        `-env:UserInstallation=file:///${LIBRE_PROFILE_DIR.replace(/\\/g, "/")}`,
        "--headless",
        "--convert-to",
        format,
        "--outdir",
        tempOutDir,
        inputPath,
      ];

      execFile(LIBRE_OFFICE_PATH, args, async (error, stdout, stderr) => {
        if (error) {
          console.error("LibreOffice Error:", stderr);
          return reject(new Error(`LibreOffice failed: ${stderr || error.message}`));
        }

        try {
          // LibreOffice names the output file based on the input filename
          const baseName = path.basename(fileName, path.extname(fileName));
          const resultPath = path.join(tempOutDir, `${baseName}.${format}`);
          
          const resultBuffer = await fs.readFile(resultPath);
          
          // Cleanup
          await fs.rm(tempInDir, { recursive: true, force: true }).catch(() => {});
          await fs.rm(tempOutDir, { recursive: true, force: true }).catch(() => {});
          
          resolve(resultBuffer);
        } catch (readError) {
          reject(new Error("Failed to read converted file."));
        }
      });
    });
  } catch (err: any) {
    throw new Error(`Conversion setup failed: ${err.message}`);
  }
}

const BASE_STORAGE = "D:/dsa_storage";
const UPLOAD_DIR = path.join(BASE_STORAGE, "uploads");
const CONVERTED_DIR = path.join(BASE_STORAGE, "converted");

export async function convertFile(formData: FormData) {
  const file = formData.get("file") as File;
  const targetType = formData.get("targetType") as string;

  if (!file) throw new Error("No file uploaded");

  const startTime = Date.now();
  const buffer = Buffer.from(await file.arrayBuffer());
  const originalName = file.name;
  const originalExtension = path.extname(originalName).toLowerCase();
  const fileId = Math.random().toString(36).substring(7);
  const originalPath = path.join(UPLOAD_DIR, `${fileId}${originalExtension}`);

  // Create log entry
  const isImage = [".png", ".jpg", ".jpeg", ".webp"].includes(originalExtension);
  const category = isImage ? "IMAGE" : "DOCUMENT";

  const log = await prisma.conversionLog.create({
    data: {
      originalName,
      originalPath,
      type: `${originalExtension.substring(1).toUpperCase()}_TO_${targetType}`,
      category,
      fileSize: file.size,
      status: "PENDING",
    },
  });

  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.mkdir(CONVERTED_DIR, { recursive: true });
    await fs.writeFile(originalPath, buffer);

    let convertedPath = "";
    let outputFileName = "";

    if (targetType === "PNG" || targetType === "JPG" || targetType === "WEBP") {
      outputFileName = `${fileId}.${targetType.toLowerCase()}`;
      convertedPath = path.join(CONVERTED_DIR, outputFileName);

      let sharpInstance = sharp(buffer);
      if (targetType === "JPG") sharpInstance = sharpInstance.jpeg();
      else if (targetType === "PNG") sharpInstance = sharpInstance.png();
      else if (targetType === "WEBP") sharpInstance = sharpInstance.webp();

      await sharpInstance.toFile(convertedPath);
    } else if (
      (targetType === "PDF" && originalExtension === ".png") ||
      originalExtension === ".jpg" ||
      originalExtension === ".jpeg"
    ) {
      outputFileName = `${fileId}.pdf`;
      convertedPath = path.join(CONVERTED_DIR, outputFileName);

      const pdfDoc = await PDFDocument.create();
      const image =
        originalExtension === ".png"
          ? await pdfDoc.embedPng(buffer)
          : await pdfDoc.embedJpg(buffer);
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });

      const pdfBytes = await pdfDoc.save();
      await fs.writeFile(convertedPath, pdfBytes);
    } else if (
      targetType === "PDF" &&
      [".docx", ".doc", ".ppt", ".pptx", ".xls", ".xlsx", ".rtf", ".txt"].includes(
        originalExtension,
      )
    ) {
      outputFileName = `${fileId}.pdf`;
      convertedPath = path.join(CONVERTED_DIR, outputFileName);

      const pdfBuf = await convertWithLibre(buffer, ".pdf", originalName);
      await fs.writeFile(convertedPath, pdfBuf);
    } else {
      throw new Error(
        `Unsupported conversion: ${originalExtension} to ${targetType}`,
      );
    }

    const durationMs = Date.now() - startTime;
    await prisma.conversionLog.update({
      where: { id: log.id },
      data: {
        status: "COMPLETED",
        convertedPath,
        durationMs,
      },
    });

    revalidatePath("/converter", "layout");

    return { success: true, fileId: log.id, outputFileName };
  } catch (error: any) {
    await prisma.conversionLog.update({
      where: { id: log.id },
      data: {
        status: "FAILED",
        error: error.message,
      },
    });
    throw error;
  }
}

export async function mergePdfs(formData: FormData) {
  const files = formData.getAll("files") as File[];
  if (!files || files.length < 2) throw new Error("Select at least 2 PDF files to merge");

  const startTime = Date.now();
  const fileId = Math.random().toString(36).substring(7);
  const outputFileName = `merged-${fileId}.pdf`;
  const convertedPath = path.join(CONVERTED_DIR, outputFileName);

  const log = await prisma.conversionLog.create({
    data: {
      originalName: `Merged (${files.length} files)`,
      originalPath: "MULTI_FILE_MERGE",
      type: "PDF_MERGE",
      category: "PDF_MERGE",
      fileSize: files.reduce((acc, f) => acc + f.size, 0),
      status: "PENDING",
    },
  });

  try {
    await fs.mkdir(CONVERTED_DIR, { recursive: true });
    
    const mergedPdf = await PDFDocument.create();
    
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const pdf = await PDFDocument.load(buffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    await fs.writeFile(convertedPath, pdfBytes);

    const durationMs = Date.now() - startTime;
    await prisma.conversionLog.update({
      where: { id: log.id },
      data: {
        status: "COMPLETED",
        convertedPath,
        durationMs,
      },
    });

    revalidatePath("/converter", "layout");
    return { success: true, fileId: log.id, outputFileName };
  } catch (error: any) {
    await prisma.conversionLog.update({
      where: { id: log.id },
      data: {
        status: "FAILED",
        error: error.message,
      },
    });
    throw error;
  }
}

export async function deleteConversion(id: string) {
  const log = await prisma.conversionLog.findUnique({
    where: { id },
  });

  if (!log) throw new Error("Conversion not found");

  try {
    // Delete local files if they exist
    if (log.originalPath && log.originalPath !== "MULTI_FILE_MERGE") {
      await fs.unlink(log.originalPath).catch(() => {});
    }
    if (log.convertedPath) {
      await fs.unlink(log.convertedPath).catch(() => {});
    }

    await prisma.conversionLog.delete({
      where: { id },
    });

    revalidatePath("/converter", "layout");
    revalidatePath("/converter/files");
  } catch (error) {
    console.error("Delete failed:", error);
    throw new Error("Failed to delete conversion");
  }
}

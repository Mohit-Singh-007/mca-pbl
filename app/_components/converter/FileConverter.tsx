"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { convertFile, mergePdfs } from "@/app/data/converter/convertFile";
import { FileUp, FileCheck, Loader2, Download, Files } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileConverterProps {
  onComplete?: () => void;
  restrictTo?: "IMAGE" | "DOCUMENT" | "PDF_MERGE";
}

export default function FileConverter({
  onComplete,
  restrictTo,
}: FileConverterProps) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [targetType, setTargetType] = useState(
    restrictTo === "PDF_MERGE"
      ? "MERGE_PDF"
      : restrictTo === "DOCUMENT"
        ? "PDF"
        : "PNG",
  );
  const [isConverting, setIsConverting] = useState(false);
  const [resultId, setResultId] = useState<string | null>(null);

  const isMergeMode = targetType === "MERGE_PDF";

  const handleConvert = async () => {
    if (!files || files.length === 0) return;

    setIsConverting(true);
    setResultId(null);
    const formData = new FormData();

    try {
      let result;
      if (isMergeMode) {
        if (files.length < 2)
          throw new Error("Select at least 2 PDF files to merge");
        Array.from(files).forEach((file) => formData.append("files", file));
        result = await mergePdfs(formData);
      } else {
        formData.append("file", files[0]);
        formData.append("targetType", targetType);
        result = await convertFile(formData);
      }

      if (result.success) {
        setResultId(result.fileId);
        toast.success(
          isMergeMode ? "PDFs merged successfully!" : "Conversion successful!",
        );
      }
    } catch (error: any) {
      toast.error(error.message || "Operation failed");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>
            {isMergeMode
              ? "Select PDF Files (Multi)"
              : restrictTo === "DOCUMENT"
                ? "Select Document"
                : "Select File"}
          </Label>
          <Input
            type="file"
            multiple={isMergeMode}
            accept={
              isMergeMode
                ? ".pdf"
                : restrictTo === "IMAGE"
                  ? ".png,.jpg,.jpeg,.webp"
                  : restrictTo === "DOCUMENT"
                    ? ".docx,.doc,.ppt,.pptx,.xls,.xlsx,.rtf,.txt"
                    : undefined
            }
            onChange={(e) => setFiles(e.target.files)}
            className="cursor-pointer"
          />
          {files && files.length > 0 && (
            <p className="text-xs text-muted-foreground font-medium">
              {files.length} file(s) selected
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Target Format</Label>
          <Select value={targetType} onValueChange={setTargetType}>
            <SelectTrigger>
              <SelectValue placeholder="Select action" />
            </SelectTrigger>
            <SelectContent>
              {isMergeMode ? (
                <SelectItem value="MERGE_PDF">Merge PDFs</SelectItem>
              ) : restrictTo === "DOCUMENT" ? (
                <SelectItem value="PDF">Convert to PDF</SelectItem>
              ) : (
                <>
                  <SelectItem value="PNG">PNG Image</SelectItem>
                  <SelectItem value="JPG">JPG Image</SelectItem>
                  <SelectItem value="WEBP">WEBP Image</SelectItem>
                  <SelectItem value="PDF">Convert to PDF</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={handleConvert}
        disabled={!files || files.length === 0 || isConverting}
        className="w-full h-12 text-lg"
      >
        {isConverting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing Locally...
          </>
        ) : (
          <>
            {isMergeMode ? (
              <Files className="mr-2 h-5 w-5" />
            ) : (
              <FileUp className="mr-2 h-5 w-5" />
            )}
            {isMergeMode ? "Merge PDFs" : "Start Conversion"}
          </>
        )}
      </Button>

      {resultId && (
        <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <FileCheck className="h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold">Ready for download!</p>
              <p className="text-xs text-muted-foreground italic">
                Processed locally on your PC
              </p>
            </div>
          </div>
          <Button asChild variant="outline">
            <a href={`/api/convert/download/${resultId}`} download>
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}

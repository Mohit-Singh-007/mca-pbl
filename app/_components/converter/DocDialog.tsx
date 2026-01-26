"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import FileConverter from "./FileConverter";
import { FileTextIcon } from "lucide-react";

export default function DocDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 cursor-pointer">
          <FileTextIcon className="size-4" /> Convert Document
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl">
        <DialogHeader>
          <DialogTitle>Convert Document</DialogTitle>
          <DialogDescription>
            Convert Word (DOC/DOCX), PowerPoint (PPT/PPTX), Excel (XLS/XLSX), or
            Text to PDF.
          </DialogDescription>
        </DialogHeader>

        <FileConverter
          onComplete={() => setOpen(false)}
          restrictTo="DOCUMENT"
        />
      </DialogContent>
    </Dialog>
  );
}

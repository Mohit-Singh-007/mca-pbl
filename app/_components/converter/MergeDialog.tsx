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
import { FileStackIcon } from "lucide-react";

export default function MergeDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 cursor-pointer">
          <FileStackIcon className="size-4" /> Merge PDFs
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl">
        <DialogHeader>
          <DialogTitle>Merge PDFs</DialogTitle>
          <DialogDescription>
            Select multiple PDF files to combine them into a single local
            document.
          </DialogDescription>
        </DialogHeader>

        <FileConverter
          onComplete={() => setOpen(false)}
          restrictTo="PDF_MERGE"
        />
      </DialogContent>
    </Dialog>
  );
}

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
import { ImageIcon } from "lucide-react";

export default function ImageDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 cursor-pointer">
          <ImageIcon className="size-4" /> Convert Image
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl">
        <DialogHeader>
          <DialogTitle>Convert Image</DialogTitle>
          <DialogDescription>
            Convert PNG, JPG, or WEBP to other image formats or PDF.
          </DialogDescription>
        </DialogHeader>

        <FileConverter onComplete={() => setOpen(false)} restrictTo="IMAGE" />
      </DialogContent>
    </Dialog>
  );
}

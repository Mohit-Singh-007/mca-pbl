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
import { PlusCircleIcon } from "lucide-react";

export default function ConverterDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 cursor-pointer">
          <PlusCircleIcon className="size-5" /> New Conversion
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl">
        <DialogHeader>
          <DialogTitle>Convert File</DialogTitle>
          <DialogDescription>
            Select a file and a target format. The processing is done entirely
            on your PC.
          </DialogDescription>
        </DialogHeader>

        <FileConverter onComplete={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UrlForm from "./UrlForm";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";

export default function UrlDialogForm() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <PlusCircleIcon className="size-4 mr-1 " /> Create a new URL
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Short URL</DialogTitle>
        </DialogHeader>

        <UrlForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

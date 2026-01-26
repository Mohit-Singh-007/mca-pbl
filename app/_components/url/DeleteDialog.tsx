"use client";

import { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteShortUrl } from "@/utils/actions";

interface DeleteDialogProps {
  urlId: string | null;
  onClose: () => void;
}

export function DeleteDialog({ urlId, onClose }: DeleteDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!urlId) return;

    startTransition(async () => {
      try {
        await deleteShortUrl(urlId);
        toast.success("Short URL deleted successfully.");
        onClose();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete URL.");
      }
    });
  };

  return (
    <Dialog open={!!urlId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <p>
            Are you sure you want to delete this URL? This action cannot be
            undone.
          </p>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

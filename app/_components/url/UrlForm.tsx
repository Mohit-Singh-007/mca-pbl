"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { createShortUrl } from "@/utils/actions";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon } from "lucide-react";

interface UrlFormProps {
  onSuccess?: () => void;
}

export default function UrlForm({ onSuccess }: UrlFormProps) {
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        await createShortUrl({ longUrl, alias, expiresAt });
        toast.success("Short URL created!");
        setLongUrl("");
        setAlias("");
        setExpiresAt("");
        onSuccess?.();
      } catch {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full p-6">
      <div className="space-y-1">
        <Label>Long URL</Label>
        <Input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
          className="input"
        />
      </div>

      <div className="space-y-1">
        <Label>Alias (optional)</Label>
        <Input
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          className="input"
        />
      </div>

      <div className="space-y-1">
        <Label>Expires At (optional)</Label>
        <Input
          type="date"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          className="input"
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? (
          "Creating..."
        ) : (
          <>
            <PlusCircleIcon className="size-4 mr-1" />
            Create Short URL
          </>
        )}
      </Button>
    </form>
  );
}

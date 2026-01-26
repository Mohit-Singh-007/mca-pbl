"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TruncatedFilenameProps {
  name: string;
  limit?: number;
}

export function TruncatedFilename({ name, limit = 30 }: TruncatedFilenameProps) {
  const isTruncated = name.length > limit;
  const displayName = isTruncated ? `${name.substring(0, limit)}...` : name;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help whitespace-nowrap overflow-hidden text-ellipsis max-w-37.5 md:max-w-xs block">
            {displayName}
          </span>
        </TooltipTrigger>
        {isTruncated && (
          <TooltipContent>
            <p className="text-xs break-all max-w-75">{name}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

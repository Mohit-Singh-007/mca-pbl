"use client";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}
export default function SearchBar({
  onSearch,
  initialQuery = "",
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Debounced search
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    // Clear existing timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    // Set new timeout
    debounceTimeout.current = setTimeout(() => {
      onSearch(value);
    }, 1000); // 1000ms debounce
  };
  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };
  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search products..."
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        {searchTerm
          ? `Searching for "${searchTerm}"...`
          : 'Try searching for "laptop", "phone", etc.'}
      </p>
    </div>
  );
}

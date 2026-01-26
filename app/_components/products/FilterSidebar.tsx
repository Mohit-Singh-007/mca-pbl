"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, X } from "lucide-react";
interface FilterSidebarProps {
  currentFilters: {
    category: string;
    minPrice: string;
    maxPrice: string;
    minRating: string;
    sortBy: string;
    order: string;
  };
  onFilterChange: (updates: Record<string, string | null>) => void;
}
const CATEGORIES = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];
const SORT_OPTIONS = [
  {
    value: "price-asc",
    label: "Price: Low to High",
    sortBy: "price",
    order: "asc",
  },
  {
    value: "price-desc",
    label: "Price: High to Low",
    sortBy: "price",
    order: "desc",
  },
  {
    value: "rating-desc",
    label: "Rating: High to Low",
    sortBy: "rating",
    order: "desc",
  },
  {
    value: "rating-asc",
    label: "Rating: Low to High",
    sortBy: "rating",
    order: "asc",
  },
];

export default function FilterSidebar({
  currentFilters,
  onFilterChange,
}: FilterSidebarProps) {
  const [localMinPrice, setLocalMinPrice] = useState("");
  const [localMaxPrice, setLocalMaxPrice] = useState("");
  const handleClearAll = () => {
    setLocalMinPrice("");
    setLocalMaxPrice("");
    onFilterChange({
      category: null,
      minPrice: null,
      maxPrice: null,
      minRating: null,
      sortBy: null,
      order: null,
    });
  };
  const handlePriceApply = () => {
    const minPrice = localMinPrice || null;
    const maxPrice = localMaxPrice || null;

    onFilterChange({ minPrice, maxPrice });

    setLocalMinPrice("");
    setLocalMaxPrice("");
  };
  const handleSortChange = (value: string) => {
    if (value === "default") {
      onFilterChange({ sortBy: null, order: null });
    } else {
      const option = SORT_OPTIONS.find((opt) => opt.value === value);
      if (option) {
        onFilterChange({ sortBy: option.sortBy, order: option.order });
      }
    }
  };
  const getCurrentSortValue = () => {
    if (!currentFilters.sortBy) return "default";
    const option = SORT_OPTIONS.find(
      (opt) =>
        opt.sortBy === currentFilters.sortBy &&
        opt.order === currentFilters.order,
    );
    return option?.value || "default";
  };
  const activeFiltersCount = [
    currentFilters.category,
    currentFilters.minPrice,
    currentFilters.maxPrice,
    currentFilters.minRating,
    currentFilters.sortBy,
  ].filter(Boolean).length;
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="h-8 px-2 text-xs"
            >
              Clear all
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 ">
        <div className="space-y-2">
          <Label>Sort By</Label>
          <Select
            value={getCurrentSortValue()}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={currentFilters.category || "all"}
            onValueChange={(value) =>
              onFilterChange({ category: value === "all" ? null : value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>
            Price Range
            {(currentFilters.minPrice || currentFilters.maxPrice) && (
              <span className="ml-2 text-xs text-muted-foreground">
                (${currentFilters.minPrice || "0"} - $
                {currentFilters.maxPrice || "∞"})
              </span>
            )}
          </Label>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder={currentFilters.minPrice || "Min price"}
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(e.target.value)}
            />
            <Input
              type="number"
              placeholder={currentFilters.maxPrice || "Max price"}
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(e.target.value)}
            />
            <Button onClick={handlePriceApply} className="w-full" size="sm">
              Apply Price Filter
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Minimum Rating</Label>
            {currentFilters.minRating && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFilterChange({ minRating: null })}
                className="h-6 px-2"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <RadioGroup
            value={currentFilters.minRating || ""}
            onValueChange={(value) => onFilterChange({ minRating: value })}
          >
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={rating.toString()}
                  id={`rating-${rating}`}
                />

                <Label
                  htmlFor={`rating-${rating}`}
                  className="flex items-center cursor-pointer font-normal"
                >
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      & up
                    </span>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}

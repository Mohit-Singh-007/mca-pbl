"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { useState } from "react";
import ProductDetailDialog from "./ProductDetailDialog";
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  sku: string;
  images: string[];
  tags: string[];
}
interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

function ProductCard({ product }: { product: Product }) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <div className="border rounded-md overflow-hidden bg-background hover:shadow-sm transition">
        <div className="relative h-40 bg-muted">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain p-2"
          />

          {product.stock === 0 && (
            <span className="absolute top-1 left-1 bg-destructive text-white text-[10px] px-1 rounded">
              Out of stock
            </span>
          )}
        </div>

        <div className="px-1.5 py-1 space-y-0.5">
          <p className="text-[11px] leading-tight line-clamp-2 text-muted-foreground">
            {product.title}
          </p>

          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-2.5 w-2.5 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-500 text-yellow-500"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
            <span className="text-[10px] text-muted-foreground">
              ({product.rating.toFixed(1)})
            </span>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <span className="text-sm font-semibold">
              ${product.price.toFixed(2)}
            </span>

            <Button
              onClick={() => setShowDialog(true)}
              variant={"ghost"}
              size={"sm"}
              className="cursor-pointer"
            >
              View
            </Button>
          </div>
        </div>
      </div>

      <ProductDetailDialog
        product={product}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
}

function ProductSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-4/3" />
      <CardHeader className="p-3 pb-1">
        <Skeleton className="h-3 w-16 mb-1" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="p-3 pt-1 pb-2">
        <Skeleton className="h-3 w-24" />
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-7 w-16 ml-auto" />
      </CardFooter>
    </Card>
  );
}
export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

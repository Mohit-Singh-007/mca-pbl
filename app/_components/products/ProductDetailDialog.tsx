"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { useState } from "react";
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  sku: string;
  thumbnail: string;
  images: string[];
  tags: string[];
}
interface ProductDetailDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function ProductDetailDialog({
  product,
  open,
  onOpenChange,
}: ProductDetailDialogProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  if (!product) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-350 p-0 overflow-hidden">
        <div className="grid md:grid-cols-[3fr_4fr] max-h-[90vh]">
          <div className="border-r p-3 overflow-y-auto">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage] || product.thumbnail}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`shrink-0 w-12 h-12 rounded-md border transition ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-muted hover:border-muted-foreground"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-5 overflow-y-auto space-y-4">
            <h2 className="text-xl font-semibold leading-snug">
              {product.title}
            </h2>

            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline">{product.category}</Badge>
              {product.brand && (
                <span className="text-muted-foreground">
                  by {product.brand}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(1)}
              </span>
            </div>

            <div className="text-4xl font-bold">
              ${product.price.toFixed(2)}
            </div>

            <div>
              {product.stock > 0 ? (
                <Badge variant="secondary">{product.stock} in stock</Badge>
              ) : (
                <Badge variant="destructive">Out of stock</Badge>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button className="flex-1 h-11" disabled={product.stock === 0}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1 h-11">
                Wishlist
              </Button>
            </div>

            <div className="pt-4 border-t text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">SKU</span>
                <span>{product.sku}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability</span>
                <span>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
              </div>
            </div>

            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

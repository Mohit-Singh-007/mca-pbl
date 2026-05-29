"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  brand: string;
  sku: string;
  thumbnail: string;
  images: string[];
  tags: string[];
}

export interface FetchParams {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: "price" | "rating";
  order?: "asc" | "desc";
  page?: number;
  size?: number;
}

export const useProducts = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // Derive params from URL
  const params: FetchParams = {
    query: searchParams.get("query") || undefined,
    category: searchParams.get("category") || undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    minRating: searchParams.get("minRating")
      ? Number(searchParams.get("minRating"))
      : undefined,
    sortBy: (searchParams.get("sortBy") as "price" | "rating") || undefined,
    order: (searchParams.get("order") as "asc" | "desc") || "asc",
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: searchParams.get("size") ? Number(searchParams.get("size")) : 10,
  };

 
  const setParams = (updates: Partial<FetchParams>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        current.delete(key);
      } else {
        current.set(key, String(value));
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };


  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    let needsUpdate = false;

    if (!current.has("page")) {
      current.set("page", "1");
      needsUpdate = true;
    }
    if (!current.has("size")) {
      current.set("size", "10");
      needsUpdate = true;
    }

    if (needsUpdate) {
      router.replace(`${pathname}?${current.toString()}`);
    }
  }, []); // Run once on mount to check defaults

  // 2. Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

     
      const apiParams = new URLSearchParams();
      if (params.query) apiParams.append("query", params.query);
      if (params.category) apiParams.append("category", params.category);
      if (params.minPrice)
        apiParams.append("minPrice", String(params.minPrice));
      if (params.maxPrice)
        apiParams.append("maxPrice", String(params.maxPrice));
      if (params.minRating)
        apiParams.append("minRating", String(params.minRating));
      if (params.sortBy) apiParams.append("sortBy", params.sortBy);
      if (params.order) apiParams.append("order", params.order || "asc");

      // Pagination
      apiParams.append("page", String(params.page || 1));
      apiParams.append("size", String(params.size || 10));

      const url = `http://localhost:8080/api/products?${apiParams.toString()}`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        console.log("Response:", data);

        if (data.content && typeof data.totalElements === "number") {
          setProducts(data.content);
          setTotal(data.totalElements);
        } else if (Array.isArray(data)) {
          // Fallback for legacy array
          setProducts(data);
          setTotal(data.length);
        } else {
          // Fallback for unexpected object
          setProducts(data.products || []);
          setTotal(data.total || 0);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]); // Re-run when URL changes

  return { products, loading, params, setParams, total };
};

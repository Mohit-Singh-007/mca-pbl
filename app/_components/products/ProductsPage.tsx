"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import ProductGrid from "./ProductGrid";
import FilterSidebar from "./FilterSidebar";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
const API_BASE_URL = "http://localhost:8080/api/products";
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
interface PageResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    totalElements: 0,
    totalPages: 0,
    page: 0,
    size: 10,
  });
  // Fetch products based on URL params
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams(searchParams.toString());

      // Ensure defaults are set if not in URL
      if (!params.has("page")) params.set("page", "0");
      if (!params.has("size")) params.set("size", "10");
      const response = await fetch(`${API_BASE_URL}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PageResponse = await response.json();

      setProducts(data.content);
      setPagination({
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        page: data.page,
        size: data.size,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  // Update URL with new params
  const updateURL = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      // Reset to page 0 when filters change (except when changing page itself)
      if (!updates.hasOwnProperty("page") && Object.keys(updates).length > 0) {
        params.set("page", "0");
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Products</h1>
          <SearchBar
            key={searchParams.get("query") || "empty"}
            initialQuery={searchParams.get("query") || ""}
            onSearch={(query) => updateURL({ query })}
          />
          <Link href={"/"} className={buttonVariants()}>
            <ArrowLeft className="size-4 mr-1" /> Go Back
          </Link>
        </div>
        <div className="flex gap-8">
          <aside className="w-64 shrink-0">
            <FilterSidebar
              currentFilters={{
                category: searchParams.get("category") || "",
                minPrice: searchParams.get("minPrice") || "",
                maxPrice: searchParams.get("maxPrice") || "",
                minRating: searchParams.get("minRating") || "",
                sortBy: searchParams.get("sortBy") || "",
                order: searchParams.get("order") || "asc",
              }}
              onFilterChange={updateURL}
            />
          </aside>

          <main className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {loading ? (
                  "Loading..."
                ) : (
                  <>
                    Showing {products.length} of {pagination.totalElements}{" "}
                    products
                  </>
                )}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <ProductGrid products={products} loading={loading} />

            {!loading && products.length > 0 && (
              <div className="mt-8">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={(page) => updateURL({ page: page.toString() })}
                />
              </div>
            )}

            {!loading && products.length === 0 && !error && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  onClick={() => router.push(pathname)}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

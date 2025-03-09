/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import ProductService from "@/view-model/product/services/service";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  stock: number;
  created_at: string;
  updated_at: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 9;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await ProductService.listProduct({ page, limit });

        if (response.error) throw new Error(response.error.message || "Failed to fetch products");

        setProducts(response.result.data);
        setTotalPages(Math.ceil(response.result.meta.total / limit));
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const updateStock = async (id: string, newStock: number) => {
    try {
      // const response = await ProductService.updateStock(id, newStock);
      // if (response.error) throw new Error(response.error.message || "Failed to update stock");

      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, stock: newStock } : product
        )
      );
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };

  if (loading)
    return (
      <div className="p-4">
        <Skeleton className="h-32 w-full mb-4" />
        <Skeleton className="h-32 w-full mb-4" />
        <Skeleton className="h-32 w-full mb-4" />
      </div>
    );

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="product-list p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="product-item p-4">
            <CardHeader>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <CardTitle className="text-lg font-semibold mt-3">{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-gray-900">${parseFloat(product.price).toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">
                Created: {new Date(product.created_at).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Updated: {new Date(product.updated_at).toLocaleString()}
              </p>

              <div className="mt-3 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={product.stock <= 0}
                  onClick={() => updateStock(product.id, product.stock - 1)}
                >
                  -
                </Button>
                <span className="text-sm font-medium">Stock: {product.stock}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateStock(product.id, product.stock + 1)}
                >
                  +
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductList;

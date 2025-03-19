import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProductService from "@/view-model/product/services/service";
import { IProduct } from "@/view-model/product/type";
import Image from "next/image";
import Link from "next/link";

const ClientProductPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) => {
  const page = Number(searchParams.page ?? 1);
  const limit = Number(searchParams.limit ?? 10);

  const response = await ProductService.listProduct({ page, limit });
  const products = response.result.data;
  const totalPages = response.result.totalPages;

  if (products.error)
    throw new Error(products.error.message || "Failed to fetch products");

  return (
    <div className="product-list p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: IProduct) => (
          <Card key={product.id} className="product-item p-4">
            <CardHeader>
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-lg"
              />
              <CardTitle className="text-lg font-semibold mt-3">
                {product.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-gray-900">
                ${parseFloat(product.price).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Created: {new Date(product.created_at).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Updated: {new Date(product.updated_at).toLocaleString()}
              </p>

              <div className="mt-3 flex items-center gap-3">
                <span className="text-sm font-medium">
                  Stock: {product.stock}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-4">
        <Button variant="outline" disabled={page === 1} asChild>
          <Link href={`/admin/product?page=${page - 1}&limit=${limit}`}>
            Previous
          </Link>
        </Button>
        <span className="text-sm text-gray-600">
          {/* Page {page} of {totalPages} */}
        </span>
        <Button variant="outline" disabled={page >= totalPages}>
          <Link href={`/admin/product?page=${page + 1}&limit=${limit}`}>
            Next
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ClientProductPage;

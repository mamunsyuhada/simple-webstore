import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductService from "@/view-model/product/services/service";
import { IProduct } from "@/view-model/product/type";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";

const AdminProductPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) => {
  const page = Number(searchParams.page ?? 1);
  const limit = Number(searchParams.limit ?? 10);

  const response = await ProductService.listProduct({ page, limit });
  const total = Number(response.result.meta.total);
  const products = response.result.data;
  const totalPages = Math.ceil(total / limit);

  if (products.error)
    throw new Error(products.error.message || "Failed to fetch products");

  return (
    <div className="product-list p-4 flex flex-col items-stretch">
      <Table className="w-full">
        <TableHeader className="w-full">
          <TableRow className="bg-gray-100">
            <TableHead className="max-w-[300px]">Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: IProduct) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium max-w-[300px]">
                {product.title}
              </TableCell>
              <TableCell className="font-medium">{product.price}</TableCell>
              <TableCell className="font-medium">{product.category}</TableCell>
              <TableCell className="font-medium">{product.stock}</TableCell>
              <TableCell className="font-medium">
                <Button variant="default" size="icon" className="mr-1">
                  <Pencil />
                </Button>
                <Button variant="destructive" size="icon" className="mr-1">
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-4">
        <Button variant="outline" disabled={page === 1} asChild>
          <Link
            href={`/admin/product?page=${page - 1}&limit=${limit}`}
            className={`[&.disabled]:pointer-events-none ${page <= 1 ? "disabled" : ""}`}
          >
            Previous
          </Link>
        </Button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <Button variant="outline" disabled={page >= totalPages} asChild>
          <Link
            href={`/admin/product?page=${page + 1}&limit=${limit}`}
            className={`[&.disabled]:pointer-events-none ${page >= totalPages ? "disabled" : ""}`}
          >
            Next
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminProductPage;

"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ProductService from "@/view-model/product/services/service";
import { toast } from "sonner";
import { IProduct } from "@/view-model/product/type";

type Props = {
  form_type?: `create` | `update`;
  old_product?: Omit<IProduct, `created_at` | `updated_at`>;
  on_success?: () => void;
};

const ProductForm = ({
  form_type = "create",
  old_product,
  on_success,
}: Props) => {
  const [product, setProduct] = useState({
    title: old_product?.title || "",
    price: old_product?.price || 0,
    description: old_product?.description || "",
    category: old_product?.category || "",
    image: old_product?.image || "",
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.name === "price" ? parseFloat(e.target.value) : e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form_type === "create") {
      await ProductService.createProduct(product).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
          return;
        }
        toast.success("Product created successfully");
        // location.reload();
        if (on_success) on_success();
        return;
      });
    } else if (form_type === "update" && old_product) {
      await ProductService.updateProduct(old_product.id, product).then(
        (res) => {
          if (res.error) {
            toast.error(res.error.message);
            return;
          }
          toast.success("Product updated successfully");
          // location.reload();
          if (on_success) on_success();
          return;
        }
      );
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Title"
        value={product.title}
        onChange={onChange}
        name="title"
      />
      <Input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={onChange}
        name="price"
      />
      <Input
        type="text"
        placeholder="Description"
        value={product.description}
        onChange={onChange}
        name="description"
      />
      <Input
        type="text"
        placeholder="Category"
        value={product.category}
        onChange={onChange}
        name="category"
      />
      <Input
        type="text"
        placeholder="Image"
        value={product.image}
        onChange={onChange}
        name="image"
      />
      <Button type="submit">
        {form_type === "create" ? "Create" : "Update"}
      </Button>
    </form>
  );
};

export default ProductForm;

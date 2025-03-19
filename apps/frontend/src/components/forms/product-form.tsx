"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ProductService from "@/view-model/product/services/service";
import { toast } from "sonner";

type Props = {
  form_type?: `create` | `update`;
};

const ProductForm = ({ form_type = "create" }: Props) => {
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
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
    await ProductService.createProduct(product).then((res) => {
      console.log(res);
      if (res.error) {
        toast.error(res.error.message);
        return;
      }
      toast.success("Product created successfully");
      location.reload();
      return;
    });
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

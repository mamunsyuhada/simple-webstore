import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import ProductForm from "./product-form";
import { IProduct } from "@/view-model/product/type";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  product: IProduct;
};

const UpdateProduct = ({ product }: Props) => {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="default" size="icon">
                <Pencil />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Update Product</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Edit your product here</DialogDescription>
        </DialogHeader>
        <ProductForm form_type="update" old_product={product} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProduct;

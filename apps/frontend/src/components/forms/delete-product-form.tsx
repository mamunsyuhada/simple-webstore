"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import ProductService from "@/view-model/product/services/service";
import { toast } from "sonner";
import { IProduct } from "@/view-model/product/type";
import { useRouter } from "next/navigation";

type Props = {
  product: IProduct;
};

const DeleteProduct = ({ product }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    await ProductService.deleteProduct(product.id).then((res) => {
      if (res.error) {
        toast.error(res.error.message);
        return;
      } else {
        toast.success("Product deleted successfully");
        // location.reload();
        router.refresh();
        setOpen(false);
        return;
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete Product</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-bold text-primary">{product.title}</span>?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button variant="destructive" className="mr-2" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProduct;

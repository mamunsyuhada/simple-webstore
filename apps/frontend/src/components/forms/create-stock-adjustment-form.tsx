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
import { Minus, Plus, SlidersVertical } from "lucide-react";
import React, { use, useState } from "react";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import { toast } from "sonner";
import { IProduct } from "@/view-model/product/type";
import { Input } from "@/components/ui/input";
import StockAdjustmentService from "@/view-model/stock-adjustment/services/service";
import { useRouter } from "next/navigation";

type Props = {
  product: IProduct;
};

const CreateStockAdjustment = ({ product }: Props) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();

  const handleCreateStockAdjustment = async () => {
    await StockAdjustmentService.createStockAdjustment({
      productId: product.id,
      quantity,
    }).then((res) => {
      if (res.error) {
        toast.error(res.error.message);
        return;
      } else {
        toast.success("Stock Adjustment is created successfully");
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
              <Button className="bg-blue-800 hover:bg-blue-600" size="icon">
                <SlidersVertical />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Adjust Stock</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust Stock</DialogTitle>
          <DialogDescription>
            Adjust Stock of{" "}
            <span className="font-bold text-primary">
              {product.title}({product.stock})
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 justify-center">
          <Button size="icon" onClick={() => setQuantity(quantity - 1)}>
            <Minus />
          </Button>
          <Input
            step={1}
            value={quantity}
            type="number"
            className="flex-1 text-center"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <Button size="icon" onClick={() => setQuantity(quantity + 1)}>
            <Plus />
          </Button>
        </div>
        <div className="flex justify-center">
          <Button className="w-full" onClick={handleCreateStockAdjustment}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStockAdjustment;

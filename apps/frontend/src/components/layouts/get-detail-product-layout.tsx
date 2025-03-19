"use client";

import { IProduct } from "@/view-model/product/type";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  product: IProduct;
};

const GetDetailProduct = ({ product }: Props) => {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-500" size="icon">
                <Eye />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Detail</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {" "}
            <span className="font-bold text-primary">{product.title}</span>
          </DialogTitle>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={200}
            className="w-full h-full object-cover rounded-lg mt-4"
          />
          <DialogDescription className="font-bold">
            Item Stock
            <br />
            <p className="font-normal">{product.stock}</p>
            Price <br />
            <p className="font-normal">{product.price}</p>
            Category <br />
            <p className="font-normal">{product.category}</p>
            Description <br />
            <p className="font-normal">{product.description}</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GetDetailProduct;

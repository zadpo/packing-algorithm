import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from 'lucide-react';
import { Product } from "@/types";

interface UnpackedProductsCardProps {
  unpackedProducts: (Product & { quantity: number })[];
}

function consolidateProducts(products: (Product & { quantity: number })[]): (Product & { quantity: number })[] {
  const consolidated: { [key: number]: Product & { quantity: number } } = {};

  products.forEach((product) => {
    if (consolidated[product.id]) {
      consolidated[product.id].quantity += product.quantity;
    } else {
      consolidated[product.id] = { ...product };
    }
  });

  return Object.values(consolidated);
}

export function UnpackedProductsCard({ unpackedProducts }: UnpackedProductsCardProps) {
  const consolidatedProducts = consolidateProducts(unpackedProducts);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <span>Unpacked Products</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <ul className="space-y-2">
            {consolidatedProducts.map((product) => (
              <li key={product.id} className="flex items-center justify-between">
                <span>{product.name}</span>
                <Badge variant="destructive">Qty: {product.quantity}</Badge>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}


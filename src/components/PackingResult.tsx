"use client";

import React from "react";
import type { PackingResult, Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, Box, AlertTriangle } from 'lucide-react';
import { PackedBoxCard } from "@/components/card/PackedBoxCard";

interface PackingResultProps {
  result: PackingResult | null;
}

interface ConsolidatedProduct extends Product {
  quantity: number;
}

function consolidateProducts(products: (Product & { quantity: number })[]): ConsolidatedProduct[] {
  const consolidated: { [key: number]: ConsolidatedProduct } = {};

  products.forEach((product) => {
    if (consolidated[product.id]) {
      consolidated[product.id].quantity += product.quantity;
    } else {
      consolidated[product.id] = { ...product };
    }
  });

  return Object.values(consolidated);
}

export function PackingResultComponent({ result }: PackingResultProps) {
  if (!result) return null;

  const totalBoxes = result.packedBoxes.length;
  const totalPackedProducts = result.packedBoxes.reduce((sum, box) => sum + box.products.length, 0);
  const totalUnpackedProducts = result.unpackedProducts.length;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Packing Result</h2>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center space-x-2">
            <Box className="h-4 w-4" />
            <span>Total Boxes: {totalBoxes}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Packed Products: {totalPackedProducts}</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Unpacked Products: {totalUnpackedProducts}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {result.packedBoxes.map((box, index) => (
          <PackedBoxCard key={index} box={box} />
        ))}
      </div>

      {result.unpackedProducts.length > 0 && (
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
                {consolidateProducts(result.unpackedProducts).map((product) => (
                  <li key={product.id} className="flex items-center justify-between">
                    <span>{product.name}</span>
                    <Badge variant="destructive">Qty: {product.quantity}</Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export { PackingResultComponent as PackingResult };


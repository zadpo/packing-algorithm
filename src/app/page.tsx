"use client";

import React from "react";
import { ProductSelection } from "@/components/ProductSelection";
import { PackingResult } from "@/components/PackingResult";
import { Product, PackingResult as PackingResultType } from "@/types";
import { packProducts } from "@/lib/packingAlgorithm";
import { Button } from "@/components/ui/button";
import { products } from "@/data/product";
import { boxes } from "@/data/box";

export default function Home() {
  const [selectedProducts, setSelectedProducts] = React.useState<(Product & { quantity: number })[]>([]);
  const [packingResult, setPackingResult] = React.useState<PackingResultType | null>(null);

  const handleProductSelect = (product: Product, quantity: number) => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id);
    if (existingProduct) {
      setSelectedProducts(
        selectedProducts.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p))
      );
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity }]);
    }
  };

  const handlePack = () => {
    const result = packProducts(selectedProducts, boxes);
    setPackingResult(result);
  };

  const handleClearSelected = () => {
    setSelectedProducts([]);
  };

  return (
    <main className="md:px-[264px] mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Packing Algorithm Demo</h1>
      <ProductSelection
        products={products}
        selectedProducts={selectedProducts}
        onProductSelect={handleProductSelect}
        onClearSelected={handleClearSelected}
      />
      <div className="my-4">
        <Button onClick={handlePack} disabled={selectedProducts.length === 0}>
          Pack Products
        </Button>
      </div>
      <PackingResult result={packingResult} />
    </main>
  );
}

"use client";

import React from "react";
import type { PackingResult } from "@/types";
import { PackedBoxCard } from "@/components/card/PackedBoxCard";
import { SummaryCard } from "@/components/card/SummaryCard";
import { UnpackedProductsCard } from "@/components/card/UnpackedProductsCard";

interface PackingResultProps {
  result: PackingResult | null;
}

export function PackingResultComponent({ result }: PackingResultProps) {
  if (!result) return null;

  const totalBoxes = result.packedBoxes.length;
  const totalPackedProducts = result.packedBoxes.reduce((sum, box) => sum + box.products.length, 0);
  const totalUnpackedProducts = result.unpackedProducts.length;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Packing Result</h2>

      <SummaryCard
        totalBoxes={totalBoxes}
        totalPackedProducts={totalPackedProducts}
        totalUnpackedProducts={totalUnpackedProducts}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {result.packedBoxes.map((box, index) => (
          <PackedBoxCard key={index} box={box} />
        ))}
      </div>

      {result.unpackedProducts.length > 0 && (
        <UnpackedProductsCard unpackedProducts={result.unpackedProducts} />
      )}
    </div>
  );
}

export { PackingResultComponent as PackingResult };


import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package, Box, AlertTriangle } from 'lucide-react';

interface SummaryCardProps {
  totalBoxes: number;
  totalPackedProducts: number;
  totalUnpackedProducts: number;
}

export function SummaryCard({ totalBoxes, totalPackedProducts, totalUnpackedProducts }: SummaryCardProps) {
  return (
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
  );
}


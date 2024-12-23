import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PackedBox, Product } from "@/types";

interface PackedBoxCardProps {
  box: PackedBox;
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

export function PackedBoxCard({ box }: PackedBoxCardProps) {
  const consolidatedProducts = consolidateProducts(box.products);
  const weightUtilization = ((box.weight_limit - box.remainingWeight) / box.weight_limit) * 100;

  return (
    <Card className="flex flex-col shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{box.name}</span>
          <Badge variant="secondary">
            {box.products.length} item{box.products.length !== 1 && "s"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>Dimensions:</div>
          <div>
            {box.length}x{box.width}x{box.height} cm
          </div>
          <div>Weight Limit:</div>
          <div>{box.weight_limit} kg</div>
          <div>Remaining:</div>
          <div>{box.remainingWeight.toFixed(2)} kg</div>
        </div>
        <div className="mb-4">
          <div className="text-sm font-medium mb-1">Weight Utilization</div>
          <Progress value={weightUtilization} className="h-2" />
        </div>
        <div className="flex-grow">
          <h5 className="font-semibold mb-2">Products:</h5>
          <ScrollArea className="h-[120px]">
            <ul className="space-y-2">
              {consolidatedProducts.map((product) => (
                <li key={product.id} className="flex items-center justify-between text-sm">
                  <span>{product.name}</span>
                  <Badge variant="outline">Qty: {product.quantity}</Badge>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import React from "react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Minus, X } from "lucide-react";

interface ProductSelectionProps {
  products: Product[];
  selectedProducts: (Product & { quantity: number })[];
  onProductSelect: (product: Product, quantity: number) => void;
  onProductRemove: (productId: number) => void;
  onClearSelected: () => void;
}

export function ProductSelection({
  products,
  selectedProducts,
  onProductSelect,
  onProductRemove,
  onClearSelected,
}: ProductSelectionProps) {
  const [selectedProductId, setSelectedProductId] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(1);

  const handleAddProduct = () => {
    const product = products.find((p) => p.id.toString() === selectedProductId);
    if (product) {
      onProductSelect(product, quantity);
      setSelectedProductId("");
      setQuantity(1);
    }
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      onProductSelect(product, newQuantity);
    }
  };

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Product Selection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="flex-1">
            <Label htmlFor="product-select">Select Product</Label>
            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
              <SelectTrigger id="product-select">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-24">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="flex items-end space-x-2">
            <Button onClick={handleAddProduct} disabled={!selectedProductId}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
            <Button onClick={onClearSelected} variant="outline" disabled={selectedProducts.length === 0}>
              Clear All
            </Button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Selected Products:</h3>
          <ScrollArea className="h-[200px] w-full border rounded-md p-4">
            {selectedProducts.length === 0 ? (
              <p className="text-center text-gray-500">No products selected</p>
            ) : (
              <ul className="space-y-2">
                {selectedProducts.map((product) => (
                  <li key={product.id} className="flex items-center justify-between">
                    <span className="font-medium">{product.name}</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                        disabled={product.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Badge variant="secondary">{product.quantity}</Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => onProductRemove(product.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}

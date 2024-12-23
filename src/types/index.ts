export interface Product {
  id: number;
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
}

export interface Box {
  id: number;
  name: string;
  length: number;
  width: number;
  height: number;
  weight_limit: number;
}

export interface PackedBox extends Box {
  products: (Product & { quantity: number })[];
  remainingWeight: number;
}

export interface PackingResult {
  packedBoxes: PackedBox[];
  unpackedProducts: (Product & { quantity: number })[];
}

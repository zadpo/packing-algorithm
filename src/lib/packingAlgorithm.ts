import { Product, Box, PackingResult, PackedBox } from "@/types";
import { cloneDeep } from "lodash";

export function packProducts(products: (Product & { quantity: number })[], boxes: Box[]): PackingResult {
  const sortedBoxes = cloneDeep(boxes).sort(
    (a, b) => a.length * a.width * a.height - b.length * b.width * b.height
  );
  const packedBoxes: PackedBox[] = [];
  const unpackedProducts: (Product & { quantity: number })[] = [];

  const flattenedProducts = products.flatMap((p) => Array(p.quantity).fill(cloneDeep({ ...p, quantity: 1 })));

  for (const product of flattenedProducts) {
    let packed = false;

    for (const box of sortedBoxes) {
      if (canFitInBox(product, box)) {
        const existingBox = packedBoxes.find((pb) => pb.id === box.id && hasEnoughSpace(pb, product));
        if (existingBox) {
          existingBox.products.push(cloneDeep(product));
          existingBox.remainingWeight -= product.weight;
          packed = true;
          break;
        } else {
          const newBox: PackedBox = cloneDeep({
            ...box,
            products: [product],
            remainingWeight: box.weight_limit - product.weight,
          });
          packedBoxes.push(newBox);
          packed = true;
          break;
        }
      }
    }

    if (!packed) {
      unpackedProducts.push(cloneDeep(product));
    }
  }

  return { packedBoxes, unpackedProducts };
}

function canFitInBox(product: Product, box: Box): boolean {
  return (
    product.length <= box.length &&
    product.width <= box.width &&
    product.height <= box.height &&
    product.weight <= box.weight_limit
  );
}

function hasEnoughSpace(box: PackedBox, product: Product): boolean {
  return box.remainingWeight >= product.weight;
}

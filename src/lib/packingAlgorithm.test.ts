import { packProducts } from './packingAlgorithm';
import { Product, Box, PackingResult } from '@/types';

describe('packProducts', () => {
  const boxes: Box[] = [
    { id: 1, name: "Small Box", length: 10, width: 10, height: 10, weight_limit: 5 },
    { id: 2, name: "Medium Box", length: 20, width: 20, height: 20, weight_limit: 15 },
    { id: 3, name: "Large Box", length: 30, width: 30, height: 30, weight_limit: 30 },
  ];

  it('should pack small products into a small box', () => {
    const products: (Product & { quantity: number })[] = [
      { id: 1, name: "Small Item", length: 5, width: 5, height: 5, weight: 1, quantity: 3 },
    ];

    const result = packProducts(products, boxes);

    expect(result.packedBoxes).toHaveLength(1);
    expect(result.packedBoxes[0].name).toBe("Small Box");
    expect(result.packedBoxes[0].products).toHaveLength(3);
    expect(result.unpackedProducts).toHaveLength(0);
  });

  it('should pack medium products into a medium box', () => {
    const products: (Product & { quantity: number })[] = [
      { id: 2, name: "Medium Item", length: 15, width: 15, height: 15, weight: 5, quantity: 2 },
    ];

    const result = packProducts(products, boxes);

    expect(result.packedBoxes).toHaveLength(1);
    expect(result.packedBoxes[0].name).toBe("Medium Box");
    expect(result.packedBoxes[0].products).toHaveLength(2);
    expect(result.unpackedProducts).toHaveLength(0);
  });

  it('should pack large products into a large box', () => {
    const products: (Product & { quantity: number })[] = [
      { id: 3, name: "Large Item", length: 25, width: 25, height: 25, weight: 10, quantity: 1 },
    ];

    const result = packProducts(products, boxes);

    expect(result.packedBoxes).toHaveLength(1);
    expect(result.packedBoxes[0].name).toBe("Large Box");
    expect(result.packedBoxes[0].products).toHaveLength(1);
    expect(result.unpackedProducts).toHaveLength(0);
  });

  it('should handle products that don\'t fit in any box', () => {
    const products: (Product & { quantity: number })[] = [
      { id: 4, name: "Huge Item", length: 40, width: 40, height: 40, weight: 35, quantity: 1 },
    ];

    const result = packProducts(products, boxes);

    expect(result.packedBoxes).toHaveLength(0);
    expect(result.unpackedProducts).toHaveLength(1);
    expect(result.unpackedProducts[0].name).toBe("Huge Item");
  });

  it('should pack multiple products into multiple boxes', () => {
    const products: (Product & { quantity: number })[] = [
      { id: 1, name: "Small Item", length: 5, width: 5, height: 5, weight: 1, quantity: 3 },
      { id: 2, name: "Medium Item", length: 15, width: 15, height: 15, weight: 5, quantity: 2 },
      { id: 3, name: "Large Item", length: 25, width: 25, height: 25, weight: 10, quantity: 1 },
    ];

    const result = packProducts(products, boxes);

    expect(result.packedBoxes).toHaveLength(3);
    expect(result.packedBoxes[0].name).toBe("Small Box");
    expect(result.packedBoxes[1].name).toBe("Medium Box");
    expect(result.packedBoxes[2].name).toBe("Large Box");
    expect(result.unpackedProducts).toHaveLength(0);
  });
});


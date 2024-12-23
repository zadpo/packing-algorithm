// import { packProducts } from './packingAlgorithm';
// import { Product, Box } from '@/types';

// describe('packProducts', () => {
//   const boxes: Box[] = [
//     { id: 1, name: "Small Box", length: 10, width: 10, height: 10, weight_limit: 5 },
//     { id: 2, name: "Large Box", length: 20, width: 20, height: 20, weight_limit: 10 },
//   ];

//   it('should pack products into appropriate boxes', () => {
//     const products: (Product & { quantity: number })[] = [
//       { id: 1, name: "Small Item", length: 5, width: 5, height: 5, weight: 1, quantity: 2 },
//       { id: 2, name: "Medium Item", length: 15, width: 15, height: 15, weight: 3, quantity: 1 },
//     ];

//     const result = packProducts(products, boxes);

//     expect(result.packedBoxes).toHaveLength(2);
//     expect(result.packedBoxes[0].products).toHaveLength(2); // Small box with 2 small items
//     expect(result.packedBoxes[1].products).toHaveLength(1); // Large box with 1 medium item
//     expect(result.unpackedProducts).toHaveLength(0);
//   });

//   it('should handle products that don't fit in any box'() => {
//     const products: (Product & { quantity: number })[] = [
//       { id: 1, name: "Huge Item", length: 30, width: 30, height: 30, weight: 15, quantity: 1 },
//     ];

//     const result = packProducts(products, boxes);

//     expect(result.packedBoxes).toHaveLength(0);
//     expect(result.unpackedProducts).toHaveLength(1);
//     expect(result.unpackedProducts[0].name).toBe("Huge Item");
//   });
// });

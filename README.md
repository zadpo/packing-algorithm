This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Packing Algorithm Project


## How to Use the App

1. Accessing the App: 
   - Open your web browser and navigate to the URL where the app is hosted (e.g., http://localhost:3000 if running locally).

2. Product Selection:
   - On the main page, you'll see a product selection interface.
   - Use the dropdown menu labeled "Select Product" to choose a product from the available options.

3. Specifying Quantity:
   - After selecting a product, you'll see an input field labeled "Quantity".
   - Enter the desired quantity for the selected product. The minimum quantity is 1.

4. Adding Products to Your List:
   - Click the "Add Product" button to add the selected product and quantity to your list.
   - The added product will appear in the "Selected Products" section below.

5. Modifying Your Selection:
   - To add more of the same product, simply select it again and add with a new quantity.
   - To remove a product or change its quantity, you'll need to clear all selections and start over.

6. Clearing Selections:
   - If you want to start over, use the "Clear Selected" button to remove all products from your list.

7. Initiating the Packing Process:
   - Once you've added all desired products (up to 10 different types), click the "Pack Products" button.
   - This will trigger the packing algorithm to determine the optimal box arrangement.

8. Viewing Packing Results:
   - After clicking "Pack Products", the app will display the packing result below.
   - You'll see a summary showing the total number of boxes used, packed products, and any unpacked products.

9. Understanding the Packing Result:
   - Each box used in the packing will be displayed as a card.
   - For each box, you'll see:
     - The box name and dimensions
     - The weight limit and remaining weight capacity
     - A list of products packed in the box, with their quantities
     - A progress bar showing weight utilization of the box

10. Handling Unpacked Products:
    - If any products couldn't be packed (due to size or weight constraints), they'll be listed in an "Unpacked Products" section.

11. Restarting the Process:
    - To pack a new set of products, you can clear your selections and start over from step 2.

## Tips for Optimal Use

- Start with larger, heavier items when selecting products, as these are often more challenging to pack.
- Pay attention to the weight limits of boxes, especially when packing dense or heavy items.
- If you have many small items, consider grouping them together to potentially use larger boxes more efficiently.
- If you see many unpacked items, try adjusting your product selection to include fewer large items or more smaller items.



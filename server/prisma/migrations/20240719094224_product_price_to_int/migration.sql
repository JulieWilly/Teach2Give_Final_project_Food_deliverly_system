/*
  Warnings:

  - Changed the type of `product_price` on the `food_products_tb` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "food_products_tb" DROP COLUMN "product_price",
ADD COLUMN     "product_price" INTEGER NOT NULL;

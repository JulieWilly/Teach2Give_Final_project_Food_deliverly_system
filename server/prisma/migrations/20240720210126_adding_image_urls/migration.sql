/*
  Warnings:

  - Added the required column `product_url` to the `food_products_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "food_products_tb" ADD COLUMN     "product_url" TEXT NOT NULL;

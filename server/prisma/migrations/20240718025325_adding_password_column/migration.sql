/*
  Warnings:

  - A unique constraint covering the columns `[customer_email]` on the table `customers_tb` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_name]` on the table `food_products_tb` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_password` to the `customers_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers_tb" ADD COLUMN     "customer_password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "customers_tb_customer_email_key" ON "customers_tb"("customer_email");

-- CreateIndex
CREATE UNIQUE INDEX "food_products_tb_product_name_key" ON "food_products_tb"("product_name");

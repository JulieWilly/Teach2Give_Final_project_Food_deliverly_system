/*
  Warnings:

  - The `order_quantity` column on the `order_items_tb` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "order_items_tb" DROP COLUMN "order_quantity",
ADD COLUMN     "order_quantity" INTEGER NOT NULL DEFAULT 1;

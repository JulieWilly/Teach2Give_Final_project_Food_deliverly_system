/*
  Warnings:

  - The `order_status` column on the `orders_tb` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "orders_tb" DROP COLUMN "order_status",
ADD COLUMN     "order_status" BOOLEAN NOT NULL DEFAULT false;

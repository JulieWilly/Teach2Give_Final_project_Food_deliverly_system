/*
  Warnings:

  - Added the required column `order_item_total` to the `order_items_tb` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `item_price` on the `order_items_tb` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "order_items_tb" ADD COLUMN     "order_item_total" INTEGER NOT NULL,
DROP COLUMN "item_price",
ADD COLUMN     "item_price" INTEGER NOT NULL;

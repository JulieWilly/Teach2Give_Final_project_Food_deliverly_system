/*
  Warnings:

  - Added the required column `item_name` to the `order_items_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_items_tb" ADD COLUMN     "item_name" TEXT NOT NULL;

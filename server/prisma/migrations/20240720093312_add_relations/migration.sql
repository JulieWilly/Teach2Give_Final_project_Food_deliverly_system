/*
  Warnings:

  - You are about to drop the column `order_id` on the `payments_tb` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "payments_tb" DROP CONSTRAINT "payments_tb_order_id_fkey";

-- DropIndex
DROP INDEX "payments_tb_order_id_key";

-- AlterTable
ALTER TABLE "payments_tb" DROP COLUMN "order_id";

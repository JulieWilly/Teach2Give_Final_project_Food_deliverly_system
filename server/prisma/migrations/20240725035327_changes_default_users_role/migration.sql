/*
  Warnings:

  - You are about to drop the column `customer location` on the `customers_tb` table. All the data in the column will be lost.
  - You are about to drop the column `customer_address` on the `customers_tb` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customers_tb" DROP COLUMN "customer location",
DROP COLUMN "customer_address",
ALTER COLUMN "customer_role" SET DEFAULT 'User';

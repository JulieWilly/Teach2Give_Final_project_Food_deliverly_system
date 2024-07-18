/*
  Warnings:

  - Added the required column `customer_role` to the `customers_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers_tb" ADD COLUMN     "customer_role" TEXT NOT NULL;

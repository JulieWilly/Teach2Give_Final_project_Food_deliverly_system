/*
  Warnings:

  - Added the required column `cust_avatar` to the `customers_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers_tb" ADD COLUMN     "cust_avatar" TEXT NOT NULL;

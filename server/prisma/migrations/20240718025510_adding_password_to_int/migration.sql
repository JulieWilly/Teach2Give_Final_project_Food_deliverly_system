/*
  Warnings:

  - Changed the type of `customer_password` on the `customers_tb` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "customers_tb" DROP COLUMN "customer_password",
ADD COLUMN     "customer_password" INTEGER NOT NULL;

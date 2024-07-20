/*
  Warnings:

  - Added the required column `cust_id` to the `payments_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments_tb" ADD COLUMN     "cust_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "payments_tb" ADD CONSTRAINT "payments_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "customers_tb"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;

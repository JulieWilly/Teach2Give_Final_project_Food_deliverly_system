/*
  Warnings:

  - A unique constraint covering the columns `[cust_id]` on the table `address_tb` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cust_id` to the `address_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address_tb" ADD COLUMN     "cust_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "address_tb_cust_id_key" ON "address_tb"("cust_id");

-- AddForeignKey
ALTER TABLE "address_tb" ADD CONSTRAINT "address_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "customers_tb"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;

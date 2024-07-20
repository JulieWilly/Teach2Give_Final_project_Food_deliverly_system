/*
  Warnings:

  - A unique constraint covering the columns `[cust_id]` on the table `payments_tb` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id]` on the table `payments_tb` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cust_id` to the `payments_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `payments_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments_tb" ADD COLUMN     "cust_id" TEXT NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payments_tb_cust_id_key" ON "payments_tb"("cust_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_tb_order_id_key" ON "payments_tb"("order_id");

-- AddForeignKey
ALTER TABLE "payments_tb" ADD CONSTRAINT "payments_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "customers_tb"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments_tb" ADD CONSTRAINT "payments_tb_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders_tb"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

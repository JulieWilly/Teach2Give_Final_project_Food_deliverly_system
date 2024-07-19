/*
  Warnings:

  - You are about to drop the column `orders_name` on the `orders_tb` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cust_id]` on the table `orders_tb` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_address` to the `customers_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_category` to the `food_products_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cust_id` to the `orders_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_of_items` to the `orders_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_status` to the `orders_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `orders_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers_tb" ADD COLUMN     "customer_address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "food_products_tb" ADD COLUMN     "product_category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders_tb" DROP COLUMN "orders_name",
ADD COLUMN     "cust_id" TEXT NOT NULL,
ADD COLUMN     "no_of_items" INTEGER NOT NULL,
ADD COLUMN     "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "order_status" TEXT NOT NULL,
ADD COLUMN     "total_amount" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "profile_id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_image" TEXT NOT NULL,
    "cust_id" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "order_items_tb" (
    "order_items_id" TEXT NOT NULL,
    "order_quantity" TEXT NOT NULL,
    "item_price" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "order_items_tb_pkey" PRIMARY KEY ("order_items_id")
);

-- CreateTable
CREATE TABLE "reviews_tb" (
    "review_id" TEXT NOT NULL,
    "review_rating" INTEGER NOT NULL,
    "reviewDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "review_comment" TEXT NOT NULL,
    "cust_name" TEXT NOT NULL,
    "cust_id" TEXT NOT NULL,

    CONSTRAINT "reviews_tb_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "categories_tb" (
    "category_id" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "category_desc" TEXT NOT NULL,

    CONSTRAINT "categories_tb_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "payments_tb" (
    "payment_id" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_status" TEXT NOT NULL,

    CONSTRAINT "payments_tb_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "address_tb" (
    "address_id" TEXT NOT NULL,
    "customer_address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" INTEGER NOT NULL,

    CONSTRAINT "address_tb_pkey" PRIMARY KEY ("address_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_cust_id_key" ON "Profile"("cust_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_items_tb_order_id_key" ON "order_items_tb"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_items_tb_product_id_key" ON "order_items_tb"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_tb_cust_id_key" ON "reviews_tb"("cust_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_tb_cust_id_key" ON "orders_tb"("cust_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "customers_tb"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_tb" ADD CONSTRAINT "orders_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "customers_tb"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items_tb" ADD CONSTRAINT "order_items_tb_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders_tb"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items_tb" ADD CONSTRAINT "order_items_tb_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "food_products_tb"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews_tb" ADD CONSTRAINT "reviews_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "customers_tb"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;

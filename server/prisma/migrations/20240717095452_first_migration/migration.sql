-- CreateTable
CREATE TABLE "customers_tb" (
    "cust_id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "customer_phone_number" INTEGER NOT NULL,
    "customer location" TEXT NOT NULL,
    "approved_customer" BOOLEAN NOT NULL,
    "customer_createdAt" TIMESTAMP(3) NOT NULL,
    "customer_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_tb_pkey" PRIMARY KEY ("cust_id")
);

-- CreateTable
CREATE TABLE "orders_tb" (
    "order_id" TEXT NOT NULL,
    "orders_name" TEXT NOT NULL,

    CONSTRAINT "orders_tb_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "food_products_tb" (
    "product_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_description" TEXT NOT NULL,
    "product_price" TEXT NOT NULL,
    "product_createdAt" TIMESTAMP(3) NOT NULL,
    "product_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_products_tb_pkey" PRIMARY KEY ("product_id")
);

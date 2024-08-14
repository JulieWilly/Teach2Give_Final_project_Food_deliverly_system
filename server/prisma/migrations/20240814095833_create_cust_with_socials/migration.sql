-- AlterTable
ALTER TABLE "customers_tb" ALTER COLUMN "customer_email" DROP NOT NULL,
ALTER COLUMN "customer_phone_number" DROP NOT NULL,
ALTER COLUMN "customer_password" DROP NOT NULL;

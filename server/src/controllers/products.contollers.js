import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllProducts = async (req, res) => {
  try {
    const getAllProducts = await prisma.food_products.findMany({
      select: {
        product_id: true,
        productName: true,
        productDesc: true,
        productPrice: true,
      },
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Products found successfully",
        data: getAllProducts,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await prisma.food_products.findFirst({
      where: { product_id: id },
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Product found successfully.",
        data: findProduct,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { productName, productDesc, productPrice } = req.body;

    // create the products.
    const createProduct = await prisma.food_products.create({
      data: {
        productName,
        productDesc,
        productPrice,
      },
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Product created successfully.",
        data: createProduct,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = (req, res) => {
  res.send("Update one");
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.product_id;
    await prisma.food_products.delete({
      where: { product_id: id },
    });
    res
      .status(200)
      .json({ success: true, message: "product deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

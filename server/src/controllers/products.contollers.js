import { PrismaClient } from "@prisma/client";
import cloudinary from "../cloudinary/cloudinary.js";
const prisma = new PrismaClient();

export const getAllProducts = async (req, res) => {
  try {
    const getAllProducts = await prisma.food_products.findMany({
      select: {
        product_id: true,
        productName: true,
        productDesc: true,
        productPrice: true,
        productCartegory: true,
      },
    });
    res.status(200).json({
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
    res.status(200).json({
      success: true,
      message: "Product found successfully.",
      data: findProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const {
    productName,
    productDesc,
    productPrice,
    productCartegory,
    productImg,
  } = req.body;


  const uploadedImg = await cloudinary.uploader.upload(
    productImg,
    {
      upload_preset: "food_delivery_app",
      // public_id: 'avater', // username of the avater - You can add the user to mark every image with its user.
      allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"], // allowed files only. No pdfs, videos etc.
    },
    //send error if it occurs and a result if otherwise.

    async function (error, result) {
      if (error) {
        console.log(error);
      }
      console.log('image details', result)
      try {
        const createProduct = await prisma.food_products.create({
          data: {
            productName,
            productDesc,
            productPrice,
            productCartegory,
            productImg: result.url
          },
        });
        
        if (createProduct !== null){
          return res.status(200).json({success: true, message: 'Product has been created successfully.'})
        } else{
          return res.status(500).json({success: false, message: 'Product has not been created. Something went wrong!!.'})
        }
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    },
  );
  
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

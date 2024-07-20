import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCategories = async (req, res) => {
  try {
    const getAllCategories = await prisma.categories.findMany({
      select: {
        category_id: true,
        categoryName: true,
        categoryDesc: true,
      },
    });

    if (getAllCategories !== null) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Categories found successfully.",
          data: getAllCategories,
        });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "No category has been found." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const categoryID = req.params.category_id;

    const verifyCategory = await prisma.categories.findUnique({
      where: { category_id: categoryID },
    });

    if (!verifyCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category has not been found." });
    }
    const getCategory = await prisma.categories.findFirst({
      where: { category_id: categoryID },
    });
    if (getCategory !== null) {
      return res
        .status(200)
        .json({
          success: false,
          message: "Category has been found successfully.",
          data: getCategory,
        });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { categoryName, categoryDesc } = req.body;
    const createCategory = await prisma.categories.create({
      data: {
        categoryName,
        categoryDesc,
      },
    });

    if (createCategory !== null) {
      return res
        .status(200)
        .json({ success: true, message: "Category created successfully." });
    } else {
      return res
        .status(500)
        .json({
          success: false,
          message: "Category not created. Something went wrong.",
        });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  res.json("Update category.");
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryID = req.params.category_id;

    const verifyCategory = await prisma.categories.findUnique({
      where: { category_id: categoryID },
    });

    if (!verifyCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category has not been found!" });
    }

    // delete
    await prisma.categories.delete({
      where: { category_id: categoryID },
    });

    return res
      .status(200)
      .json({ success: true, message: "Category delete successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

import Product from "../model/productModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// Get All Products
const getProduct = async (req, res) => {
  try {
    const products = await Product.find().select(
      "_id name price stock category image"
    );
    return res.json({ success: true, products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};

//add product
const addProduct = async (req, res) => {
  const { name, price, description, stock, category } = req.body;

  const cleanedCategory = category ? category.trim() : "";

  if (!name || !price || !description || !req.file || !stock || !category) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    const product = new Product({
      name,
      description,
      price,
      image: { url: result.secure_url, public_id: result.public_id },
      stock,
      category: cleanedCategory,
    });

    await product.save();

    fs.unlinkSync(req.file.path);

    return res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error);

    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal Cloudinary upload error" });
  }
};


// Get Single Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    return res.json({ success: true, product });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching product" });
  }
};

// Delete Product
const delProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Delete image from Cloudinary
    if (product.image.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    // Delete the product from the database
    await Product.findByIdAndDelete(id);

    return res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error deleting product" });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;

    let product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    product.name = name || product.name;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category = category ? category.trim() : product.category;

    await product.save();

    return res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error updating product" });
  }
};

export { getProduct, getProductById, delProduct, updateProduct, addProduct };

import Product from "../model/productModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const addProduct = async (req, res) => {
    const { name, price, description, stock, category } = req.body;
    
    const cleanedCategory = category ? category.trim() : "";


  // check if all required fields are provided
  if (!name || !price || !description || !req.file || !stock || !category) {
    return res
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products", 
    });

    // new product
    const product = new Product({
      name,
      description,
      price,
      image: { url: result.secure_url, public_id: result.public_id },
      stock,
      category: cleanedCategory,
    });

    // Save the product to database
    await product.save();

    // Remove temporary file 
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

const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); 
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};

export { addProduct, getProducts };

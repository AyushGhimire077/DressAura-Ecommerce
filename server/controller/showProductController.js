import Product from "../model/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // This will get all products from the database
    res.json({ success: true, products }); // Sending the products data as a response
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};

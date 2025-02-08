import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  stock: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Activewear", "Upper", "Lower", "Shoes", "Accessories"],
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;

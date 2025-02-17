import express from 'express';
import uploads from '../middleware/uploadMiddleware.js';
import { addProduct, delProduct, getProduct, getProductById, updateProduct } from '../controller/productController.js';
import isAdmin from '../middleware/isAdmin.js';
import authMiddleware from '../middleware/authMiddelware.js';

const productRouter = express.Router();

productRouter.post('/add-product', uploads.single('image'), authMiddleware, isAdmin, addProduct)
productRouter.get("/get-product/:id", getProductById);
productRouter.delete("/delete-product/:id", authMiddleware,isAdmin ,delProduct); 
productRouter.put("/update-product/:id", authMiddleware, updateProduct);
productRouter.get("/products", getProduct);

export default productRouter;
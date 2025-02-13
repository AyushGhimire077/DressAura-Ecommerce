import express from 'express';
import uploads from '../middleware/uploadMiddleware.js';
import { addProduct } from '../controller/productController.js';
import isAdmin from '../middleware/isAdmin.js';
import authMiddleware from '../middleware/authMiddelware.js';

const productRouter = express.Router();

productRouter.post('/add-product', uploads.single('image'), authMiddleware ,isAdmin, addProduct)

export default productRouter;
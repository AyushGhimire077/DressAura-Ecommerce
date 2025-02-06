import express from 'express';
import uploads from '../middleware/uploadMiddleware.js';
import { addProduct } from '../controller/productController.js';
import isAdmin from '../middleware/isAdmin.js';

const productRouter = express.Router();

productRouter.post('/add-product', uploads.single('image'),isAdmin, addProduct)

export default productRouter;
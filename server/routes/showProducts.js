import express from 'express';
import { getProducts } from '../controller/showProductController.js';

const showProduct = express.Router();

showProduct.get('/products', getProducts);

export default showProduct
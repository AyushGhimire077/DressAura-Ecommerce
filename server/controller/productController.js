import Product from '../model/productModel.js';
import cloudinary from '../config/cloudinary.js'
import fs from 'fs';

const addProduct = async(req,res)=>{
    const {name,price,description}= req.body;

    if (!name || !price || !description || !req.file) {
        console.log("Missing fields");
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "products",
        });

        const product = new Product({
            name,description , price, image:{ url: result.secure_url,public_id: result.public_id }
        })

        await product.save();

        fs.unlinkSync(req.file.path);

        return res.json({success:true,message:"Product add successfully"})
        
    } catch (error) {
        console.error(error);

        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }

        return res.json({success:false, message:'Internal cloudinary uplaod error'})
    }
}

export {addProduct}
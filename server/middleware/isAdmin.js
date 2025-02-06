import User from "../model/authModel.js";

const isAdmin = async(req,res,next)=>{

    try {
        const user = await User.findById(req.userId)
        if(req.userID && user.role === 'admin'){
            return next();
        }else{
            return res.json({success:false,message:'Access denied. Only admin can access' })
        }
    } catch (error) {
        console.error(error)
        return res.json({success:false,message:'Something went wrong bruhhh' })
    }
}

export default isAdmin;
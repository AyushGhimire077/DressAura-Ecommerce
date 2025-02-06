import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const cookie = req.cookies.token; 

    if (!cookie) {
        return res.json({ success: false, message: 'Login again. Cookies not found' });
    }

    try {
        const decode = jwt.verify(cookie, process.env.JWT_SECRET);
        req.id = decode.id; 
        
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default authMiddleware;
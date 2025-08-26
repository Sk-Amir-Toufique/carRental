import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protect = async(req , res , next) => {

    const token = req.headers.authorization ;
    if(!token)return res.json({success: false , message:"Not Authorized"}) ;

    try{
        const userId = jwt.decode(token , process.env.JWT_SECRET) ;
        if(!userId)return res.json({success: false , message:"Not Authorized"}) ;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);       // changes by chatgpt 5:36
        req.user = await User.findById(decoded.userId).select('-password');  // changes by chatgpt

        next() ;

    }catch(error){
        return res.json({success: false , message:"Not Authorized"}) ;
    }
}
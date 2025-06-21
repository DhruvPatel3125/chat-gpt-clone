const userModel = require('../models/userModel');
const errorResponse = require('../utils/errorResponse');

//jwt
exports.sendToken = (user,statusCode,res)=>{
    const token = user.getSignedToken
    res.status(statusCode).json({
        success:true,
        token,
    });
};

//register 
exports.registerController = async (req,res,next) =>{
    try {
        const {username, email, password} = req.body
        //existing user
        const existingEmail = await userModel.findOne({email})
        if(existingEmail){
            return next(new errorResponse('Email is already register',500))
        }
        const user = await userModel.create({username,email,password})
        sendToken(user,201,res)
    } catch (error) {
        console.log(error)
        next(error)
    }
}; 
exports.loginController = async () =>{};
exports.logoutController = async () =>{};


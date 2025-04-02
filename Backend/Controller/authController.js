const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const ejs=require('ejs')
const path=require('path')
const usermodel=require('../models/usermodels')
const catchAsync=require('../utils/catchAsync')
const AppError=require('../utils/appError')

exports.getLogin=catchAsync(async(req,res,next)=>{
  
    const html=await ejs.renderFile(path.resolve('./public/views/LoginPage.ejs'))
   return res.status(200).send(html)
})

exports.signUp=catchAsync(async(req,res,next)=>{
    console.log(req.body.data)
    const newUser=await usermodel.create(req.body.data)

    const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
   
    res.cookie('token', token, { httpOnly: true,secure:true,sameSite: 'None'});//The option is very very import for cross site cookie transfer
    
   
    res.status(200).json({
        status:"success",
        token
    })
})

exports.getSignUp=catchAsync(async(req,res,next)=>{
    
    const html=await ejs.renderFile(path.resolve('./public/views/SignUpPage.ejs'))
    return res.status(200).send(html)
})

exports.login=catchAsync(async (req,res,next)=>{
    
    const {email,password}=req.body.data


    if(!email||!password){
        return next(new AppError('Please provide a email or password'),404)
    }
    
    const user=await usermodel.findOne({email:email}).select('+password')//It would be findOne and not find (VVI)

    if(!user||!(await user.correctPassword(password,user.password))){
        return next(new AppError('Incorrect email or password',401))
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })

    res.cookie('token', token, { httpOnly: true,secure:true,sameSite: 'None'})

   return res.status(200).json({
        status:"success",
        token
   })

    
})

exports.protect=catchAsync(async(req,res,next)=>{
    let token
   
    req.headers.authorization=`Bearer ${req.cookies.token}`

 if(req.headers.authorization &&req.headers.authorization.startsWith('Bearer')){
    token=req.headers.authorization.split(' ')[1]
  
 }
 
 if(!token){
    return next(new AppError('You are not logged in',401))
 }
 
 const decode=  jwt.verify(token,process.env.JWT_SECRET)

 const user=await usermodel.findById(decode.id)


 next()
 
})

exports.logOut=catchAsync(async (req,res,next)=>{
    // res.cookie('cookieName', '', {
    //     httpOnly: true, // Ensure the cookie is not accessible via JavaScript
    //     secure: true, // Send only over HTTPS
    //     sameSite: 'None', // Allow cross-origin requests
    //     expires: new Date(0), // Expire the cookie immediately
    //     path: '/', // Ensure the path matches where the cookie was set
    // })
    res.clearCookie('token', { 
        httpOnly: true, 
        secure: true, 
        sameSite: 'None', 
        path: '/', 
    });

  return  res.status(200).json({
        status:"You have logged out"
    })
 })
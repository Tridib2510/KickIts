const express=require('express')
const path=require('path')
const EventEmitter=require('node:events')
const ejs=require('ejs')
const eventEmitter = new EventEmitter();
const catchAsync=require('../utils/catchAsync')
const AppError=require('../utils/appError')
const jwt=require('jsonwebtoken')

const eventModel=require('../models/eventmodels')
const userModel=require('../models/usermodels')
const ApiFeature=require('../utils/ApiFeature')

exports.getProfile=catchAsync(async(req,res,next)=>{
    const id=req.cookies.token
    
    const decode=jwt.verify(id,process.env.JWT_SECRET)
    const user=await userModel.findById(decode.id)
    
   
    
    return res.status(200).json({
        user
    })
})
let y;

exports.getUserDetails=catchAsync(async(req,res,next)=>{
    const id=req.cookies.token
    const decode=jwt.verify(id,process.env.JWT_SECRET)
    const user=await userModel.findById(decode.id)
    return res.status(200).json({
        user
    })
})

exports.getUpdateProfile=catchAsync(async(req,res,next)=>{
    const id=req.params.id
    const user=await userModel.findById(id)

   
    y=id
    const file=await ejs.renderFile(path.resolve('./public/views/updateProfile.ejs'),{data:user})

    
    
    return res.status(200).send(file)
})





exports.updateProfile=catchAsync(async (req,res,next)=>{


    const user=await userModel.findByIdAndUpdate(y,req.body)

    next()

 
})

exports.updateProfilePicture=catchAsync(async(req,res,next)=>{

  if(req.file==undefined)return  res.redirect(`http://127.0.0.1:8000/KickIt/profile/${y}`)
   
   
    const newUser=await userModel.findByIdAndUpdate(y,{image:`${req.file.filename}`})

 
    return  res.redirect(`http://127.0.0.1:8000/KickIt/profile/${y}`)
    

})

exports.makeChanges=catchAsync(async(req,res,next)=>{
   req.id=y
   
    next()
})
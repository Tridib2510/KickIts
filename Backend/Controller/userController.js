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
const ApiFeature=require('../utils/ApiFeature');
const { runInNewContext } = require('node:vm');


const cloudinary=require('cloudinary').v2

cloudinary.config({
    cloud_name:'dsloz7tfz',
    api_key:'872176943676699',
    api_secret:'svjtmkuIsQARXvl8GYV_MqDm65s'
  });

exports.getProfile=catchAsync(async(req,res,next)=>{
    const id=req.cookies.token
    console.log(req.body)
   
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

   // console.log(req.body)
    console.log(req.file)
    if(req.file)
    cloudinary.uploader.upload(req.file.path,{
       public_id: req.file.filename,
       resource_type: 'image'
    })

const id=req.cookies.token
const decode=jwt.verify(id,process.env.JWT_SECRET)

const imageUrl=cloudinary.url(req.file.filename)
    req.body.image=imageUrl
  

    console.log(req.body)


    const user=await userModel.findByIdAndUpdate(decode.id,req.body)

    return res.status(200).json({
        "status":"success"
    })

 
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
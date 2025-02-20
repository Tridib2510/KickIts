const express=require('express')
const path=require('path')
const EventEmitter=require('node:events')
const ejs=require('ejs')
const jwt=require('jsonwebtoken')
const eventEmitter = new EventEmitter();
const catchAsync=require('../utils/catchAsync')
const AppError=require('../utils/appError')
const cloudinary=require('cloudinary').v2

const eventModel=require('../models/eventmodels')
const userModel=require('../models/usermodels')
const ApiFeature=require('../utils/ApiFeature')


cloudinary.config({
   cloud_name:'dsloz7tfz',
   api_key:'916935817685145',
   api_secret:'cJPKjcD8v7IKw_dUMqU_paF8gyM'
 });

exports.getAllEvents=catchAsync(async (req,res,next)=>{

   const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

   // cloudinary.uploader.upload('https://e0.365dm.com/21/05/1600x900/skysports-lionel-messi-barcelona_5390329.jpg?20210522073558',(err,result)=>{
   //    console.log(result)
   // });

   

  
   let id
   if(req.cookies.token===undefined){
      id='default'
   }
   else{
    const decode=jwt.verify(req.cookies.token,process.env.JWT_SECRET)
     id=decode.id
    }
const event=new ApiFeature(eventModel,req.query).filter()
   const data=await event.query   
   let user
    
    if(id==='default'){
      user={
         _id:'default'
      }
    }
    else
    user=await userModel.findById(id)

   if(data.length==0){
     next(new AppError('The data is non existant',404))
   }
   else{
      return res.status(200).json({
         token:req.cookies.token,
         data
      })
   }

  
  
})

exports.getCreateEvent=catchAsync(async(req,res,next)=>{
   
   const decode=jwt.verify(req.cookies.token,process.env.JWT_SECRET)
   
   const id=decode.id

   const user=await userModel.findById(id)
   
   if(!user){
      
      return next(new AppError('Not found by this Id',404))
     }
   const html=await ejs.renderFile(path.resolve('./public/views/CreateEvents.ejs'))
  
   return res.status(200).send(html)
})

exports.createEvent=catchAsync(async(req,res,next)=>{

   const decode=jwt.verify(req.cookies.token,process.env.JWT_SECRET)
   
   const id=decode.id

   const user=await userModel.findById(id)
   
   if(!user){
      
      return next(new AppError('Not found by this Id',404))
     }
   const body=req.body

   const data={
      "eventName":(req.body.eventName),
      "eventAddress":req.body.eventAddress,
      "totalPlayers":req.body.totalPlayers,
      "sports":req.body.sports.toLowerCase(),
      "club":user.club
   }
  
  await eventModel.create(data)
  
 return res.redirect(`http://127.0.0.1:8000/KickIt/home/${req.cookies.token}/`)
   
})
let store
exports.eventDetails=catchAsync(async(req,res,next)=>{
   console.log('hello bro')
 
  
   const id=req.cookies.token
 const a=(req.body.data)._id

  console.log(a)
  console.log(a._id)
   const decode=jwt.verify(id,process.env.JWT_SECRET)
   //console.log(decode)
   const user=await userModel.findByIdAndUpdate(decode.id,{currentEvent:a})
  
   return res.status(200).json({
      user
   })
    

})

exports.getEventDetails=catchAsync(async(req,res,next)=>{
  
   const id=req.cookies.token
   const decode=jwt.verify(id,process.env.JWT_SECRET)
   const user=await userModel.findById(decode.id)
   
   const currentEvent=user.currentEvent

  const event=await eventModel.findById(currentEvent)

   return res.status(200).json({
      event
   })
})
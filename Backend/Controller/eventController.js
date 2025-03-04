const express=require('express')
const path=require('path')
const EventEmitter=require('node:events')
const ejs=require('ejs')
const jwt=require('jsonwebtoken')
const eventEmitter = new EventEmitter();
const catchAsync=require('../utils/catchAsync')
const AppError=require('../utils/appError')

const userModel=require('../models/usermodels')
const eventModel=require('../models/eventmodels')


const ApiFeature=require('../utils/ApiFeature')





exports.getAllEvents=catchAsync(async (req,res,next)=>{

   const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

   
   

  
   let id
   if(req.cookies.token===undefined){
      id='default'
   }
   else{
    const decode=jwt.verify(req.cookies.token,process.env.JWT_SECRET)
     id=decode.id
    }
   
const event=new ApiFeature(eventModel,req.query,'').filter()
   const data=await event.query   
   let user
    
    if(id==='default'){
      user={
         _id:'default'
      }
    }
    else
    user=await userModel.findById(id)

    const image=user.image
   console.log(image)
      return res.status(200).json({
         token:req.cookies.token,
         data,
         image
      })
   

  
  
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
 console.log('What happended')
   const decode=jwt.verify(req.cookies.token,process.env.JWT_SECRET)
   console.log(req.body)
   const id=decode.id
   
   const user=await userModel.findById(id)
   req.body.createdBy=user.username
   console.log(req.body)
   if(!user){
      
      return next(new AppError('Not found by this Id',404))
     }
   const body=req.body

   
  
  await eventModel.create(req.body)
  
 return res.status(200).json({
   "status":"success"
 })
   
})
let store
exports.eventDetails=catchAsync(async(req,res,next)=>{
  
 
   const id=req.cookies.token
 const a=(req.body.data)._id

  console.log(a)
 // console.log(a._id)
   const decode=jwt.verify(id,process.env.JWT_SECRET)
   //console.log(decode)
   const user=await userModel.findByIdAndUpdate(decode.id,{currentEvent:a})
  
   return res.status(200).json({
    status:"success"
   })
    

})
exports.alreadyJoined=catchAsync(async(req,res,next)=>{
   const id=req.cookies.token
   const decode=jwt.verify(id,process.env.JWT_SECRET)
   const user=await userModel.findById(decode.id)
   const event=await eventModel.findById(req.body.eventId)
   if(event.playersJoined.includes(decode.id))
      return res.status(200).json({
        status:"alredyJoined"
      })
   else{
      return res.status(200).json({
         status:"notJoined"
      })
   }
   
})
exports.getEventDetails=catchAsync(async(req,res,next)=>{

   const id=req.cookies.token
   const decode=jwt.verify(id,process.env.JWT_SECRET)
   const user=await userModel.findById(decode.id)
   console.log('helloo')
   const currentEvent=user.currentEvent

  const event=await eventModel.findById(currentEvent).populate({
   path:'playersJoined'
}) 

   return res.status(200).json({
      event
   })
}


)
exports.join=catchAsync(async(req,res,next)=>{
   console.log(req.body)
   const id=req.cookies.token
   const decode=jwt.verify(id,process.env.JWT_SECRET)
  
    const event=await eventModel.findById(req.body.eventId)

   const user=await userModel.findById(decode.id)

   user.joinedEvents.push(req.body.eventId)
   event.playersJoined.push(decode.id)

   await user.save({
      validateBeforeSave: false
   })
   await event.save({
      validateBeforeSave: false
   })
   

   return res.status(200).json({
      status:"success"
   })
   
})
exports.myEvents=catchAsync(async(req,res,next)=>{

const id=req.cookies.token
const decode=jwt.verify(id,process.env.JWT_SECRET)
const user=await userModel.findById(decode.id)
 console.log('hi')
 const text={playersJoined:decode.id}

 const image=user.image

const event=new ApiFeature(eventModel,req.query,text).filter()
const data=await event.query 

return res.status(200).json({
  data,
  image



})
})
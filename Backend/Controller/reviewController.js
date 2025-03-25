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
const reviewModel=require('../models/reviewModel')

const ApiFeature=require('../utils/ApiFeature')

exports.createReview=catchAsync(async(req,res,next)=>{
    console.log(req.body)
    const id=req.cookies.token
    console.log(id)
    const decode=jwt.verify(id,process.env.JWT_SECRET)
    const user=await userModel.findById(decode.id)
    
if(!req.body.createdBy)req.body.createdBy=user._id
const newReview=await reviewModel.create(req.body)
return res.status(200).json({
    newReview
})


})
const express=require('express')
const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')


const Schema=new mongoose.Schema({
    username:{
        type:String,
        recquired:[true,'Name is recquired'],
        lowercase:true
        
    },
    Description:String,
    email:{
       type:String,
       required:[true,'Please provide an email'],
       validate:[validator.isEmail,'Please provide a valid email']
    },
    club:{
        type:String
    },
    password:{
      type:String,
      select:false,
      required:[true,'Please provide a password'],
      minlength:8
    },
    confirm_password:{
      type:String,
      
      required:[true,'password need to be confirmed'],
      validate:function(el){
        return el===this.password
      },
      message:'Password and confirm password are not the same'
    },
    image:{
      type:String,
      default:"default.png"
    },
    matchesPlayed:Number
})



Schema.pre('save',async function(next){
  if(!this.isModified('password')){
    return next()
  }

  this.password=await bcrypt.hash(this.password,4)

  this.confirmPassword=undefined
  next()
})

Schema.method('correctPassword', async function(candidatePassword,userPassword){
  return await bcrypt.compare(candidatePassword,userPassword)
})

const model=new mongoose.model('users',Schema)


module.exports=model


const express=require('express')
const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const crypto=require('crypto')

const Schema=new mongoose.Schema({
    username:{
        type:String,
        recquired:[true,'Name is recquired'],
       
        
    },
    Description:{
      type:String,
      default:"Hey I am a new user"
    },
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
      validate:{//Keep this validate and validator in mind we have made a mistake here
      validator:function(el){
        return el===this.password
      },
      message:'Password and confirm password are not the same'
    }
    },
    image:{
      type:String,
      default:"https://res.cloudinary.com/dsloz7tfz/image/upload/v1740896254/default_tzfjxy.jpg"
    },
    matchesPlayed:Number,
    currentEvent:{
      type:String,
      default:'none'
    },
    joinedEvents:{
      type:Array,
      default:[]
    },
    joinedRequests:[{
      type:mongoose.Schema.ObjectId,
      ref:'users'
    }
    ],
    requestedEvents:[{
      type:mongoose.Schema.ObjectId,
      ref:'Events'
    }],
    userRequest:{
      type:mongoose.Schema.ObjectId,
      ref:'users'
    },
    eventRequest:{
      type:mongoose.Schema.ObjectId,
      ref:'Events'
    },
    ratings:[{
      type:Number
    }],
    ratingsDate:[{
      type:Date
    }],
    passwordResetToken:{
      type:String,
      default:""
    },
    passwordResetExpires:{
      type:Date,
      default:Date.now()
    },
    mode:{
      type:String,
      default:'light'
    }

  
},
{
    
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
//Each time that the data is outputed as JSON we want the virtuals to be true
})
Schema.virtual ('reviews',{
  ref:'Review',
  foreignField:'User',
  localField:'_id'
})


Schema.pre('save',async function(next){
  if(!this.isModified('password')){
    return next()
  }

  this.password=await bcrypt.hash(this.password,4)

  this.confirm_password=undefined
  next()
})

Schema.method('correctPassword', async function(candidatePassword,userPassword){
  return await bcrypt.compare(candidatePassword,userPassword)
})

Schema.methods.createPasswordResetToken=function(){
  console.log('Test case 8')
  const resetToken=crypto.randomBytes(32).toString('hex')

  console.log('Test case 9')
  this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex')
  this.passwordResetExpires=Date.now()+10*60*1000
  return resetToken
}

const model=new mongoose.model('users',Schema)


module.exports=model


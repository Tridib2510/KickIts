const express=require('express')

const user=require('./usermodels')

const mongoose=require('mongoose')

const DB=process.env.DATABASE_LOCAL

const Schema=new mongoose.Schema({
    
    "eventName":{
        type:String
    },
    "activity":{
        type:String
    },
    "venue":{
        type:String
    },
    "date":{
        type:Date
    },
    "time":{
        type:String
    },
    "sports":{
        type:String
    },
    "Description":{
        type:String
    },
    
"playersRequired":{
   type:Number
},
"createdBy":{
  type:String
},
"playersJoined":[{
    type:mongoose.Schema.ObjectId,
    ref:'users'
}]


})



const model=mongoose.model('Events',Schema)

module.exports=model
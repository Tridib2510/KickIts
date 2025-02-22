const express=require('express')

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
}
    


})

const model=new mongoose.model('Events',Schema)

module.exports=model
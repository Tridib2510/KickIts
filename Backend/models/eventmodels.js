const express=require('express')

const mongoose=require('mongoose')

const DB=process.env.DATABASE_LOCAL

const Schema=new mongoose.Schema({
    
    "eventName":{
        type:String
    },
    "eventAddress":{
        type:String
    },
    "totalPlayers":{
        type:Number
    },
    "club":{
        type:String
    },
    "sports":{
        type:String
    }


})

const model=new mongoose.model('Events',Schema)

module.exports=model
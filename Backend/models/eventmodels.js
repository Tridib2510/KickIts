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
        type:Date,
        validate:{
            validator:function(el){
                const eventDate = new Date(el.getTime());

               
                const [hours, minutes] = this.time.split(':').map(Number);
       
                
                eventDate.setHours(hours, minutes, 0, 0);

                return (eventDate)>=Date.now()
              },
              message:'Please input a valid date'
        }
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
   type:Number,
   validate:{
    validator:function(el){
        return el>0
      },
      message:'You need at least 1 player'
}
},
"createdBy":{
  type:mongoose.Schema.ObjectId,
    ref:'users'
},
"playersJoined":[{
    type:mongoose.Schema.ObjectId,
    ref:'users'
}],
"joiningRequest":[{
    type:mongoose.Schema.ObjectId,
    ref:'users'
}],
"active":{
    type:String,
    default:'Active'
}


})

Schema.pre('save',async function(next){
     if(this.isModified('playersJoined')){
        if(this.playersJoined.length>=this.playersRequired){
            this.active="Filled"
        }
     }
    
     next()
  })


const model=mongoose.model('Events',Schema)

module.exports=model
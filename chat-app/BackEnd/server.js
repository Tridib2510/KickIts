const express=require('express')
const cors=require('cors')
const {Server}=require('socket.io')

const fs=require('fs')

const users=[]

const app=express()

app.use(express.static('./'))

app.get('/home',(req,res)=>{
    return res.status(200).json({
        status:"success"
    })
})



const http=require('http')

const server=http.createServer(app)

const io=new Server(server, {cors: {
    
    credentials: true
  }})

io.on('connection',socket=>{
    
socket.on('getEvent', y=>{
  
    socket.emit('sendEvent',y)

    socket.on('message',(x,name)=>{
        console.log(x)
        socket.broadcast.emit("send",x,y,name);
    })
 })
})

server.listen(3000,()=>{
    console.log('Listening')
})
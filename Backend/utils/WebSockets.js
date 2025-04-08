const {Server}=require('socket.io')

const app=require('../app')

const http=require('http')

const eventModel=require('../models/eventmodels')
const userModel=require('../models/usermodels')
const server=http.createServer(app)

const io=new Server(server, {cors: {
    
    credentials: true
  }})
let a=0
io.on('connection',socket=>{   
 
    socket.on('joinRoom', (room) => {
       socket.join(room);
        console.log(`User joined room: ${room}`);
      });
    //   const rooms =(io.sockets.adapter.rooms.get('pookie'));
    //   console.log(rooms)
    socket.on('sendRequest',async(creatorId,str,userId,event)=>{
        console.log('userId'+userId)
        const user=await userModel.findById(userId)
         console.log('The user is')
       console.log(user)
       console.log(str)
         io.to(creatorId).emit('send', user,event);
    })

})

module.exports=server


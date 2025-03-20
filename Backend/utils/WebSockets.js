const {Server}=require('socket.io')

const app=require('../app')

const http=require('http')

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
    socket.on('sendRequest',(str,eventId)=>{
         console.log("room no",eventId)
         io.to(eventId).emit('send', str);
    })

})

module.exports=server


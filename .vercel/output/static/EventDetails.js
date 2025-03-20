import url from "./ApiUrl.js";

const socket=io(`${url}`)

fetch(`${url}/KickIt/getEventDetails`,{
    credentials:'include'
})
.then(res=>res.json())
.then(data=>{
    socket.emit('joinRoom',data.userId);
    console.log(data.userId)
    const userName=data.username
   
    const eventName=document.getElementById('profile-name')
    eventName.innerHTML=data.event.eventName
    const creator=document.getElementById('creator')
    creator.innerHTML=data.event.activity
    const EventDetails=document.getElementById('EventDetails')
    EventDetails.innerHTML=data.event.Description
    const playersRequired=document.getElementById('players-required')
    playersRequired.innerHTML=data.event.playersRequired
    const venue=document.getElementById('venue')
    venue.innerHTML=data.event.venue
    const date=document.getElementById('Date')
    date.innerHTML=data.event.date
    const chat=document.getElementById('Chat')
    const join=document.getElementById('Join')
    chat.addEventListener('click',()=>{
        window.location.href="https://kickits-chatapp-frontend.onrender.com/"
    })
    fetch(`${url}/KickIt/alreadyExits`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            eventId:data.event._id
        }),
        credentials:'include'
    }).then(res=>res.json())
    .then(status=>{
        console.log(status)
         if(status.status==='alredyJoined'){
            const div=document.getElementById('division')
            const join=document.getElementById('Join')
            div.removeChild(join)

         }
         else if(status.status==='requestNotYetAnswered'){
            const div=document.getElementById('division')
            div.removeChild(chat)
            const join=document.getElementById('Join')
            join.innerHTML='Pending Request'
            join.style.backgroundColor='grey'
            join.style.color='black'
            join.style.cursor='not-allowed'
         }
         else{
            const div=document.getElementById('division')
            div.removeChild(chat)
        join.addEventListener('click',()=>{
            fetch(`${url}/KickIt/joinRequestToCreator`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    
                    eventId:data.event._id,
                    createdBy:data.event.createdBy
                }),
                cred
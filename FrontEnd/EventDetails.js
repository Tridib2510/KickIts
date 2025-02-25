fetch('http://127.0.0.1:8000/KickIt/getEventDetails',{
    credentials:'include'
})
.then(res=>res.json())
.then(data=>{
    console.log(data)
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
    chat.addEventListener('click',()=>{
        window.location.href="https://kickits-chatapp-frontend.onrender.com/"
    })
    fetch('https://kickits-1.onrender.com/KickIt/alreadyExits',{
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
         else{
            const div=document.getElementById('division')
            div.removeChild(chat)
        const join=document.getElementById('Join').addEventListener('click',()=>{
            fetch('https://kickits-1.onrender.com/KickIt/joinEvent',{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    eventId:data.event._id
                }),
                credentials:'include'
            }).then(res=>res.json())
            .then(data=>location.reload()).catch(err=>console.log(err))
            
        })
        
         }


    }).catch(err=>console.log(err))
  
    console.log(data)
})
.catch(err=>console.log(err))
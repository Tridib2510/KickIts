fetch('https://kickits-1.onrender.com/KickIt/getEventDetails',{
    credentials:'include'
})
.then(res=>res.json())
.then(data=>{
    const eventName=document.getElementById('profile-name')
    eventName.innerHTML=data.event.activity
    const creator=document.getElementById('creator')
    creator.innerHTML=data.event.createdBy
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
    console.log(data)
})
.catch(err=>console.log(err))
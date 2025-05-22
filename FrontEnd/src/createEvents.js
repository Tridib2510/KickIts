
const EventName=document.getElementById('EventName')
const activity=document.getElementById('activity')
const venue=document.getElementById('venue')
const date=document.getElementById('date')
const time=document.getElementById('time')
const Description=document.getElementById('description-event')
const playersRequired=document.getElementById('playersRequired')
const errorContainer=document.getElementById('error-container')
const logout = document.getElementById('Logout').addEventListener('click',()=>{
    fetch(`${url}/KickIt/logout`,{
        credentials:'include'
    }).then(res=>res.json()).then(data=>{
        console.log(data)
        window.location.href="AllEvents.html"
    }).catch(err=>console. log(err))
});
const MyEvents = document.getElementById('MyEvents').addEventListener('click',()=>{
    window.location.href='myEvents.html'
});
// const AllEvents = document.getElementById('AllEvents').addEventListener('click',()=>{
//     window.location.href='AllEvents.html'
// });
const createEvent = document.getElementById('createEvent');
const image = document.getElementById('image');
import url from "./ApiUrl.js";


fetch(`${url}/KickIt/profile`,{
    credentials:'include'
 }).then(res=>res.json())
 .then(data=>{
image.src=data.user.image
image.addEventListener('click',()=>{
    window.location.href='profile.html'
})
 })


const button=document.getElementById('createEvent').addEventListener('click',()=>{
    if(document.getElementById('createEvent').textContent==='Create Event'){
    const options = {
        method:'POST',
         // This ensures cookies are included in the request
         credentials:'include',
     headers: {
     'Content-Type': 'application/json',  // This was the problem We have to manually set headers to allow Content-Type:'application /json' otherwise we can not send it together with our credetials
     
 },
 body:JSON.stringify({
    eventName:EventName.value,
    activity:activity.value,
    venue:venue.value,
    date:date.value,
    time:time.value,
    Description:Description.value,
    playersRequired:playersRequired.value
    
 })
    }
 
    console.log(options.body)

    fetch(`${url}/KickIt/createEvent`,options).then(res=>res.json())
    .then(data=>{
        if (data.status==='fail'||data.status==='Error') {
            console.log(data.message)
            throw new Error(data.message);
        }
    // window.location.href="AllEvents.html"
    })
    .catch(err=>{
        errorContainer.textContent = `Error: ${err.message}`; // Display the error message
    })
    }
    else{
        window.location.href='./Login.html'
    }
})
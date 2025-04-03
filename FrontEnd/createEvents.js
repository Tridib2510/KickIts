
const EventName=document.getElementById('EventName')
const activity=document.getElementById('activity')
const venue=document.getElementById('venue')
const date=document.getElementById('date')
const time=document.getElementById('time')
const Description=document.getElementById('description')
const playersRequired=document.getElementById('playersRequired')
const errorContainer=document.getElementById('error-container')
import url from "./ApiUrl.js";

const button=document.getElementById('createEvent').addEventListener('click',()=>{
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
    fetch(`${url}/KickIt/createEvent`,options).then(res=>res.json())
    .then(data=>{
        if (data.status==='fail') {
            console.log(data.message)
            throw new Error(data.message);
        }
    window.location.href="AllEvents.html"
    })
    .catch(err=>{
        errorContainer.textContent = `Error: ${err.message}`; // Display the error message
    })

})
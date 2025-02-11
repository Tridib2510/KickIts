let newData

fetch('http://127.0.0.1:8000/KickIt/home')
.then(res=>res.json())
.then(data=>{
    
   
   for(i=0;i<data.data.length;i++){
    const div=document.createElement('div')
    const eventName=document.createElement('h2')
      eventName.innerHTML=data.data[i].activity
      eventName.className="event-name"
     div.className='event-details'
    
     div.appendChild(eventName)
    
     const eventDate=document.createElement('p')
     eventDate.className="event-date"
     eventDate.innerHTML=`Date : ${data.data[i].date}`
     div.appendChild(eventDate)

     const eventTime=document.createElement('p')
     eventTime.innerHTML=`Time : ${data.data[i].time}`
     div.appendChild(eventTime)
    document.body.appendChild(div)
   }

})
.catch(err=>console.log(err))



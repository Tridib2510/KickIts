let newData


let Events=document.createElement('div')

function helper(text){
Events=document.createElement('div')
fetch(`https://kickits-1.onrender.com/KickIt/home${text}`)


.then(res=>res.json())
.then(data=>{
    
if(data.status && data.status=='fail'){
   document.body.events=false
}
   
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
     div.addEventListener('click', () => {
     console.log('hi')
   })
   Events.appendChild(div)
   document.body.events=true
    document.body.appendChild(Events)
   }

})
.catch(err=>console.log(err))
}

helper('')

const button=document.getElementById('search-button').addEventListener('click',()=>{
  let text=''
   const b=document.getElementById('search-bar').value
   b.placeholder='hello'
   if(b!='') text=`?activity=${b}`
   if(document.body.events===true)
      document.body.removeChild(Events)
   
   
   console.log(text)
   helper(text)

})





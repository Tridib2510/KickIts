
let newData

let arr=[]
let index=[]

let Events=document.createElement('div')

const buttons=document.getElementById('auth-buttons')



const logout=document.getElementById('Logout')

const allEvents=document.getElementById('AllEvents')

const createEvent=document.getElementById('createEvent')

const image=document.getElementById('image')

function helper(text){
   
Events=document.createElement('div')
fetch(`https://kickits-1.onrender.com/KickIt/myEvents${text}`,{
   credentials:"include"
})
.then(res=>res.json())
.then(data=>{

if(text==''){
  
   image.src=data.image
      image.addEventListener('click',()=>{
         window.location.href='profile.html'
      })   

      logout.addEventListener('click',()=>{
         window.location.href="https://kickits-1.onrender.com/KickIt/logout"
      })
    
    
   }
if(data.status && data.status=='fail'){
   document.body.events=false
}
   
   for(i=0;i<data.data.length;i++){
    const div=document.createElement('div')
  arr.push(div)
    const link=document.createElement('a')
  
    const a=i
    arr.push(div)
    index.push(a)
    const d=data.data[i]
    const eventName=document.createElement('h2')
      eventName.innerHTML=data.data[i].eventName
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
     document.body.events=true
   Events.appendChild(div)
   document.body.events=true
   div.addEventListener('click',()=>{
   
      console.log(a)
      const options = {
         method:'PATCH',
          // This ensures cookies are included in the request
          credentials:'include',
      headers: {
      'Content-Type': 'application/json',  // This was the problem We have to manually set headers to allow Content-Type:'application /json' otherwise we can not send it together with our credetials
      
  },
  body:JSON.stringify({
      data:data.data[a]
  })
     }
      fetch('https://kickits-1.onrender.com/KickIt/getEventDetails',options)
      .then(res=>res.json())
      .then(data=>{
      
         window.location.href="EventDetails.html"
      })
      .catch(err=>console.log(err))
       //New concept
   })
    document.body.appendChild(Events)
   }
  
})
.catch(err=>console.log(err))
}

helper('')

const Choose=document.getElementsByClassName('custom-btn')

Choose[0].addEventListener('click',()=>{
   const b=document.getElementById('search-bar')
   b.placeholder="venue"
})
Choose[1].addEventListener('click',()=>{
   const b=document.getElementById('search-bar')
   b.placeholder="activity"
})
Choose[2].addEventListener('click',()=>{
   const b=document.getElementById('search-bar')
   b.placeholder="Creator"
})

const button=document.getElementById('search-button').addEventListener('click',()=>{
  let text=''
  arr=[]
   const b=document.getElementById('search-bar')
 
   //b.placeholder='hello'
   
   if(b!='' && b.value!=''){
      console.log(b.placeholder)
   
      text=`?${b.placeholder}=${b.value}`
   
   
   }
   
   
   
   
   if(document.body.events===true){
    
      document.body.removeChild(Events)
   }
   
   index=[]
   console.log(text)
   helper(text)
   b.placeholder="Search events..."
   

})


createEvent.addEventListener('click',()=>{
   window.location.href='createEvents.html'
})

allEvents.addEventListener('click',()=>{
window.location.href='AllEvents.html'

})



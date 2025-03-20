import url from "./ApiUrl.js"

const socket=io(`${url}`)

let newData
console.log(url)
let arr=[]
let index=[]

let Events=document.createElement('div')

const buttons=document.getElementById('auth-buttons')



const logout=document.getElementById('Logout')

const allEvents=document.getElementById('AllEvents')

const createEvent=document.getElementById('createEvent')

const image=document.getElementById('image')

const leftDiv=document.getElementById('left-div')

const rightDiv=document.getElementById('right-div')

const notification=document.getElementById('notification-icon')

const side_side_container=document.getElementById('side-by-side-container')


side_side_container.removeChild(rightDiv)



socket.on('send',(str)=>{
   console.log(str)
   console.log(str)
   const requests=document.createElement('div')
   requests.id='notifications' 
   const name=document.createElement('p')
   name.innerHTML='Name:'+str
   requests.appendChild(name)
   rightDiv.appendChild(requests)
  })


  notification.addEventListener('click',()=>{
   if(!side_side_container.contains(rightDiv)){
    side_side_container.appendChild(rightDiv);
   }
   else{
    side_side_container.removeChild(rightDiv)
   }
 })

function helper(text){
   
Events=document.createElement('div')
fetch(`${url}/KickIt/myEvents${text}`,{
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
         window.location.href=`${url}/KickIt/logout`
      })
    
    
   }
if(data.status && data.status=='fail'){
   document.body.events=false
}
   
   for(let i=0;i<data.data.length;i++){
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
      fetch(`${url}/KickIt/getEventDetails`,options)
      .then(res=>res.json())
      .then(data=>{
      
         window.location.href="EventDetails.html"
      })
      .catch(err=>console.log(err))
       //New concept
   })
   leftDiv.appendChild(Events)
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


fetch(`${url}/KickIt/joinRequests`,{
   credentials:'include'
})
.then(res=>res.json())
.then(data=>{
  console.log('Its deep bro')
   console.log(data)
 socket.emit('joinRoom',data.user._id)
  console.log(data.user)
   const arr=data.user.joinedRequests

   const array=[]
   const index=[]
   const events=[]
 for(let i=0;i<arr.length;i++){
 const requests=document.createElement('div')
 
 const a=i
 array.push(requests)
 index.push(data.user.joinedRequests[a])
 events.push(data.user.requestedEvents[a])

 requests.id='notifications' 
 const name=document.createElement('p')
  name.innerHTML='Name:'+data.user.joinedRequests[i].username
  requests.appendChild(name)
 rightDiv.appendChild(requests)

requests.addEventListener('click',()=>{
   const options = {
      method:'PATCH',
       // This ensures cookies are included in the request
       credentials:'include',
   headers: {
   'Content-Type': 'application/json',  // This was the problem We have to manually set headers to allow Content-Type:'application /json' otherwise we can not send it together with our credetials
   
},
body:JSON.stringify({
   requestedUser:data.user.joinedRequests[a],
   requestedEvents:data.user.requestedEvents[a]
})
  }
  fetch(`${url}/KickIt/joinRequests`,options)
  .then(res=>res.json())
  .then(data=>{
   console.log('hello')
  // console.log(data)
   window.location='./acceptRequest.html'
})
  .catch(err=>console.log(err))
})

 }

})
.catch(err=>console.log(err))



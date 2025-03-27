import url from "./ApiUrl.js"

const socket=io(`${url}`)

let newData
console.log(url)
let arr=[]
let index=[]

let Events=document.createElement('div')

const buttons=document.getElementById('auth-buttons')

let totalDocuments=0

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


 const navigationContainer = document.createElement('div');
 navigationContainer.className = 'navigation-container';
 
 const backward = document.createElement('img');
 backward.src = "https://img.icons8.com/ios-filled/50/000000/back.png";
 navigationContainer.appendChild(backward);
 
 const forward = document.createElement('img');
 forward.src = "https://img.icons8.com/ios-filled/50/000000/forward.png";
 navigationContainer.appendChild(forward);
 

function helper(text,params){
   
Events=document.createElement('div')
fetch(`${url}/KickIt/myEvents${text}${params}`,{
   credentials:"include"
})
.then(res=>res.json())
.then(data=>{
 console.log(data)
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
   totalDocuments=data.data.length
   leftDiv.appendChild(Events);
   leftDiv.appendChild(navigationContainer);
            
  
})
.catch(err=>console.log(err))
}

helper('','?page=1&limit=5')

let page=1;

backward.addEventListener('click',()=>{
   const c = document.getElementById('search-bar');

   const text=c.value!=''?`?${c.placeholder}=${c.value}`:'';
   if(page>1){
   if(leftDiv.contains(Events))
 leftDiv.removeChild(Events)
 page--;
 helper(text,`?page=${page}&limit=5`)
   }
   
})
forward.addEventListener('click',()=>{
   const c = document.getElementById('search-bar');
   console.log(c.value==='')
   const text=c.value!=''?`?${placeholder}=${c.value}`:'';
   console.log(c.placeholder)
   if(page<totalDocuments){
       if(leftDiv.contains(Events))
       leftDiv.removeChild(Events)
 page++;
 console.log(text)
 helper('',`?page=${page}&limit=5`)
   }
})

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
   const requests = document.createElement('div');
            const left=document.createElement('div');
            left.id="left"
            const right=document.createElement('div');
            right.id="right"
            requests.appendChild(left)
            requests.appendChild(right)
            
           requests.id='requests'
            const a = i;
            array.push(requests);
            index.push(data.user.joinedRequests[a]);
            events.push(data.user.requestedEvents[a]);
            requests.id = 'notifications';
            const name = document.createElement('h1');
            const image=document.createElement('img')
            image.src=data.user.image
            image.id="requestImage"
            name.id = "requestName";
            requests.appendChild(name);
            left.appendChild(image)
            name.innerHTML = data.user.joinedRequests[i].username+" is waiting for you response"
            
            
            rightDiv.appendChild(requests);

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



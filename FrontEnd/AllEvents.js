
let newData

let arr=[]
let index=[]

let Events=document.createElement('div')

const buttons=document.getElementById('auth-buttons')

const login=document.getElementById('login-btn')

const signUp=document.getElementById('signup-btn')

const logout=document.getElementById('Logout')

const MyEvents=document.getElementById('MyEvents')

const createEvent=document.getElementById('createEvent')

const image=document.getElementById('image')


function helper(text){
   
Events=document.createElement('div')
fetch(`https://kickits-1.onrender.com/KickIt/home${text}`,{
   credentials:"include"
})
.then(res=>res.json())
.then(data=>{

if(text==''){
    if(data.token){
      console.log(data.image)
      image.src=data.image
      image.addEventListener('click',()=>{
         window.location.href='profile.html'
      })
      console.log(data.image)
      buttons.removeChild(signUp)
      buttons.removeChild(login)
      logout.addEventListener('click',()=>{
         window.location.href="https://kickits-1.onrender.com/KickIt/logout"
      })
    }
    else{
     
     
      buttons.removeChild(image)
      buttons.removeChild(logout)
      buttons.removeChild(MyEvents)
      buttons.removeChild(createEvent)
    }
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
      fetch('http://127.0.0.1:8000/KickIt/getEventDetails',options)
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

const signUpbutton=document.getElementById('signup-btn').addEventListener('click',()=>{
   window.location.href='SignUpPage.html'
})
createEvent.addEventListener('click',()=>{
   window.location.href='createEvents.html'
})
const loginbutton=document.getElementById('login-btn').addEventListener('click',()=>{
   window.location.href='Login.html'
})

const myEvents=document.getElementById('MyEvents').addEventListener('click',()=>{
   window.location.href='myEvents.html'
})



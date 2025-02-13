let newData

let arr=[]
let index=[]

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
  arr.push(div)
    const link=document.createElement('a')
  
    const a=i
    arr.push(div)
    index.push(a)
    const d=data.data[i]
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
     document.body.events=true
   Events.appendChild(div)
   document.body.events=true
   div.addEventListener('click',()=>{
   
      console.log(a)
      const options={
         method:"POST",
         headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
         body:JSON.stringify({
            data:data.data[a]
         })
      }
      fetch('http://127.0.0.1:8000/KickIt/getEventDetails',options)
      .then(res=>res.json())
      .then(data=>console.log(data))
      .catch(err=>console.log(err))
       window.location.href="file:///C:/Users/Tridib%20Roy%20Chowdhury/OneDrive/Desktop/CODING/KickIts/FrontEnd/EventDetails.html"//New concept
   })
    document.body.appendChild(Events)
   }
  
})
.catch(err=>console.log(err))
}

helper('')

const button=document.getElementById('search-button').addEventListener('click',()=>{
  let text=''
  arr=[]
   const b=document.getElementById('search-bar').value
   b.placeholder='hello'
   if(b!='') text=`?activity=${b}`
   if(document.body.events===true){
      console.log('hello')
      document.body.removeChild(Events)
   }
   
   index=[]
   console.log(text)
   helper(text)
   

})
console.log(arr.length)
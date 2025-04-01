import url from "./ApiUrl.js";

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

const leftDiv=document.getElementById('left-div')

const rightDiv=document.getElementById('right-div')

const imageContainer=document.getElementById('imageContainer')

const description=document.getElementById('description')

const email=document.getElementById('email')

const ctx=document.getElementById('myChart') 

const EventDetails=document.getElementById('EventDetails')

const playersRequired=document.getElementById('players-required')

const venue=document.getElementById('venue')

const date=document.getElementById('Date')

const time=document.getElementById('time')

const accept=document.getElementById('accept-btn')  
const decline=document.getElementById('decline-btn') 

const reviewButton=document.getElementById('reviews-btn')

const review=document.getElementById('Reviews')

const profileDetails=document.getElementById('profile-details')

profileDetails.removeChild(review)

reviewButton.addEventListener('click',()=>{
 if(profileDetails.contains(review)){
   profileDetails.removeChild(review)
 }
 else{
   profileDetails.appendChild(review)
 }
})


Events=document.createElement('div')

console.log(url)

fetch(`${url}/KickIt/PermissionNeeded`,{
   credentials:"include"
})
.then(res=>res.json())
.then(data=>{


   const n=data.user.ratingsDate.length
   const start=data.user.ratingsDate.length-1-2>=0?data.user.ratingsDate.length-3:0

new Chart(ctx, {
 type: 'line',
 data: {
   labels:data.user.ratingsDate.slice(start,n),
   datasets: [{
     label: 'Ratings',
     data: data.user.ratings.slice(start,n),
     borderWidth: 1
   }]
 },
 options: {
   scales: {
     y: {
       beginAtZero: true
     }
   }
 }
});
   
  const i=document.createElement('img')
   i.src=data.requestedUser.image
   i.id="imageProfile"
   imageContainer.appendChild(i)
   description.innerHTML=data.requestedUser.Description
   email.innerHTML=data.requestedUser.email
   const EventName=document.getElementById('EventName')
   const activity=document.getElementById('activity')
   EventName.innerHTML=data.event.eventName
   activity.innerHTML=data.event.activity

   EventDetails.innerHTML=data.event.Description
   playersRequired.innerHTML=data.event.playersRequired
   venue.innerHTML=data.event.venue
   date.innerHTML=data.event.date
   time.innerHTML=data.event.time

  console.log(data.requestedUser)

  const reviews=data.requestedUser.reviews
  console.log(reviews)
  for(let i=reviews.length-1;i>=0;i--){
    console.log(reviews[i])
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review';

    const reviewerName = document.createElement('h4');
    reviewerName.className = 'reviewer-name';
    reviewerName.innerText = reviews[i].reviewer;

    const reviewText = document.createElement('p');
    reviewText.className = 'review-text';
    reviewText.innerText = reviews[i].review;

    reviewDiv.appendChild(reviewerName);
    reviewDiv.appendChild(reviewText);
    review.appendChild(reviewDiv);



  }

    if(data.token){
        
        image.src=data.image
        image.addEventListener('click',()=>{
           window.location.href='profile.html'
        })
       
        buttons.removeChild(signUp)
        buttons.removeChild(login)
        logout.addEventListener('click',()=>{
           window.location.href=`${url}/KickIt/logout`
        })
      }
      else{
       
       
        buttons.removeChild(image)
        buttons.removeChild(logout)
        buttons.removeChild(MyEvents)
        buttons.removeChild(createEvent)
      }
      console.log(data.event)
      accept.addEventListener('click',()=>{
         fetch(`${url}/KickIt/joinEvent`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                user:data.requestedUser,
                eventId:data.event,
                createdBy:data.event.createdBy,
                buttonPressed:'accept'
            }),
            credentials:'include'
        }).then(res=>res.json())
        .then(data=>{
        window.location.href='AllEvents.html'
           console.log(data)
           
           
        }).catch(err=>console.log(err))
      })

      decline.addEventListener('click',()=>{
         console.log('hello boy')
         fetch(`${url}/KickIt/joinEvent`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                user:data.requestedUser,
                eventId:data.event,
                createdBy:data.event.createdBy,
                buttonPressed:'decline'
            }),
            credentials:'include'
        }).then(res=>res.json())
        .then(data=>{
         window.location.href='AllEvents.html'
           console.log(data)
           
           
        }).catch(err=>console.log(err))
      })
})
.catch(err=>console.log(err))


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

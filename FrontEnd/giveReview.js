import url from "./ApiUrl.js";

const params=new URLSearchParams(window.location.search)
const searchUrl=params.get('userId')
const sport=params.get('activity')
const event=params.get('event')
console.log(url)
console.log(searchUrl)


const logout = document.getElementById('Logout').addEventListener('click',()=>{
  fetch(`${url}/KickIt/logout`,{
    credentials:'include'
}).then(res=>res.json()).then(data=>{
    console.log(data)
    window.location.href="AllEvents.html"
}).catch(err=>console. log(err))

});
const MyEvents = document.getElementById('MyEvents').addEventListener('click',()=>window.location.href='AllEvents.html');
const createEvent = document.getElementById('createEvent').addEventListener('click',()=>window.location.href='createEvents.html');;
const Profileimage = document.getElementById('profileIcon');

const submit=document.getElementById('submit');
const imageContainer=document.getElementById('imageContainer');

if (!searchUrl) {
    console.error("userId query parameter is missing in the URL.");
} else {
    fetch(`${url}/KickIt/${searchUrl}`,{
      credentials:'include'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const image = document.createElement('img');
            image.id='image'
            const name=document.getElementById('name')
            name.innerHTML=`${data.user.username}`
            Profileimage.src=data.me.image;
            Profileimage.addEventListener('click',()=>window.location.href='profile.html')
            image.src = data.user.image;
            imageContainer.appendChild(image);
            const description = document.getElementById('description');
            description.innerHTML = data.user.Description;
            const email=document.getElementById('email')
            email.innerHTML=data.user.email
        })
        .catch(err => console.log(err));
}
 
  
    submit.addEventListener('click',()=>{

  const rating=document.getElementById('rating').value
  const review=document.getElementById('review').value
   const options={
         method:'POST',
         credentials: 'include' ,
         headers:{
              'Content-Type':'application/json'
         },
         body:JSON.stringify({
               User:searchUrl,
                rating:rating,
                review:review,
                sports:sport,
                event:event
                

         })
   }
  fetch(`${url}/KickIt/${searchUrl}/Review/createReview`,options)
  .then(res=>res.json())
  .then(data=>{
    window.location.href='./eventDetails.html'
  })
  .catch(err=>console.loge(err))
})
//comment
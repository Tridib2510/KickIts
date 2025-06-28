import url from "./ApiUrl.js";

const params=new URLSearchParams(window.location.search)
const searchUrl=params.get('userId')
const sport=params.get('activity')
const event=params.get('event')
console.log(url)
console.log(searchUrl)

// const about = document.getElementById('About').addEventListener('click',()=>{
//   window.location.href='About.html'
// });

const logout = document.getElementById('Logout').addEventListener('click',()=>{
  fetch(`${url}/KickIt/logout`,{
    credentials:'include'
}).then(res=>res.json()).then(data=>{
    console.log(data)
    window.location.href="AllEvents.html"
}).catch(err=>console. log(err))

});

// const MyEvents = document.getElementById('MyEvents').addEventListener('click',()=>window.location.href='AllEvents.html');
// const createEvent = document.getElementById('createEvent').addEventListener('click',()=>window.location.href='createEvents.html');;
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
            const image = document.getElementById('Reviewee')
            // image.id='image'
            const name=document.getElementById('name')
             name.innerHTML=`${data.user.username}`
            Profileimage.src=data.me.image;
            
             image.src = data.user.image;
      
            const description = document.getElementById('description');
            description.innerHTML = data.user.Description;
            const email=document.getElementById('email')
            // email.innerHTML=data.user.email
        })
        .catch(err => console.log(err));
}
  const stars = document.querySelectorAll('#star-rating svg');
  let selected = 0;
  stars.forEach((star, idx) => {
    star.addEventListener('click', function () {
      selected = idx + 1;
      stars.forEach((s, i) => {
        s.style.fill = i < selected ? '#facc15' : '#d1d5db'; // yellow-300 or gray-300
      });
      // Print the number of stars selected
      console.log('Number of stars:', selected);
    });
    star.addEventListener('mouseenter', function () {
      stars.forEach((s, i) => {
        s.style.fill = i <= idx ? '#fde68a' : '#d1d5db'; // lighter yellow on hover
      });
    });
    star.addEventListener('mouseleave', function () {
      stars.forEach((s, i) => {
        s.style.fill = i < selected ? '#facc15' : '#d1d5db';
      });
    });
  });

  console.log('hi',selected)
  
    submit.addEventListener('click',(e)=>{
   e.preventDefault()
  const rating=selected
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
    console.log(data)
     window.location.href='./EventDetails.html'
  })
  .catch(err=>console.loge(err))
})

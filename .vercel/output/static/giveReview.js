import url from "./ApiUrl.js";

const params=new URLSearchParams(window.location.search)
const searchUrl=params.get('userId')
const sport=params.get('activity')
console.log(url)
console.log(searchUrl)

const submit=document.getElementById('submit');
const imageContainer=document.getElementById('imageContainer');

if (!searchUrl) {
    console.error("userId query parameter is missing in the URL.");
} else {
    fetch(`${url}/KickIt/${searchUrl}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const image = document.createElement('img');
            image.id='image'
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
                sports:sport

         })
   }
  fetch(`${url}/KickIt/${searchUrl}/Review/createReview`,options)
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
  })
  .catch(err=>console.loge(err))
})
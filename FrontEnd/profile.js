


fetch('https://kickits-1.onrender.com/KickIt/profile',{credentials:'include'}).then((res)=>res.json()).then((data)=>{
    console.log(data)
    const name=document.getElementById('name')
name.innerHTML='Name: '+data.user.username

const email=document.getElementById('email')
email.innerHTML='Email: '+data.user.email

const description=document.getElementById('description')
description.innerHTML=data.user.Description
const image=document.createElement('img')
const div=document.getElementById('image')
//console.log(image.value)


image.src='https://res.cloudinary.com/dsloz7tfz/image/upload/v1740231238/default_h4rvgx.jpg'
div.appendChild(image)

}).catch((err)=>console.log(err))


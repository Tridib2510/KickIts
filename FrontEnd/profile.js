let a=false
let b=false
let c=false
const profileContainer=document.getElementById('profile-container')
const description=document.getElementById('description')
const profile_details=document.getElementById('profile-details')
const profile=document.getElementById('profile-header')
const im=document.getElementById('nameContainer')
const update=document.getElementById('update')
const name=document.getElementById('name')
const descriptionUpdate=document.getElementById('Description')

const descriptionContainer=document.getElementById('descriptionContainer')

const changeProfile=document.getElementById('changeProfile')
profile.removeChild(changeProfile)
profile.removeChild(update)
descriptionContainer.removeChild(descriptionUpdate)

profile.addEventListener('click',()=>{
    console.log(a)
    if(a==false){
     if(descriptionContainer.contains(descriptionUpdate)){
        descriptionContainer.removeChild(descriptionUpdate)
     
    }
    if(!descriptionContainer.contains(description)){
        
        descriptionContainer.appendChild(description)
    }
    if(!im.contains(name) ){
    im.appendChild(name)
  
    }
    if(im.contains(changeProfile)){
        a++
        im.removeChild(changeProfile)
        
    }
}
else{
    a=false
}
if(profile.contains(update) && b==false){
    console.log('hola')
    profile.removeChild(update)
}
b=false
})


description.addEventListener('click',()=>{
    console.log(c)
   
    if(descriptionContainer.contains(description)){
        b=true
        descriptionContainer.removeChild(description)
       profile.appendChild(update)
    }
    
    if(!descriptionContainer.contains(descriptionUpdate)){
        a=true
        descriptionContainer.appendChild(descriptionUpdate)
    }
    else{
        a=true

    }
  


})
descriptionUpdate.addEventListener('click',()=>{
    b=true
    a=true
})


fetch('https://kickits-1.onrender.com/KickIt/profile',{credentials:'include'}).then((res)=>res.json()).then((data)=>{
    console.log(data)
    
name.innerHTML='Name: '+data.user.username
name.addEventListener('click',()=>{
   
    
    
    if(im.contains(name)){
        
    im.removeChild(name)
    b=true
    profile.appendChild(update)
    }
    if(!im.contains(changeProfile)){
        a=true
    im.appendChild(changeProfile) 
    
    }
    else {
        console.log('hello')
        a=true
    }
 
    
   
})

changeProfile.addEventListener('click',()=>{
    b=true
    a=true
})
const email=document.getElementById('email')
email.innerHTML='Email: '+data.user.email


description.innerHTML=data.user.Description
const image=document.createElement('img')
const div=document.getElementById('image')
//console.log(image.value)


image.src='https://res.cloudinary.com/dsloz7tfz/image/upload/v1740231238/default_h4rvgx.jpg'
div.appendChild(image)

}).catch((err)=>console.log(err))

update.addEventListener('click',()=>{

const username=changeProfile.value!=''?changeProfile.value:(name.innerHTML).substring(5)
const Description=descriptionUpdate.value!=''?descriptionUpdate.value:description.innerHTML
console.log(description.innerHTML)


    fetch('https://kickits-1.onrender.com/KickIt/profileUpdate',{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify({
            username:username,
            Description:Description
        })
    }).then(res=>res.json()).then((data)=>console.log(data)).catch(err=>console.log(err))
        
       //window.location.reload()
})
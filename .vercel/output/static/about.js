import url from './ApiUrl.js'

const login = document.getElementById('login-btn');
const signUp = document.getElementById('signup-btn');
const logout = document.getElementById('Logout');
const AllEvents = document.getElementById('AllEvents');
const myEvents=document.getElementById('MyEvents')
const createEvent = document.getElementById('createEvent');
const image = document.getElementById('image');
const authController=document.getElementById('auth-buttons')
const notification=document.getElementById('notification-icon')

fetch(`${url}/KickIt/profile`, { credentials: 'include' })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        if(data.status==='error'){
           
           authController.removeChild(myEvents)
           authController.removeChild(createEvent)
           document.getElementById('profile-pic').removeChild(image)
           authController.removeChild(logout)
        
               
           login.addEventListener('click',()=>{
            window.location.href='Login.html'
        })
        signUp.addEventListener('click',()=>{
            window.location.href='SignUpPage.html'
        })
        AllEvents.addEventListener('click',()=>{
            window.location.href='AllEvents.html'
        })
        }
        else{
            authController.removeChild(signUp)
           authController.removeChild(login)
            image.src=data.user.image
            image.addEventListener('click',()=>{
                window.location.href='profile.html'
            })
            logout.addEventListener('click',()=>{
                fetch(`${url}/KickIt/logout`,{
                    credentials:'include'
                }).then(res=>res.json()).then(data=>{
                    console.log(data)
                    window.location.href="AllEvents.html"
                }).catch(err=>console. log(err))
            })
            createEvent.addEventListener('click',()=>{
                window.location.href='createEvents.html'
            })
            AllEvents.addEventListener('click',()=>{
                window.location.href='AllEvents.html'
            })

         
        }
     
    })
    .catch(err=>console.log(err))
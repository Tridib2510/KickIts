import url from "./ApiUrl.js";

const client = new Appwrite.Client()
 .setEndpoint('https://fra.cloud.appwrite.io/v1')
 .setProject('68507be10009887f1337')

  const account = new Appwrite.Account(client);


async function handleSignUp(){
    account.createOAuth2Session(
        'google',
       `https://kickit-app.vercel.app/FrontEnd/src/index.html`,
        `https://kickit-app.vercel.app/FrontEnd/src/index.html`
    )
   account.get()
  .then(user => {

    account.get()
  .then(user => {

   const data={
     "username":`${user.name}`,
     "password":`${user.$id}`,
     "email":`${user.email}`,
     "confirm_password":`${user.$id}`
   }

     const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data:data
        })
    };
    fetch(`${url}/KickIt/signUp`,options).
    then(res=>{
   console.log(res)
        
        return res.json(); // Parse the JSON response

    })
    .then(data=>{
        
        if (data.status==='fail'||data.status==='Error') {
            console.log(data.message)
            throw new Error(data.message);
        }
    // window.location.href="AllEvents.html"
    })
    .catch(err=>{
       // console.log('hello')
        console.log(err.message)
        errorContainer.textContent = `Error: ${err.message}`; // Display the error message
    })
  })
  .catch(error => {
    console.error('Failed to get user account:', error);
  });

  
  })
   
}

document.getElementById('google-btn').addEventListener('click',()=>{
    handleSignUp()
})


const errorContainer=document.getElementById('error-container')
const form=document.getElementById('signup')
console.log(url)
form.addEventListener('submit',(event)=>{

    event.preventDefault()
    console.log('Signup form submitted!');
    const formData = new FormData(form);
    const data=Object.fromEntries(formData.entries())
    console.log(data)
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data:data
        })
    };
    fetch(`${url}/KickIt/signUp`,options).
    then(res=>{
   console.log(res)
        
        return res.json(); // Parse the JSON response

    })
    .then(data=>{
        
        if (data.status==='fail'||data.status==='Error') {
            console.log(data.message)
            throw new Error(data.message);
        }
     //window.location.href="AllEvents.html"
    })
    .catch(err=>{
       // console.log('hello')
        console.log(err.message)
        errorContainer.textContent = `Error: ${err.message}`; // Display the error message
    })
})
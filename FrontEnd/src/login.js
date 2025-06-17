import url from "./ApiUrl.js";
const client = new Appwrite.Client()

 .setEndpoint('https://fra.cloud.appwrite.io/v1')
 .setProject('68507be10009887f1337')

  const account = new Appwrite.Account(client);


async function handleLogin(){
    account.createOAuth2Session(
        'google',
        `${url}/FrontEnd/src/index.html`,
        `${url}/FrontEnd/src/index.html`
    )
   account.get()
  .then(user => {

    account.get()
  .then(user => {

   const data={
    "email":`${user.email}`,
     "password":`${user.$id}`,
     
     
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
    fetch(`${url}/KickIt/login`,options).
    then(res=>{
   console.log(res)
        
        return res.json(); // Parse the JSON response

    })
    .then(data=>{
        console.log(data)
        if (data.status==='fail') {
            console.log(data.message)
            throw new Error(data.message);
        }
    window.location.href="index.html"
    })
    .catch(err=>{
      
        console.log(err.message)
        errorContainer.textContent = `Error: ${err.message}`; // Display the error message
    })
     console.log(data)
   
  })
  .catch(error => {
    console.error('Failed to get user account:', error);
  });

   
  })
  .catch(error => {
    console.error('Failed to get user account:', error);
  });
   
}

document.getElementById('google-btn').addEventListener('click',()=>{
    handleLogin()
})
const errorContainer=document.getElementById('error-container')
const form=document.getElementById('login')
console.log(url)
form.addEventListener('submit',(event)=>{
    event.preventDefault()
    console.log('Login form submitted!');
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
    fetch(`${url}/KickIt/login`,options).
    then(res=>{
   console.log(res)
        
        return res.json(); // Parse the JSON response

    })
    .then(data=>{
        console.log(data)
        if (data.status==='fail') {
            console.log(data.message)
            throw new Error(data.message);
        }
    window.location.href="index.html"
    })
    .catch(err=>{
      
        console.log(err.message)
        errorContainer.textContent = `Error: ${err.message}`; // Display the error message
    })
})
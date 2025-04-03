import url from "./ApiUrl.js";
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
   
        
        return res.json(); // Parse the JSON response

    })
    .then(data=>{
        console.log(data)
        if (data.status==='fail'||data.status==='Error') {
            console.log(data);
            throw new Error(data.message);
        }
    window.location.href="AllEvents.html"
    })
    .catch(err=>{
      
        console.log(err.message)
        errorContainer.textContent = `Error: ${err.message}`; // Display the error message
    })
})
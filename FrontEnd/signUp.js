import url from "./ApiUrl.js";
const errorContainer=document.getElementById('error-container')
const form=document.getElementById('signup')
console.log(url)
form.addEventListener('submit',(event)=>{
    event.preventDefault()
    console.log('Signup form submitted!');
    const formData = new FormData(form);
    const data=Object.fromEntries(formData.entries())
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
   
        
        return res.json(); // Parse the JSON response

    })
    .then(data=>{
        console.log(data)
        if (data.status==='fail'||data.status==='error') {
            console.log(data.message)
            throw new Error(data.message);
        }
        else
     window.location.href="AllEvents.html"
    })
    .catch(err=>{
       // console.log('hello')
        console.log(err.message)
        errorContainer.textContent = `Error: ${err.message}`; // Display the error message
    })
})

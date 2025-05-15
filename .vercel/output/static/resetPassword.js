import url from './ApiUrl.js';


const queryString=window.location.search;
const urlParams=new URLSearchParams(queryString);
const token=urlParams.get('token')
document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
    event.preventDefault()
    const passwordReset = document.getElementById('new-password').value
    const passwordResetConfirm = document.getElementById('confirm-password').value
    fetch(`${url}/KickIt/resetPassword/${token}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            password: passwordReset,
            confirm_password: passwordResetConfirm

         })
    
    
}).then(res => res.json())
.then(data=>{
    if (data.status==='fail'||data.status==='Error') {
        console.log(data);
        throw new Error(data.message);
    }
    else
   window.location.href = 'Login.html'
})
.catch(err =>{
        const errorContainer=document.getElementById('error-container')
        
    console.log(err.message)
        errorContainer.textContent = `Error: ${err.message}`; // Display the error message
})
})


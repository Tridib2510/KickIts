import url from './ApiUrl.js';


const queryString=window.location.search;
const urlParams=new URLSearchParams(queryString);
const token=urlParams.get('token')
document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
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
   window.location.href = '/login.html'
})
.catch(err => console.log(err))
})


import url from './ApiUrl.js';

document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
    
    const email = document.getElementById('email').value;

    fetch(`${url}/KickIt/forgotPassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    
}).then(res => res.json())
.then(data => {
    console.log(data)
})
.catch(err => console.log(err))

})
fetch('https://kickits-1.onrender.com/KickIt/getEventDetails')
.then(res=>res.json())
.then(data=>console.log(data))
.catch(err=>console.log(err))
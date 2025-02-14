fetch('https://ki-8ew8.onrender.com/KickIt/getEventDetails')
.then(res=>res.json())
.then(data=>console.log(data))
.catch(err=>console.log(err))
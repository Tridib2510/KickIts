fetch('http://127.0.0.1:8000/KickIt/getEventDetails')
.then(res=>res.json())
.then(data=>console.log(data))
.catch(err=>console.log(err))
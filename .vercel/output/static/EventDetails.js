import url from "./ApiUrl.js";
//Web socket below
const socket=io(`${url}`)
const rightDiv=document.getElementById('right-div')
const leftDiv=document.getElementById('left-div')

fetch(`${url}/KickIt/getEventDetails`,{
    credentials:'include'
})
.then(res=>res.json())
.then(data=>{
    console.log(data.event.playersJoined.length)
    for(let i=0;i<data.event.playersJoined.length;i++){
        const player=document.createElement('div')
        player.id='player'
        const playerInfo = document.createElement('div');
            playerInfo.className = 'player-info';

            const playerName = document.createElement('h1');
            playerName.innerHTML = 'Name :' + data.event.playersJoined[i].username;
            player.appendChild(playerName);
            
            

            const playerImage = document.createElement('img');
            playerImage.id = 'player-image';
            playerImage.src = data.event.playersJoined[i].image;

            player.appendChild(playerInfo);
            player.appendChild(playerImage);

            const joinedUsers = document.getElementById('joined-users');
            joinedUsers.appendChild(player);
    }
    socket.emit('joinRoom',data.userId);
    console.log(data.userId)
    const userName=data.username
   
    const eventName=document.getElementById('profile-name')
    eventName.innerHTML=data.event.eventName
    const creator=document.getElementById('creator')
    creator.innerHTML=data.event.activity
    const EventDetails=document.getElementById('EventDetails')
    EventDetails.innerHTML=data.event.Description
    const playersRequired=document.getElementById('players-required')
    playersRequired.innerHTML=data.event.playersRequired
    const venue=document.getElementById('venue')
    venue.innerHTML=data.event.venue
    const date=document.getElementById('Date')
    date.innerHTML=data.event.date
    const chat=document.getElementById('Chat')
    const join=document.getElementById('Join')
    const joinedUsers=document.getElementById('joined-users')
    chat.addEventListener('click',()=>{
        window.location.href="https://kickits-chatapp-frontend.onrender.com/"
    })
    fetch(`${url}/KickIt/alreadyExits`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            eventId:data.event._id
        }),
        credentials:'include'
    }).then(res=>res.json())
    .then(status=>{
       console.log(status)
         if(status.status==='alredyJoined'){
            const div=document.getElementById('division')
            const join=document.getElementById('Join')
            div.removeChild(join)

         }
         else if(status.status==='requestNotYetAnswered'){
            const div=document.getElementById('division')
            div.removeChild(chat)
            const join=document.getElementById('Join')
            join.innerHTML='Pending Request'
            join.style.backgroundColor='grey'
            join.style.color='black'
            join.style.cursor='not-allowed'
         }
         else{
            const joinedUsers=document.getElementById('joined-users')
            rightDiv.removeChild(joinedUsers)
            leftDiv.style.margin = 'auto';
            const div=document.getElementById('division')
           
            div.removeChild(chat)
        join.addEventListener('click',()=>{
            fetch(`${url}/KickIt/joinRequestToCreator`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    
                    eventId:data.event._id,
                    createdBy:data.event.createdBy
                }),
                credentials:'include'
            }).then(res=>res.json())
            .then(data=>{
               console.log(data)
                socket.emit('sendRequest',userName,data.creatorId)
                const join=document.getElementById('Join')
                join.innerHTML='Pending Request'
                join.style.backgroundColor='grey'
                join.style.color='black'
                join.style.cursor='not-allowed'
               
            }).catch(err=>console.log(err))
            
        })
        
         }


    }).catch(err=>console.log(err))
  
    console.log(data)
})
.catch(err=>console.log(err))
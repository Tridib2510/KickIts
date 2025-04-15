
import url from "./ApiUrl.js";
//Web socket below
const socket=io(`${url}`)
const rightDiv=document.getElementById('right-div')
const leftDiv=document.getElementById('left-div')
const mainContainer=document.getElementById('main-container')

const about = document.getElementById('About').addEventListener('click',()=>{
    window.location.href='About.html'
});


const logout = document.getElementById('Logout').addEventListener('click',()=>{
    fetch(`${url}/KickIt/logout`,{
        credentials:'include'
    }).then(res=>res.json()).then(data=>{
        console.log(data)
        window.location.href="AllEvents.html"
    }).catch(err=>console.log(err))
});
const AllEvents = document.getElementById('AllEvents').addEventListener('click',()=>{
 window.location.href='./AllEvents.html'
})
const createEvent = document.getElementById('createEvent').addEventListener('click',()=>{
    window.location.href='./createEvents.html'
});
const image = document.getElementById('image')


fetch(`${url}/KickIt/getEventDetails`,{
    credentials:'include'
})
.then(res=>res.json())
.then(data=>{
    image.src=data.user.image
    image.addEventListener('click', () => {
        window.location.href = 'profile.html';
    });
    console.log(data.event.playersJoined.length)
    let arr=[]
    let userId=[]
    for(let i=0;i<data.event.playersJoined.length;i++){
        const player=document.createElement('div')
        arr.push(player)
        
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
            const a=i
            player.addEventListener('click',()=>{
                
                console.log(data.event.activity)
            if(data.event.createdBy===data.userId)
                window.location.href="/giveReview.html?userId="+data.event.playersJoined[a]._id+"&activity="+data.event.activity+"&event="+data.event._id

            })
    }
    socket.emit('joinRoom',data.userId);
    console.log('data')
    console.log(data)
    const userName=data.username
    const user_id=data.userId
   const event=data.event
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
    const time=document.getElementById('time')
    date.innerHTML=data.event.date
    time.innerHTML=data.event.time
    const chat=document.getElementById('Chat')
    const join=document.getElementById('Join')
    const leave=document.getElementById('Leave')
    const deleteEvent=document.getElementById('Delete')
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

            leave.addEventListener('click',()=>{
                console.log('hello')
               const options = {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id:data.event._id
                })
            };
             fetch(`${url}/KickIt/leaveEvent`,options)
             .then(res=>res.json())
             .then(data=>window.location.href='./EventDetails.html')
             .catch(err=>console.log(err))
            
            })
            deleteEvent.addEventListener('click',()=>{
                const options2 = {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id:data.event._id
                    })
                };
                div.removeChild(leave)
            fetch(`${url}/KickIt/removeEvent`,options2)
            .then(res=>res.json())
            .then(data=>window.location.href='./AllEvents.html')
            .catch(err=>console.log(err))
        
            })
             div.removeChild(deleteEvent);

         }
         else if(status.status==='requestNotYetAnswered'){
            const div=document.getElementById('division')
            div.removeChild(chat)
            div.removeChild(leave)
            div.removeChild(deleteEvent)
            const join=document.getElementById('Join')
            join.innerHTML='Pending Request'
            join.style.backgroundColor='grey'
            join.style.color='black'
            join.style.cursor='not-allowed'
         }
         else{
            const joinedUsers=document.getElementById('joined-users')
           // rightDiv.removeChild(joinedUsers)
            leftDiv.style.margin = 'auto';
            const div=document.getElementById('division')
           
            div.removeChild(chat)
            div.removeChild(leave)
            div.removeChild(deleteEvent)
            
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
                console.log('Pookie')
               console.log(data)
                socket.emit('sendRequest',data.creatorId,userName,user_id,event)
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

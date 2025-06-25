
import url from "./ApiUrl.js";
//Web socket below
const socket2=io(`${url}`)
const rightDiv=document.getElementById('right-div')
const leftDiv=document.getElementById('left-div')
const mainContainer=document.getElementById('main-container')
const chat=document.getElementById('chat-dropdown')
const chat_parent=chat.parentElement;

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
    const playersEvent=document.getElementById('event-players')
        playersEvent.parentNode.removeChild(playersEvent)

   
    for(let i=0;i<data.event.playersJoined.length;i++){
        const player=document.createElement('div')

         const playersParticipants=playersEvent.cloneNode(true)
        arr.push(playersParticipants)
        
        player.id='player'
        const playerInfo = document.createElement('div');
            playerInfo.className = 'player-info';

            const playerName = document.createElement('h1');
            playerName.innerHTML =data.event.playersJoined[i].username;
            player.appendChild(playerName);
            
             const playersName = playersParticipants.querySelector('#players-name');
                 playersName.innerHTML = data.event.playersJoined[i].username;
            const playerImage = document.createElement('img');
            playerImage.id = 'player-image';
            playerImage.src = data.event.playersJoined[i].image;

            playersParticipants.querySelector('#players-image').src = data.event.playersJoined[i].image;

            playersParticipants.querySelector('#players-description').innerHTML = data.event.playersJoined[i].Description;

            playersParticipants.querySelector('#email').innerHTML = data.event.playersJoined[i].email;

            player.appendChild(playerInfo);
            player.appendChild(playerImage);

            const joinedUsers = document.getElementById('joined-users');
            joinedUsers.appendChild(playersParticipants);
            const a=i
            player.addEventListener('click',()=>{
                
                console.log(data.event.createdBy)
                
            if(data.event.createdBy===data.userId)
                window.location.href="./giveReview.html?userId="+data.event.playersJoined[a]._id+"&activity="+data.event.activity+"&event="+data.event._id

            })

     playersParticipants.querySelector('#giveReviews').addEventListener('click',()=>{
        console.log('ejs')
         window.location.href="./giveReview.html?userId="+data.event.playersJoined[a]._id+"&activity="+data.event.activity+"&event="+data.event._id

     })
    }
    socket2.emit('joinRoom',data.userId);
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
   
    const join=document.getElementById('Join')
    const leave=document.getElementById('Leave')
    const deleteEvent=document.getElementById('Delete')
    const joinedUsers=document.getElementById('joined-users')
   
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
            if(chat_parent.contains(chat))
            div.removeChild(chat)
            div.removeChild(leave)
           // div.removeChild(deleteEvent)
            const join=document.getElementById('Join')
            join.innerHTML='Pending Request'
            
            join.style.cursor='not-allowed'
         }
         else{
            const joinedUsers=document.getElementById('joined-users')
           // rightDiv.removeChild(joinedUsers)
            leftDiv.style.margin = 'auto';
            const div=document.getElementById('division')
             if(chat_parent.contains(chat))
            chat_parent.removeChild(chat)
            div.removeChild(leave)
         //   div.removeChild(deleteEvent)
            
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
                socket2.emit('sendRequest',data.creatorId,userName,user_id,event)
                const join=document.getElementById('Join')
                join.innerHTML='Pending Request'
               
                join.style.cursor='not-allowed'
               
            }).catch(err=>console.log(err))
            
        })

        
         }


    }).catch(err=>console.log(err))
  
    console.log(data)
})
.catch(err=>console.log(err))



const socket=io('https://kickits-chatapp.onrender.com/')
//const name=prompt('Enter your name')
// event=prompt('Connect to which event')


fetch('https://kickits-1.onrender.com/KickIt/getUser',{credentials:'include'})
.then(res=>res.json())
.then(data=>events(data.user.username,data.user.currentEvent
))
.catch(err=>console.log(err))

function events(name,event){
console.log('hello')
socket.on('send',(message,e,name)=>{
    console.log(event===name)
    if(event===e){
    const chatBox = document.querySelector('.chat-messages');
    const messageInput = message
    
    const sendButton = document.getElementById('send-button');

  
    const messageElement = document.createElement('div');
    messageElement.id="received-message"
    messageElement.style='size'
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            messageContent.textContent = `${name} : ${message}`;
          
            messageElement.appendChild(messageContent);
            chatBox.appendChild(messageElement);
    }

})
socket.emit('getEvent',event)

socket.on('sendEvent',(x)=>{
   if(x===event){
    const chatBox = document.querySelector('.chat-messages');
    const messageInput = document.getElementById('input-text');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', () => {
        sendMessage();
    });

    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

   async function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== '') {
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message', 'user');
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            messageContent.textContent = message;
            
           socket.emit('message',message,name)
               
                messageElement.appendChild(messageContent);
                chatBox.appendChild(messageElement);
            messageInput.value = '';
                  
        }
    }

            chatBox.scrollTop = chatBox.scrollHeight;
}
            })
            
        }
fetch(`${url}/KickIt/joinRequests`, {
    credentials: 'include'
})
    .then(res => res.json())
    .then(data => {
       console.log(data.user.mode)

        socket.emit('joinRoom', data.user._id);
        const arr = data.user.joinedRequests;
        const array = [];
        const index = [];
        const events = [];
        for (let i = 0; i < arr.length; i++) {
            const notificationDiv=document.getElementById('notification-div')
            const requests = document.createElement('div');
            const left=document.createElement('div');
            left.id="left"
            const right=document.createElement('div');
            right.id="right"
            requests.appendChild(left)
            requests.appendChild(right)
            
           requests.id='requests'
            const a = i;
            array.push(requests);
            index.push(data.user.joinedRequests[a]);
            events.push(data.user.requestedEvents[a]);
            requests.id = 'notifications';
            const name = document.createElement('h1');
            const image=document.createElement('img')
            image.src=data.user.joinedRequests[i].image
            image.id="requestImage"
            name.id = "requestName";
            requests.appendChild(name);
            left.appendChild(image)
            name.innerHTML = data.user.joinedRequests[i].username+" is waiting for you response"
            
            
            notificationDiv.appendChild(requests);
            requests.addEventListener('click', () => {
                const options = {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        requestedUser: data.user.joinedRequests[a],
                        requestedEvents: data.user.requestedEvents[a]
                    })
                };
                fetch(`${url}/KickIt/joinRequests`, options)
                    .then(res => res.json())
                    .then(data => {
                        window.location = './acceptRequest.html';
                    })
                    .catch(err => console.log(err));
            });
        }
    })
    .catch(err => console.log(err));

        
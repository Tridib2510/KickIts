

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
    messageElement.classList.add('chat-message', 'user');
    messageElement.style='size'
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            messageContent.textContent = `${name} : ${message}`;
            messageContent.style.backgroundColor='grey'
            messageContent.style.position="relative"
            messageContent.style.left="250px"
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
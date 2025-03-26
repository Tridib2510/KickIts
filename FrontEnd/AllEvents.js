import url from "./ApiUrl.js";

const socket = io(`${url}`);

let newData;

let arr = [];
let index = [];

let Events = document.createElement('div');

const buttons = document.getElementById('auth-buttons');

const login = document.getElementById('login-btn');
const signUp = document.getElementById('signup-btn');
const logout = document.getElementById('Logout');
const MyEvents = document.getElementById('MyEvents');
const createEvent = document.getElementById('createEvent');
const image = document.getElementById('image');
const leftDiv = document.getElementById('left-div');
const rightDiv = document.getElementById('right-div');
const notification = document.getElementById('notification-icon');
const side_side_container = document.getElementById('side-by-side-container');
let totalDocuments=0
side_side_container.removeChild(rightDiv);

socket.on('send', (str) => {
    console.log(str);
    const requests = document.createElement('div');
    requests.id = 'notifications';
    const name = document.createElement('p');
    name.innerHTML = 'Name:' + str;
    requests.appendChild(name);
    rightDiv.appendChild(requests);
});

notification.addEventListener('click', () => {
    if (!side_side_container.contains(rightDiv)) {
        side_side_container.appendChild(rightDiv);
    } else {
        side_side_container.removeChild(rightDiv);
    }
});
const navigationContainer = document.createElement('div');
navigationContainer.className = 'navigation-container';

const backward = document.createElement('img');
backward.src = "https://img.icons8.com/ios-filled/50/000000/back.png";
navigationContainer.appendChild(backward);

const forward = document.createElement('img');
forward.src = "https://img.icons8.com/ios-filled/50/000000/forward.png";
navigationContainer.appendChild(forward);

function helper(text,params) {
    Events = document.createElement('div');
    fetch(`${url}/KickIt/home${text}${params}`, {
        credentials: "include"
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            socket.emit('joinRoom', 'i');
            socket.on('sendResponse', () => {
                window.location.href = "https://www.google.com/";
            });
            if (text == '') {                                                                                                                      
                if (data.token) {
                    image.src = data.image;
                    image.addEventListener('click', () => {
                        window.location.href = 'profile.html';
                    });
                    if(buttons.contains(signUp))
                    buttons.removeChild(signUp);
                  if(buttons.contains(login))
                    buttons.removeChild(login);
                    logout.addEventListener('click', () => {
                        window.location.href = `${url}/KickIt/logout`;
                    });
                } else {
                    if(buttons.contains(image))
                    buttons.removeChild(image);
                    if(buttons.contains(logout))
                    buttons.removeChild(logout);
                    if(buttons.contains(MyEvents))
                    buttons.removeChild(MyEvents);
                    if(buttons.contains(createEvent))
                    buttons.removeChild(createEvent);
                }
            }
            if (data.status && data.status == 'fail') {
                document.body.events = false;
            }
            for (let i = 0; i < data.data.length; i++) {
                const div = document.createElement('div');
                arr.push(div);
                const link = document.createElement('a');
                const a = i;
                arr.push(div);
                index.push(a);
                const d = data.data[i];
                const eventName = document.createElement('h2');
                eventName.innerHTML = data.data[i].eventName;
                eventName.className = "event-name";
                div.className = 'event-details';
                div.appendChild(eventName);
                const eventDate = document.createElement('p');
                eventDate.className = "event-date";
                eventDate.innerHTML = `Date : ${data.data[i].date}`;
                div.appendChild(eventDate);
                const eventTime = document.createElement('p');
                eventTime.innerHTML = `Time : ${data.data[i].time}`;
                div.appendChild(eventTime);
                document.body.events = true;
                Events.appendChild(div);
                document.body.events = true;
                div.addEventListener('click', () => {
                    const options = {
                        method: 'PATCH',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            data: data.data[a]
                        })
                    };
                    fetch(`${url}/KickIt/getEventDetails`, options)
                        .then(res => res.json())
                        .then(data => {
                            window.location.href = "EventDetails.html";
                        })
                        .catch(err => console.log(err));
                });
                totalDocuments=data.data.length
                leftDiv.appendChild(Events);
                leftDiv.appendChild(navigationContainer);
            }
          
        })
        .catch(err => console.log(err));
}
helper('','?page=1&limit=5');



let page=1;


backward.addEventListener('click',()=>{
    if(page>1){
    if(leftDiv.contains(Events))
  leftDiv.removeChild(Events)
  page--;
  helper('',`?page=${page}&limit=5`)
    }
    
})
forward.addEventListener('click',()=>{
    if(page<totalDocuments){
        if(leftDiv.contains(Events))
        leftDiv.removeChild(Events)
  page++;
  helper('',`?page=${page}&limit=5`)
    }
})



const Choose = document.getElementsByClassName('custom-btn');

Choose[0].addEventListener('click', () => {
    const b = document.getElementById('search-bar');
    b.placeholder = "venue";
});
Choose[1].addEventListener('click', () => {
    const b = document.getElementById('search-bar');
    b.placeholder = "activity";
});
Choose[2].addEventListener('click', () => {
    const b = document.getElementById('search-bar');
    b.placeholder = "Creator";
});

const button = document.getElementById('search-button').addEventListener('click', () => {
    let text = '';
    arr = [];
    const b = document.getElementById('search-bar');
    if (b != '' && b.value != '') {
        text = `?${b.placeholder}=${b.value}`;
    }
    if (document.body.events === true) {
        leftDiv.removeChild(Events);
    }
    index = [];
    helper(text,'');
    b.placeholder = "Search events...";
});

const signUpbutton = document.getElementById('signup-btn').addEventListener('click', () => {
    window.location.href = 'SignUpPage.html';
});
createEvent.addEventListener('click', () => {
    window.location.href = 'createEvents.html';
});
const loginbutton = document.getElementById('login-btn').addEventListener('click', () => {
    window.location.href = 'Login.html';
});

const myEvents = document.getElementById('MyEvents').addEventListener('click', () => {
    window.location.href = 'myEvents.html';
});

fetch(`${url}/KickIt/joinRequests`, {
    credentials: 'include'
})
    .then(res => res.json())
    .then(data => {
        socket.emit('joinRoom', data.user._id);
        const arr = data.user.joinedRequests;
        const array = [];
        const index = [];
        const events = [];
        for (let i = 0; i < arr.length; i++) {
            const requests = document.createElement('div');
            const a = i;
            array.push(requests);
            index.push(data.user.joinedRequests[a]);
            events.push(data.user.requestedEvents[a]);
            requests.id = 'notifications';
            const name = document.createElement('p');
            name.innerHTML = 'Name:' + data.user.joinedRequests[i].username;
            requests.appendChild(name);
            rightDiv.appendChild(requests);
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
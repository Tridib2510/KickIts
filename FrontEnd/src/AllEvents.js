import url from "./ApiUrl.js";

const socket = io(`${url}`);

let newData;

let arr = [];
let index = [];

let Events = document.createElement('div');

let TEXT=''

const DATA=document.getElementById('data')
const loading=document.getElementById('loading')

const bodyData=document.body.innerHTML



        function toggleTheme() {
             fetch(`${url}/KickIt/changeMode`,{
            credentials: 'include',
        }).
        then(res=>res.json()).
        then(data=>console.log(data)).
        catch(err=>console.log(err))

    if (currentTheme === 'light') {
       

        document.getElementById('border').style.border='2px solid black'
        const area=document.getElementById('area')
        const circles=document.getElementById('circles')
        const create_front=document.getElementById('create-front')
       
        const allElements = document.querySelectorAll('label');
        const title=document.getElementById('Title')
        title.style.color='black'
allElements.forEach(element => {
    
    element.style.color = 'black';
});;
        
        area.style.background='#f8fafc';
          const liElements = circles.querySelectorAll('li');
          liElements.forEach((li, index) => {
          li.style.background='black'
    });
        currentTheme = 'dark';
        body.className = 'dark';
        themeIcon.textContent = '☀️';
    } else {
        const area=document.getElementById('area')
        area.style.background='#222222';
        const liElements = circles.querySelectorAll('li');
          liElements.forEach((li, index) => {
          li.style.background='rgba(255, 255, 255, 0.2)'
    });
        currentTheme = 'light';
        body.className = 'light';
        themeIcon.textContent = '🌙';
        
        const allElements = document.querySelectorAll('label');
        const title=document.getElementById('Title')
        title.style.color='white'
allElements.forEach(element => {
    element.style.color = 'white';
});;
    }
}

async function getData(){
    console.log(window.innerHeight)

    if(window.innerHeight<=610){
        console.log(true)
        const parent_nav=document.querySelector('#top-nav').parentElement
        const desktop_nav=document.querySelector('#top-nav')
        // parent_nav.remove(desktop_nav)

    }


const buttons = document.getElementById('auth-buttons');
const profilePic=document.getElementById('profile-pic')
const login = document.getElementById('login-btn');
const signUp = document.getElementById('signup-btn');
const logout = document.getElementById('Logout');
const MyEvents = document.getElementById('MyEvents');

const createEvent = document.getElementById('createEvent');
const image = document.getElementById('image');
const leftDiv = document.getElementById('left-div');
const rightDiv = document.getElementById('right-div');
const notification = document.getElementById('notification');
const side_side_container = document.getElementById('side-by-side-container');
let totalDocuments=0
//side_side_container.removeChild(rightDiv);

socket.on('send', (user,event) => {
  
    const requests = document.createElement('div');
            const left=document.createElement('div');
            left.id="left"
            const right=document.createElement('div');
            right.id="right"
            requests.appendChild(left)
            requests.appendChild(right)
            
           
            requests.id = 'notifications';
            const name = document.createElement('h1');
            const image=document.createElement('img')
            image.src=user.image
            image.id="requestImage"
            name.id = "requestName";
            requests.appendChild(name);
            left.appendChild(image)
            name.innerHTML = user.username+" is waiting for you response"
            
             


            
            rightDiv.appendChild(requests);
    
    const options = {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            requestedUser: user,
            requestedEvents:event
        })
    };
    requests.addEventListener('click',async () => {
  await  fetch(`${url}/KickIt/joinRequests`, options)
                    .then(res => res.json())
                    .then(data => {
                        window.location = './acceptRequest.html';
                    })
                    .catch(err => console.log(err));
    
                }) 
});



// notification.addEventListener('click', () => {
//     if (!side_side_container.contains(rightDiv)) {
//         side_side_container.appendChild(rightDiv);
//     } else {
//         side_side_container.removeChild(rightDiv);
//     }
// });
const navigationContainer = document.createElement('div');
navigationContainer.className = 'navigation-container';

const backward = document.createElement('img');
backward.src = "https://img.icons8.com/ios-filled/50/000000/back.png";
navigationContainer.appendChild(backward);

const forward = document.createElement('img');
forward.src = "https://img.icons8.com/ios-filled/50/000000/forward.png";




navigationContainer.appendChild(forward);
function helper2(text,params,isCalender){
    
   
Events=document.createElement('div')
fetch(`${url}/KickIt/myEvents${text}${params}`,{
   credentials:"include"
})
.then(res=>res.json())
.then(data=>{
    if(data.status && data.status==='error'){
        window.location.href='Login.html'
    }
  if(data.data.length===1 && isCalender && data.token!='default'){
                 const options = {
                        method: 'PATCH',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            data: data.data[0]
                        })
                    };
                    fetch(`${url}/KickIt/getEventDetails`, options)
                        .then(res => res.json())
                        .then(data => {
                            window.location.href = "EventDetails.html";
                        })
                        .catch(err => console.log(err));
                    window.location.href='EventDetails.html'
            }
if(text==''){
  
   image.src=data.image
      image.addEventListener('click',()=>{
         window.location.href='profile.html'
      })   

      logout.addEventListener('click',()=>{
         fetch(`${url}/KickIt/logout`,{
            credentials:'include'
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            window.location.href="AllEvents.html"
        }).catch(err=>console. log(err))
      })
    
    
   }
if(data.status && data.status=='fail'){
   document.body.events=false
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
                const active=document.createElement('h3')
                active.innerHTML=`${data.data[i].active}`
                div.appendChild(active)
                if(data.data[i].active!='Inactive'){
                Events.appendChild(div);
                }
                document.body.events = true;
                if(data.data[i].active==='Filled'&&!data.data[i].playersJoined.includes(data.token)){
                    div.style.cursor='not-allowed'
                }
                
                if((data.data[i].active==='Filled'&&data.data[i].playersJoined.includes(data.token))||data.data[i].active==='Active'){
                    if(data.token!='default')
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
            }
                totalDocuments=data.data.length
                leftDiv.appendChild(Events);
                leftDiv.appendChild(navigationContainer);
            }
          
   totalDocuments=data.data.length
   leftDiv.appendChild(Events);
   leftDiv.appendChild(navigationContainer);
            
  
})
.catch(err=>console.log(err))
}
function helper(text,params,isCalender) {



   
    Events = document.createElement('div');
    
   return fetch(`${url}/KickIt/home${text}${params}`, {
        credentials: "include"
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.data.length)
            if(data.data.length===1 && isCalender && data.token!='default'){
                 const options = {
                        method: 'PATCH',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            data: data.data[0]
                        })
                    };
                    fetch(`${url}/KickIt/getEventDetails`, options)
                        .then(res => res.json())
                        .then(data => {
                            window.location.href = "EventDetails.html";
                        })
                        .catch(err => console.log(err));
                    window.location.href='EventDetails.html'
            }
            if(data.data.length!=0)TEXT=text
            socket.emit('joinRoom', 'i');
            socket.on('sendResponse', () => {
                window.location.href = "https://www.google.com/";
            });
            if (text == '') {   
                                                                                                                                   
                if (data.token!='default') {
                   if(image){
                    image.src = data.image;
                    image.addEventListener('click', () => {
                        window.location.href = 'profile.html';
                    });
                }    
                    
                    if(buttons && buttons.contains(signUp))
                       buttons.removeChild(signUp);
                  if(buttons && buttons.contains(login))
                    buttons.removeChild(login);

                const parent_SignUp=document.getElementById('SignUp');
                if(parent_SignUp)
                parent_SignUp.parentNode.removeChild(document.getElementById('SignUp'));
               
                 const parent_Login=document.getElementById('Login');
                 if(parent_Login)
                parent_Login.parentNode.removeChild(document.getElementById('Login'));

                   
                } else {
                    document.getElementById('getStarted').href="Login.html"
                    const createEventButton=document.getElementById('createEvent')
                    createEvent.textContent='Login'
                    
                    if(profilePic.contains(image))
                    profilePic.removeChild(image);
                    if(buttons.contains(logout))
                    buttons.removeChild(logout);
                    if(buttons.contains(MyEvents))
                    buttons.removeChild(MyEvents);
                    if(buttons.contains(createEvent))
                    buttons.removeChild(createEvent);
                if(document.getElementById('notification-button'))
                    if(document.getElementById('notification-button').contains(notification))
                        document.getElementById('notification-button').removeChild(notification)
                    if(document.getElementById('notification-dropdown').contains(document.getElementById('notification-button')))
                        document.getElementById('notification-dropdown').removeChild(document.getElementById('notification-button'))

                    const parent_profilePic=profilePic.parentNode;
                    if( parent_profilePic && parent_profilePic.contains(profilePic))
                    parent_profilePic.removeChild(profilePic)
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
                const active=document.createElement('h3')
                active.innerHTML=`${data.data[i].active}`
                div.appendChild(active)
                if(data.data[i].active!='Inactive'){
                Events.appendChild(div);
                }
                document.body.events = true;
                if(data.data[i].active==='Filled'&&!data.data[i].playersJoined.includes(data.token)){
                    div.style.cursor='not-allowed'
                }
                
                if((data.data[i].active==='Filled'&&data.data[i].playersJoined.includes(data.token))||data.data[i].active==='Active'){
                    if(data.token!='default')
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
            }
                totalDocuments=data.data.length
                if(leftDiv){
                leftDiv.appendChild(Events);
                leftDiv.appendChild(navigationContainer);
                }
            }
          
        })
        .catch(err => console.log(err));
}
await helper('','?page=1&limit=5',false);



let page=1;




const Choose = document.getElementsByClassName('custom-btn');

let placeholder=''




const button = document.getElementById('search-button')
if(button)
button.addEventListener('click', () => {
    const searchBar=document.getElementById('search-bar')
    if(searchBar.value===''){
       
        if (document.body.events === true) {
            if(leftDiv.contains(Events))
            leftDiv.removeChild(Events);
       }
      helper('','?page=1&limit=5');
    }
    else{
    const text1=`?activity=${searchBar.value}`
    const text2=`?venue=${searchBar.value}`
    const text3=`?eventName=${searchBar.value}`
    if (document.body.events === true) {
        if(leftDiv.contains(Events))
                leftDiv.removeChild(Events);
           }
    helper(text1,'&page=1&limit=5',false)
    helper(text2,'&page=1&limit=5',false)
    helper(text3,'&page=1&limit=5',false)
    page=1
   
        }
    
 
 });

 const search_bar=document.getElementById('search-bar')
 
 const search_bar2=document.getElementById('search-bar2')
 if(search_bar)
 search_bar.addEventListener('keydown', (event) => {

    if(event.key==='Enter' || event.key==='Next' || event.code === 'NumpadEnter'){
         
         const searchBar=document.getElementById('search-bar')
    if(searchBar.value===''){
       
        if (document.body.events === true) {
            if(leftDiv.contains(Events))
            leftDiv.removeChild(Events);
       }
       helper('','?page=1&limit=5',false);
    }
    else{
    const text1=`?activity=${searchBar.value}`
    const text2=`?venue=${searchBar.value}`
    const text3=`?eventName=${searchBar.value}`
    if (document.body.events === true) {
        if(leftDiv.contains(Events))
                leftDiv.removeChild(Events);
           }
    helper(text1,'&page=1&limit=5',false)
    helper(text2,'&page=1&limit=5',false)
    helper(text3,'&page=1&limit=5',false)
    page=1
   
        }
    }
 })
if(search_bar2)
 search_bar2.addEventListener('keydown', (event) => {
  event.preventDefault()
  event.stopPropagation()
    if(event.key==='Enter' || event.key==='Next' || event.code === 'NumpadEnter'){
         
         const searchBar=document.getElementById('search-bar2')
    if(searchBar.value===''){
       
        if (document.body.events === true) {
            if(leftDiv.contains(Events))
            leftDiv.removeChild(Events);
       }
       helper('','?page=1&limit=5',false);
    }
    else{
    const text1=`?activity=${searchBar.value}`
    const text2=`?venue=${searchBar.value}`
    const text3=`?eventName=${searchBar.value}`
    if (document.body.events === true) {
        if(leftDiv.contains(Events))
                leftDiv.removeChild(Events);
           }
    helper(text1,'&page=1&limit=5',false)
    helper(text2,'&page=1&limit=5',false)
    helper(text3,'&page=1&limit=5',false)
    page=1
   
        }
    }
 })

backward.addEventListener('click',()=>{
    const c = document.getElementById('search-bar');

    
    if(page>1){
    if(leftDiv.contains(Events))
    leftDiv.removeChild(Events)
  page--;
  if(TEXT==='')
    helper(TEXT,`?page=${page}&limit=5`,false)
  else{
    helper(TEXT,`&page=${page}&limit=5`,false)
  }
    }
    
})
forward.addEventListener('click',async ()=>{
    const c = document.getElementById('search-bar');
    console.log(c.value==='')
   
    console.log(c.placeholder)
    console.log(page,totalDocuments)
    if(page<totalDocuments){
        console.log('check if contains',leftDiv.contains(Events))

        if(leftDiv.contains(Events))
        leftDiv.removeChild(Events)
  page++;
  console.log('hey',TEXT)
  if(`TEXT.startsWith('?')`){
  if(TEXT==='')
  await helper(TEXT,`?page=${page}&limit=5`,false)
else {
    console.log(TEXT+`&page=${page}&limit=5`,false)
    await helper(TEXT,`&page=${page}&limit=5`,false)
}
  }
  else{
    if(TEXT==='')
  await helper(TEXT,`?page=${page}&limit=5`,false)
else {
    console.log(TEXT+`&page=${page}&limit=5`,false)
    await helper(TEXT,`&page=${page}&limit=5`,false)
}
  }
 leftDiv.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
})




// const signUpbutton = document.getElementById('signup-btn').addEventListener('click', () => {
//     window.location.href = 'SignUpPage.html';
// });
// // createEvent.addEventListener('click', () => {
// //     window.location.href = 'createEvents.html';
// // });
// const loginbutton = document.getElementById('login-btn').addEventListener('click', () => {
//     console.log('hi')
//     window.location.href = 'Login.html';
// });

// const myEvents = document.getElementById('MyEvents').addEventListener('click', () => {
//     window.location.href = 'myEvents.html';
// });
if(logout)
logout.addEventListener('click',()=>{
    fetch(`${url}/KickIt/logout`,{
        credentials:'include'
    }).then(res=>res.json()).then(data=>{
        console.log(data)
        window.location.href="AllEvents.html"
    }).catch(err=>console. log(err))
})


fetch(`${url}/KickIt/joinRequests`, {
    credentials: 'include'
})
    .then(res => res.json())
    .then(data => {
       console.log(data.user.mode)
       if(data.user.mode==='light'){
         

        document.getElementById('border').style.border='2px solid black'
        const area=document.getElementById('area')
        const circles=document.getElementById('circles')
        const create_front=document.getElementById('create-front')
       
        const allElements = document.querySelectorAll('label');
        const title=document.getElementById('Title')
        title.style.color='black'
allElements.forEach(element => {
    
    element.style.color = 'black';
});;
        
        area.style.background='#f8fafc';
          const liElements = circles.querySelectorAll('li');
          liElements.forEach((li, index) => {
          li.style.background='black'
    });
        currentTheme = 'dark';
        body.className = 'dark';
        themeIcon.textContent = '☀️';
             }

        else{
             const area=document.getElementById('area')
        area.style.background='#222222';
        const liElements = circles.querySelectorAll('li');
          liElements.forEach((li, index) => {
          li.style.background='rgba(255, 255, 255, 0.2)'
    });
        currentTheme = 'light';
        body.className = 'light';
        themeIcon.textContent = '🌙';
        
        const allElements = document.querySelectorAll('label');
        const title=document.getElementById('Title')
        title.style.color='white'
allElements.forEach(element => {
    element.style.color = 'white';
});;
        }

        socket.emit('joinRoom', data.user._id);
        const arr = data.user.joinedRequests;
        const array = [];
        const index = [];
        const events = [];
        for (let i = 0; i < arr.length; i++) {
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


function isElementInViewport(element) {
            // Gets the element's position relative to the viewport
            const rect = element.getBoundingClientRect();
            
            // Returns true when the top of the element is in the upper 75% of the viewport
            // window.innerHeight = height of the browser window
            // document.documentElement.clientHeight = fallback for older browsers

            return (
                rect.top <= (window.innerHeight) * 0.75
            );
        }


    document.addEventListener('scroll',()=>{
          const animatedElement = document.getElementById('cards');
          const animatedDescription= document.getElementById('description');
          animatedElement.style.opacity = '0';
            animatedDescription.style.opacity = '0';
         if (isElementInViewport(animatedElement) && !animatedElement.classList.contains('fade-in-left')) {
             animatedElement.style.opacity = '';
                     animatedElement.classList.add('fade-in-left');
                        animatedDescription.style.opacity = '';
                        animatedDescription.classList.add('pop-up');
         }
        
    })
    console.log(window.innerWidth)
    if(window.innerWidth >=700){
        console.log('hi')
      
       
    }
    else{
        const topNav = document.getElementById('top-nav');
        
        let parent = null
        if(topNav)
            parent=topNav.parentElement
        
    }

    if (loading && loading.parentNode) {
    loading.parentNode.removeChild(loading);
    
    
}
 

function generateCalendar(year, month) {
    const calendarElement = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('currentMonth');
    
    // Create a date object for the first day of the specified month
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    


    
    // Clear the calendar
    if(calendarElement)
    calendarElement.innerHTML = '';

    // Set the current month text
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if(currentMonthElement)
    currentMonthElement.innerText = `${monthNames[month]} ${year}`;
    
    // Calculate the day of the week for the first day of the month (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Create headers for the days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'text-center font-semibold';
        dayElement.innerText = day;
        calendarElement.appendChild(dayElement);
    });

    // Create empty boxes for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDayElement = document.createElement('div');
        calendarElement.appendChild(emptyDayElement);
    }

    // Create boxes for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'text-center py-2 border cursor-pointer';
        dayElement.innerText = day;
         dayElement.addEventListener('click',()=>{
             if(leftDiv.contains(Events))
               leftDiv.removeChild(Events)
            console.log(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${day}`)
            const d=`${new Date().getFullYear()}-${new Date().getMonth()+1}-${day}`
            TEXT=`?date=${d}`
            helper2(TEXT,`&page=1&limit=5`,true)
            window.location.href='#events'
         })
        // Check if this date is the current date
        const currentDate = new Date();
        if (year === currentDate.getFullYear() && month === currentDate.getMonth() && day === currentDate.getDate()) {
            dayElement.classList.add('bg-blue-500', 'text-white'); // Add classes for the indicator
        }

        calendarElement.appendChild(dayElement);
    }
}

// Initialize the calendar with the current month and year
const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
generateCalendar(currentYear, currentMonth);



// Function to show the modal with the selected date
function showModal(selectedDate) {
    const modal = document.getElementById('myModal');
    const modalDateElement = document.getElementById('modalDate');
    modalDateElement.innerText = selectedDate;
    modal.classList.remove('hidden');
}

// Function to hide the modal
function hideModal() {
    const modal = document.getElementById('myModal');
    modal.classList.add('hidden');
}

// Event listener for date click events
const dayElements = document.querySelectorAll('.cursor-pointer');
dayElements.forEach(dayElement => {
    dayElement.addEventListener('click', () => {
        const day = parseInt(dayElement.innerText);
        const selectedDate = new Date(currentYear, currentMonth, day);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = selectedDate.toLocaleDateString(undefined, options);
        showModal(formattedDate);
    });
});

}

await getData();


// Event listener for closing the modal
document.getElementById('closeModal').addEventListener('click', () => {
    hideModal();
});
const side=document.getElementById('side-by-side-container')

 let currentTheme = 'light';
        const body = document.body;
        const themeIcon = document.getElementById('themeIcon');

const themeToggle = document.getElementById('theme-toggle');





// Add event listener to the button (better practice than onclick)
themeToggle.addEventListener('click', toggleTheme);
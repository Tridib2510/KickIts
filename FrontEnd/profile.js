import url from "./ApiUrl.js";
let a = false;
let b = false;
let c = false;
const profileContainer = document.getElementById('profile-container');
const description = document.getElementById('description');
const profile_details = document.getElementById('profile-details');
const profile = document.getElementById('profile-header');
const im = document.getElementById('nameContainer');
const update = document.getElementById('update');
const name = document.getElementById('name');
const descriptionUpdate = document.getElementById('Description');
const div = document.getElementById('image');
const fileInput = document.getElementById('file');
const ctx=document.getElementById('myChart') 

const rightDiv=document.getElementById('right-div')

const formData = new FormData();
const image = document.createElement('img');

const createEvent=document.getElementById('createEvent').addEventListener('click',()=>{
    window.location.href='./createEvents.html'
})
const logout=document.getElementById('Logout').addEventListener('click',()=>{
    fetch(`${url}/KickIt/logout`,{
        credentials:'include'
    }).then(res=>res.json()).then(data=>{
        console.log(data)
        window.location.href="AllEvents.html"
    }).catch(err=>console. log(err))
})
const allEvents=document.getElementById('AllEvents').addEventListener('click',()=>{
    window.location.href='./AllEvents.html'
})
const myEvents=document.getElementById('MyEvents').addEventListener('click',()=>{
    window.location.href='./myEvents.html'
})


div.removeChild(file);

image.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    formData.append('file', file);
    profile.appendChild(update);
});

const descriptionContainer = document.getElementById('descriptionContainer');

const changeProfile = document.getElementById('changeProfile');
profile.removeChild(changeProfile);
profile.removeChild(update);
descriptionContainer.removeChild(descriptionUpdate);

profile.addEventListener('click', () => {
    console.log(a);
    if (a == false) {
        if (descriptionContainer.contains(descriptionUpdate)) {
            descriptionContainer.removeChild(descriptionUpdate);
        }
        if (!descriptionContainer.contains(description)) {
            descriptionContainer.appendChild(description);
        }
        if (!im.contains(name)) {
            im.appendChild(name);
        }
        if (im.contains(changeProfile)) {
            a++;
            im.removeChild(changeProfile);
        }
    } else {
        a = false;
    }
    if (profile.contains(update) && b == false) {
        console.log('hola');
        profile.removeChild(update);
    }
    b = false;
});

description.addEventListener('click', () => {
    console.log(c);
    if (descriptionContainer.contains(description)) {
        b = true;
        descriptionContainer.removeChild(description);
        profile.appendChild(update);
    }
    if (!descriptionContainer.contains(descriptionUpdate)) {
        a = true;
        descriptionContainer.appendChild(descriptionUpdate);
    } else {
        a = true;
    }
});

descriptionUpdate.addEventListener('click', () => {
    b = true;
    a = true;
});

fetch(`${url}/KickIt/profile`, { credentials: 'include' })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        name.innerHTML = 'Name: ' + data.user.username;
        name.addEventListener('click', () => {
            if (im.contains(name)) {
                im.removeChild(name);
                b = true;
                profile.appendChild(update);
            }
            if (!im.contains(changeProfile)) {
                a = true;
                im.appendChild(changeProfile);
            } else {
                console.log('hello');
                a = true;
            }
        });

        changeProfile.addEventListener('click', () => {
            b = true;
            a = true;
        });

        const email = document.getElementById('email');
        email.innerHTML = 'Email: ' + data.user.email;

        description.innerHTML = data.user.Description;
         
        image.src =data.user.image;
        div.appendChild(image);

      const n=data.user.ratingsDate.length
      const start=data.user.ratingsDate.length-1-2>=0?data.user.ratingsDate.length-3:0

new Chart(ctx, {
    type: 'line',
    data: {
      labels:data.user.ratingsDate.slice(start,n),
      datasets: [{
        label: 'Ratings',
        data: data.user.ratings.slice(start,n),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  const reviews=data.user.reviews

  for(let i=reviews.length-1;i>=0;i--){
    console.log(reviews[i])
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review';

    const reviewerName = document.createElement('h4');
    reviewerName.className = 'reviewer-name';
    reviewerName.innerText = reviews[i].reviewer;

    const reviewText = document.createElement('p');
    const createdAt=document.createElement('p');
    createdAt.className = 'review-text';
    createdAt.innerHTML=reviews[i].createdAt
  //  reviewText.className = 'review-text';
    reviewText.innerText = reviews[i].review;
    
    reviewDiv.appendChild(reviewerName);
    reviewDiv.appendChild(createdAt)
    reviewDiv.appendChild(reviewText);
    
    rightDiv.appendChild(reviewDiv);



  }

  



})
    .catch((err) => console.log(err));

update.addEventListener('click', () => {
    console.log(formData);
    const username = changeProfile.value != '' ? changeProfile.value : name.innerHTML.substring(5);
    const Description = descriptionUpdate.value != '' ? descriptionUpdate.value : description.innerHTML;
    console.log(description.innerHTML);

    formData.append('username', username);
    formData.append('Description', Description);

    fetch(`${url}/KickIt/profileUpdate`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => {
            
             window.location.reload();
        })
        .catch((err) => console.log(err));
});

const container=document.getElementById('container')

container.removeChild(rightDiv)

const review=document.getElementById('reviews')  

review.addEventListener('click',()=>{
    if(container.contains(rightDiv)){
        container.removeChild(rightDiv)
    }
    else{
        container.appendChild(rightDiv)
    }

})
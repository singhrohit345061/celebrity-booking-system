const API_URL = "http://localhost:5000";

/* GET LOGGED USER */

function getUser(){
return JSON.parse(localStorage.getItem("user"));
}

/* LOGOUT */

function logout(){
localStorage.removeItem("user");
window.location="login.html";
}

/* LOAD PROFILE */

function loadProfile(){

const user = getUser();

if(!user){
alert("Please login");
window.location="login.html";
return;
}

document.getElementById("name").innerText=user.name;
document.getElementById("email").innerText=user.email;
document.getElementById("role").innerText=user.role;

if(user.role==="influencer"){
document.getElementById("price").innerText=user.price_per_hour;
}else{
document.getElementById("price").innerText="-";
}

}

/* DELETE ACCOUNT */

function deleteAccount(){

const user=getUser();

fetch(API_URL+"/delete-user/"+user.id,{
method:"DELETE"
})
.then(res=>res.text())
.then(data=>{
alert(data);
logout();
});

}

/* LOAD INFLUENCERS */

function loadInfluencers(){

fetch(API_URL+"/influencers")
.then(res=>res.json())
.then(data=>{

let html="";

data.forEach(inf=>{

html+=`

<div class="card">

<h3>${inf.name}</h3>

<p>Email: ${inf.email}</p>

<p>Price per hour: ₹${inf.price_per_hour}</p>

<button onclick="sendBooking(${inf.id})">Book</button>

</div>

`;

});

document.getElementById("influencers").innerHTML=html;

});

}

/* SEND BOOKING REQUEST */

function sendBooking(influencerId){

const user=getUser();

const date=prompt("Enter event date (YYYY-MM-DD)");
const start=prompt("Enter start time (HH:MM)");
const end=prompt("Enter end time (HH:MM)");

fetch(API_URL+"/booking-request",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

customer_id:user.id,
influencer_id:influencerId,
event_date:date,
start_time:start,
end_time:end

})

})

.then(res=>res.text())
.then(data=>alert(data));

}

/* LOAD REQUESTS FOR INFLUENCER */

function loadRequests(){

const user=getUser();

fetch(API_URL+"/requests/"+user.id)

.then(res=>res.json())

.then(data=>{

let html="";

data.forEach(req=>{

html+=`

<div class="card">

<p>Customer ID: ${req.customer_id}</p>

<p>Date: ${req.event_date}</p>

<p>Time: ${req.start_time} - ${req.end_time}</p>

<button onclick="updateStatus(${req.id},'accepted')">Accept</button>

<button onclick="updateStatus(${req.id},'rejected')">Reject</button>

</div>

`;

});

document.getElementById("requests").innerHTML=html;

});

}

/* ACCEPT / REJECT */

function updateStatus(id,status){

fetch(API_URL+"/update-status",{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

booking_id:id,
status:status

})

})

.then(res=>res.text())
.then(data=>{
alert(data);
loadRequests();
});

}
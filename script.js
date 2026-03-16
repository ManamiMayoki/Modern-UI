
// Register

document.getElementById("registerForm")?.addEventListener("submit",async function(e){

e.preventDefault()

const username=document.getElementById("username").value
const email=document.getElementById("email").value
const password=document.getElementById("password").value

const res=await fetch("http://localhost:3000/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({username,email,password})
})

const data=await res.json()

alert(data.message)

})


// Login

document.getElementById("loginForm")?.addEventListener("submit",async function(e){

e.preventDefault()

const email=document.getElementById("email").value
const password=document.getElementById("password").value

const res=await fetch("http://localhost:3000/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({email,password})
})

const data=await res.json()

alert(data.message)

})


// Load users

async function loadUsers(){

const res=await fetch("http://localhost:3000/users")

const users=await res.json()

const list=document.getElementById("userList")

list.innerHTML=""

users.forEach(u=>{
const li=document.createElement("li")
li.innerText=u.username
list.appendChild(li)
})

}


// API Test

async function testAPI(){

const res=await fetch("http://localhost:3000/test")

const data=await res.json()

document.getElementById("result").innerText=data.message

}
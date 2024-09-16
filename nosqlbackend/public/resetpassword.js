
const form = document.getElementById("form");

form.addEventListener("submit", async ()=>{
  event.preventDefault();

  const elements = event.target.elements;
  const obj = {
    password : elements.password.value,
    email: localStorage.getItem("passwordUpdate")
  }

  await fetch("http://localhost:3000/password/resetPassword", {
    method:"POST",
    headers:{
      "content-type":"application/json",

    },
    body:JSON.stringify(obj)
  })

  window.location.href = "login.html"

})
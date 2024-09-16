
const form = document.getElementById("form");

form.addEventListener("submit", async ()=>{
  event.preventDefault();

  const elements = event.target.elements;
  const obj = {
    email : elements.email.value
  }

  localStorage.setItem("passwordUpdate", obj.email);
  
  await fetch("http://localhost:3000/password/forgotpassword", {
    method:"POST",
    headers:{
      "content-type":"application/json",

    },
    body:JSON.stringify(obj)
  })

})
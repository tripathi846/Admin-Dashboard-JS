const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})




function loginredirect(){
    document.location.href="login.html"
}

// index page show form

const show_form = () => {
    document.querySelector("#pname").value = "";
    document.querySelector("#pprice").value = "";
    document.querySelector("#pimage").value = "";
    document.querySelector("#pbrand").value = "";
    document.querySelector("#preview").value = "";
    document.querySelector("#prating").value = "";
    let select = document.querySelector("#product_form");
    select.style.display = "block";
    select.style.marginTop = "50px";
  
    let selectbg = document.querySelector("#website");
    selectbg.style.filter = "blur(5px)";
    let selectclose = document.querySelector("#close");
    selectclose.style.display = "block";
    let selectadd = document.querySelector("#addbutton");
    selectadd.style.display = "block";
    let selectupdate = document.querySelector("#updatebutton");
    selectupdate.style.display = "none";
  };
  const Close = () => {
    let select = document.querySelector("#product_form");
    select.style.display = "none";
    let closebtn = document.querySelector("#close");
    closebtn.style.display = "none";
    let selectbg = document.querySelector("#website");
    selectbg.style.filter = "none";
  };


//IIFE
(async function () {
    let url = "http://localhost:4000/Registration";
    let data = await fetch(url);
    let response = await data.json();
  
    // console.log(response);
    document.querySelector("#showproductdata").innerHTML = response
      .map(
        (e) => `
           <tr>
           <td>${e.name}</td>
           <td>${e.email}</td>
           <td>${e.mobile}</td>
           <td onclick="del('${e.id}')"><i class="fa-solid fa-trash"></i></td>
           <td onclick="upd('${e.id}')"> <i class="fa-solid fa-pen"></i></td>
           </tr>
           `
      )
      .join(" ");
  })();
  

  function del(arg) {
    let url = `http://localhost:4000/Registration/${arg}`;
    let method = {
      method: "DELETE",
    };
    fetch(url, method);
  
    console.log(arg);
  }


  // update function start

  let storeid = null;

  async function upd(arg) {
    let reg = ` <div class="inputbox">
                  <input type="text" id="name" required="required">
                  <span>name</span>
                  <i></i>
              </div>
              <div class="inputbox">
                  <input type="text" id="mobile" required="required">
                  <span>mobile number</span>
                  <i></i>
              </div>
              <div class="inputbox">
                  <input type="text" id="email" required="required">
                  <span>Username</span>
                  <i></i>
              </div>
              <div class="inputbox">
                  <input type="password" id="password" required="required">
                  <span>password</span>
                  <i></i>
              </div>
              
          <button onclick="updateproduct()">Update</button>`;
  
  
          document.querySelector('#adddata').innerHTML= reg;
    storeid = arg;
  
    let data = await fetch(`http://localhost:4000/Registration/${arg}`);
    let response = await data.json();
    console.log(response);
  
    
    
    let selectbg = document.querySelector("#website");
    selectbg.style.filter = "blur(5px)";
  
    let select = document.querySelector("#registration_form");
     document.querySelector("#name").value=response.name;
    document.querySelector("#email").value=response.email;
    document.querySelector("#mobile").value=response.mobile;
    document.querySelector("#password").value=response.password;
  }
  
  const updateproduct = () => {
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let mobile = document.querySelector("#mobile").value;
    let password = document.querySelector("#password").value;
  
    let user = {
      name:name,
      email:email,
      mobile:mobile,
      password:password
    };
  
    console.log(user);
  
    let url = `http://localhost:4000/Registration/${storeid}`;
  
    let method = {
      method: "PUT",
      header: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    };
  
    fetch(url, method);
  
    let selectbg = document.querySelector("#website");
    selectbg.style.filter = "none";
  
    return false;
  };
  
  // update function end
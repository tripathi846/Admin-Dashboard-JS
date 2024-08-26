const registration = () => {
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let mobile = document.querySelector("#mobile").value;
    let password = document.querySelector("#password").value;
  
    let obj = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
    };
  
    let url = "http://localhost:4000/Registration";
    let method = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };
    fetch(url, method);
    let selectbg = document.querySelector("#website");
  selectbg.style.filter = "none";
  };
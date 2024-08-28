function registration(){
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
            
        <button onclick="adddata()">Add</button>`;


        document.querySelector('#adddata').innerHTML= reg
}


function adddata(){
    
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


      //update





    
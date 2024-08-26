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
  
    console.log(response);
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



  let storeid = null;

// Async function to update a product by ID
async function upd(arg) {
  // Store the product ID in a global variable
  storeid = arg;

  // Fetch the product data from the API endpoint
  let data = await fetch(`http://localhost:4000/Registration/${arg}`);
  let response = await data.json();
  console.log(response);

  // Show the update form and hide the add button
  let selectclose = document.querySelector("#close");
  selectclose.style.display = "block";
  let selectadd = document.querySelector("#addbutton");
  selectadd.style.display = "none";
  let selectupdate = document.querySelector("#updatebutton");
  selectupdate.style.display = "block";
  let selectbg = document.querySelector("#website");
  selectbg.style.filter = "blur(5px)";

  // Show the product form and populate it with the product data
  let select = document.querySelector("#product_form");
  select.style.marginTop = "50px";
  select.style.display = "block";
  document.querySelector("#pname").value = response.product_name;
  document.querySelector("#pprice").value = response.product_price;
  document.querySelector("#pimage").value = response.product_image;
  document.querySelector("#pbrand").value = response.product_brand;
  document.querySelector("#preview").value = response.product_review;
  document.querySelector("#prating").value = response.product_rating;
}

const updateproduct = () => {
  // Get the updated product data from the form
  let product_name = document.querySelector("#pname").value;
  let product_price = document.querySelector("#pprice").value;
  let product_image = document.querySelector("#pimage").value;
  let product_brand = document.querySelector("#pbrand").value;
  let product_review = document.querySelector("#preview").value;
  let product_rating = document.querySelector("#prating").value;

  // Create a new product object with the updated data
  let product = {
    product_name: product_name,
    product_price: product_price,
    product_image: product_image,
    product_brand: product_brand,
    product_review: product_review,
    product_rating: product_rating,
  };

  console.log(product);

  // Construct the URL for the API endpoint to update the product
  let url = `http://localhost:4000/Product/${storeid}`;

  // Define the request method as PUT and set the request body to the updated product data
  let method = {
    method: "PUT",
    header: {
      "content-type": "application/json",
    },
    body: JSON.stringify(product),
  };

  // Send the update request to the API endpoint
  fetch(url, method);

  // Remove the blur effect from the website background
  let selectbg = document.querySelector("#website");
  selectbg.style.filter = "none";

  // Prevent the default form submission behavior
  return false;
};

// update function end

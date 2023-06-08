var data = JSON.parse(localStorage.getItem("user_info"));
if (data) {
  window.location.href = "home";
}

//Host URl
var host = "https://172.16.1.69:3002";
var block = "block";
var none = "none";

function Submit() {
  document.getElementById("Error-show").style.display = "none";
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var sap_id = "";

  if (!email && !password) {
    document.getElementById("Error-show").style.display = "block";
    document.getElementById("error-msg").innerHTML =
      "Please enter email and password";
  } else if (!email) {
    document.getElementById("Error-show").style.display = "block";
    document.getElementById("error-msg").innerHTML = "Please enter email";
  } else if (!password) {
    document.getElementById("Error-show").style.display = "block";
    document.getElementById("error-msg").innerHTML = "Please enter password";
  } else {
    console.log("api call");
    spinner();
    const api_url = host + "/api/v4/login";
    console.log("---->", JSON.stringify({ email: email, password: password }));
    fetch(api_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((response) => {
        var data = response.success;
        console.log("data:", data);
        if (data === true) {
          console.log("response->>>:", response);
          console.log("role_id->>>:", response.user[0].role_id);
          localStorage.setItem("user_info", JSON.stringify(response));
          document.getElementById("Error-show").style.display = "none";
          document.getElementById("error-msg").innerHTML = "";
          spinner();
          if (
            response.user[0].role_id == 2 ||
            response.user[0].role_id == 7 ||
            response.user[0].role_id == 8 ||
            response.user[0].role_id == 9
          ) {
            window.location.href = "Home/"; //home controller
          } else if (response.user[0].role_id == 3) {
            //("itemmaster");
            window.location.href = "Home/NewIndent";
          } else if (response.user[0].role_id == 5) {
            //("/approvals/indents");
          } else if (response.user[0].role_id == 6) {
            //("purchaseRequests");
          } else {
            alert("this user has no page foud");
          }
        } else {
          spinner();
          document.getElementById("Error-show").style.display = "block";
          document.getElementById("error-msg").innerHTML =
            "Incorrect Email Or Password ";
        }
      });
  }
}

// var element = document.getElementById("Error-show");
// var addError = function () {
//   console.log("addError");
//   element.classList.add("error");
// };
// var removeError = function () {
//   console.log("removeError");
//   element.classList.remove("error");
// };

function forgot() {
  document.getElementById("popup-forgot-pass").style.display = "block";
}
function popClose() {
  document.getElementById("popup-forgot-pass").style.display = "none";
}

function forgot_password() {
  let forgot_email = document.getElementById("forgot-email").value;
  let api_url_forgot = "https://172.16.1.69:3002/api/v4/forgot_password";
  fetch(api_url_forgot, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: forgot_email }),
  })
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)))
    .then((response) => {
      let data = response;
      console.log(data);
    });
}

var v = 1;
function spinner() {
  if (v == 1) {
    v = 0;
    console.log("block:--", v);
    document.getElementById("spinnerbody").style.display = "block";
  } else {
    v = 1;
    console.log("none:--", v);
    document.getElementById("spinnerbody").style.display = none;
  }
}

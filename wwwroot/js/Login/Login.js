var data = JSON.parse(localStorage.getItem("user_info"));
if (data) {
  window.location.href = "home";
}

//Host URl
var hostlogin = "https://172.16.1.69:3002";
var block = "block";
var none = "none";

function CheckAll() {
  document.getElementById("Error-show").style.display = "none";
  var email = document.forms["My_Form"]["email"].value;
  var Password = document.forms["My_Form"]["Password"].value;

  if (email === "" || password === "") {
    displayNotification("Please fill in all fields");
  }
  if (email == null || email == "") {
    document.getElementById("Error-show").style.display = "block";
    document.getElementById("error-msg").innerHTML = "Please enter email";
  }
  if (Password == null || Password == "") {
    document.getElementById("Error-show").style.display = "block";
    document.getElementById("error-msg").innerHTML = "Please enter password";
  }

  var notification = $(".notification");

  var email = $("#email").val();
  var password = $("#password").val();
  var sap_id = "";

  console.log("api call");
  const api_url = hostlogin + "/api/v4/login";
  console.log(
    "login---->",
    JSON.stringify({ email: email, password: password })
  );

  // Perform client-side validation (optional)
  if (email === "" || password === "") {
    alert("Please fill in all fields");
    // return;
  }
  spinner(true);
  // Make AJAX request to the server
  $.ajax({
    url: api_url,
    method: "POST",
    dataType: "json",
    data: {
      email: email,
      password: password,
    },
    success: function (response) {
      // Handle successful login
      //"Login successful!";
      if (response.success === true) {
        if (response.user[0].role_id == 1) {
          // console.log("-------------- admim Login");
          //vm.$router.push("CreateUser");
          alert("Admin page not created");
        } else {
          if (response.user[0].is_password_changed == "NO") {
            alert("reset_password page not created");
          } else {
            localStorage.setItem("user_info", JSON.stringify(response));
            document.getElementById("Error-show").style.display = "none";
            document.getElementById("error-msg").innerHTML = "";
            spinner(false);
            console.log("Login successful!");
            if (
              response.user[0].role_id == 2 ||
              response.user[0].role_id == 7 ||
              response.user[0].role_id == 8 ||
              response.user[0].role_id == 9
            ) {
              window.location.href = "/Home/"; //home controller
            } else if (response.user[0].role_id == 3) {
              //("itemmaster");
              window.location.href = "/Home/NewIndent";
            } else if (response.user[0].role_id == 5) {
              //("/approvals/indents");
              window.location.href = "/Home/NewIndent";
            } else if (response.user[0].role_id == 6) {
              //("purchaseRequests");
              window.location.href = "/Home/NewIndent";
            } else if (response.user[0].role_id == 11) {
              //("purchaseRequests");
              window.location.href = "/Home/Index";
            } else {
              alert("this role page not");
            }
          }
        }
      } else {
        alert("Incorrect Email Or Password ");
        document.getElementById("Error-show").style.display = "block";
        document.getElementById("error-msg").innerHTML =
          "Incorrect Email Or Password ";
      }
    },

    error: function (xhr, status, error) {
      spinner(false);
      // Handle login error
      console.log("Error: " + error);
      alert("Login failed. Please try again.");
    },

    complete: function (xhr, status) {
      spinner(false);
      if (status === "error" || !xhr.responseText) {
        // Handle network or server error
        alert("Network error. Please try again later.");
      }
    },
  });

  function displayNotification(message) {
    notification.text(message);
    notification.fadeIn().delay(3000).fadeOut();
  }
  return false;
}

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

function spinner() {
  var element = document.getElementById("spinnerbody");
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

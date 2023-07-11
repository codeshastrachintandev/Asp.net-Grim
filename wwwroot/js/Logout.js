function logout() {
  Swal.fire({
    title: "Are you sure you want to Logout?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Logout!",
  }).then((result) => {
    if (result.isConfirmed) {
      logoutmethod();
      window.location.href = "../Login";
    }
  });
}

function logoutsession() {
  logoutmethod();
  alert("Your session is expired.");
  window.location.href = "../Login";
}

function logoutmethod() {
  localStorage.removeItem("user_info");
  localStorage.removeItem("cart");
  localStorage.removeItem("sidemenu");
  $.ajax({
    url: host + path + "logout",
    method: "POST",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      id: Logindata.user[0].id,
    }),
    success: function (response) {
      if (response.success === true) {
        alert("logout");
      }
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      toast("warning", "Login failed. Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}

function resetTimer() {
  clearTimeout(time);
  time = setTimeout(logoutsession, 3600000);
  // 1000 milliseconds = 1 second
}

var time;
window.addEventListener("load", resetTimer, true);
var events = [
  "mousedown",
  "mousemove",
  "keypress",
  "scroll",
  "touchstart",
  "onclick",
];

events.forEach(function (name) {
  document.addEventListener(name, resetTimer, true);
});

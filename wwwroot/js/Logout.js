

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
    alert("session time out");
    window.location.href = "../Login";
}

function logoutmethod() {
    localStorage.removeItem("user_info");
    localStorage.removeItem("cart");
    localStorage.removeItem("sidemenu");
}

function resetTimer() {
  clearTimeout(time);
  // time = setTimeout(logoutsession, 10000);
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

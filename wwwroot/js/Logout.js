function logout() {
  localStorage.removeItem("user_info");
  window.location.href = "../Login";
}
function logoutsession() {
  alert("session time out");
  localStorage.removeItem("user_info");
  window.location.href = "../Login";
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

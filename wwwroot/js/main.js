var v = 1;
function spinner() {
  if (v == 1) {
    v = 0;
    document.getElementById("spinnerbody").style.display = "block";
  } else {
    v = 1;
    document.getElementById("spinnerbody").style.display = none;
  }
}

// $(document).ready(function () {
//   $(".sidebar-nav li").click(function (e) {
//     $(".sidebar-nav li").removeClass("active");
//     $(this).addClass("active");
//     //e.preventDefault();
//   });
// });

var roles_menus = [
  //userrole
  3 = {
    index: "Index",
    MyProfile: "MyProfile",
    Approvals: "Approvals",
    CreateSTO: "CreateSTO",
    MyRequests: "MyRequests",
    NewIndent: "NewIndent",
    Notifications: "Notifications",
  },
  //Indent manager
  4 = {
    index: "Index",
    MyProfile: "MyProfile",
    Approvals: "Approvals",
    CreateSTO: "CreateSTO",
    MyRequests: "MyRequests",
    NewIndent: "NewIndent",
    Notifications: "Notifications",
  },
  //HOD
  3 = {
    index: "Index",
    MyProfile: "MyProfile",
    Approvals: "Approvals",
    CreateSTO: "CreateSTO",
    MyRequests: "MyRequests",
    NewIndent: "NewIndent",
    Notifications: "Notifications",
  },
  //SUBHOD
  4 = {
    index: "Index",
    MyProfile: "MyProfile",
    Approvals: "Approvals",
    CreateSTO: "CreateSTO",
    MyRequests: "MyRequests",
    NewIndent: "NewIndent",
    Notifications: "Notifications",
  },
];

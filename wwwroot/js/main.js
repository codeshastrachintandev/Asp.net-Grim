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

// var roles_menus = [
//   {
//     role_id: 3, //Indent user role
//     Dashboard: "report", //report
//     MyProfile: "MyProfile",
//     MyRequests: "MyRequests",
//     NewIndent: "NewIndent",
//     NewPurchaseReq: "NewPurchaseReq", // new material request
//     Servicerequest: "Service request", // Service request
//     Vendors: "Vendors", // Manage Vendors
//     Notifications: "Notifications",
//   },
//   {
//     role_id: 2, //Indent manager role = 2
//     Dashboard: "report", //report
//     MyProfile: "MyProfile",
//     MyApproval: "MyRequests",
//     NewIndent: "NewIndent",
//     Itemmaterials: "Item materials",
//     returns: "returns",
//     NewPurchaseReq: "new material request", // new material request
//     Servicerequest: "Service request", // Service request
//     Vendors: "Vendors", // Manage Vendors
//     Notifications: "Notifications",
//   },
//   {
//     role_id: 7, //HOD role = 7
//     Dashboard: "report", //report
//     MyProfile: "MyProfile",
//     MyApproval: "MyRequests",
//     NewIndent: "NewIndent",
//     Itemmaterials: "Item materials",
//     returns: "returns",
//     NewPurchaseReq: "new material request", // new material request
//     Servicerequest: "Service request", // Service request
//     Vendors: "Vendors", // Manage Vendors
//     Notifications: "Notifications",
//   },
//   {
//     role_id: 19, //SUBHOD role = 19
//     Dashboard: "report", //report
//     MyProfile: "MyProfile",
//     MyApproval: "MyRequests",
//     NewIndent: "NewIndent",
//     Itemmaterials: "Item materials",
//     returns: "returns",
//     NewPurchaseReq: "New material request", // new material request
//     Servicerequest: "Service request", // Service request
//     Vendors: "Vendors", // Manage Vendors
//     Notifications: "Notifications",
//   },
//   {
//     role_id: 5, //Issue manager role = 5
//     Dashboard: "report", //report
//     MyProfile: "MyProfile",
//     MyApproval: "MyRequests",
//     NewIndent: "Cretate STO",
//     Itemmaterials: "Item materials",
//     Notifications: "Notifications",
//   },
// ];

var roles_menus = {
  3: [
    "Index",
    "MyProfile",
    "MyRequests",
    "NewIndent",
    "NewPurchaseReq",
    "Servicerequest",
    "Vendors",
    "Notifications",
  ],
  2: [
    "report",
    "MyProfile",
    "MyRequests",
    "NewIndent",
    "Item materials",
    "returns",
    "new material request",
    "Service request",
    "Vendors",
    "Notifications",
  ],
  7: [
    "report",
    "MyProfile",
    "MyRequests",
    "NewIndent",
    "Item materials",
    "returns",
    "new material request",
    "Service request",
    "Vendors",
    "Notifications",
  ],
  5: [
    "report",
    "MyProfile",
    "MyRequests",
    "Cretate STO",
    "Item materials",
    "Notifications",
  ],
  19: [
    "report",
    "MyProfile",
    "MyRequests",
    "NewIndent",
    "Item materials",
    "returns",
    "New material request",
    "Service request",
    "Vendors",
    "Notifications",
  ],
};

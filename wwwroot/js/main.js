var host = "https://172.16.1.69:3002";
var path = "/api/v4/";

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
    {
      Index: "Index",
      MyProfile: "My Profile",
      MyRequests: "My Requests",
      NewIndent: "New Indent",
      NewPurchaseReq: "New PurchaseReq",
      Servicerequest: "Servicerequest",
      Vendors: "Vendors",
      Notifications: "Notifications",
    },
  ],
  2: [
    {
      report: "report",
      MyProfile: "My Profile",
      MyRequests: "My Requests",
      NewIndent: "New Indent",
      Itemmaterials: "Item materials",
      returns: "returns",
      newmaterialrequest: "new material request",
      Servicerequest: "Service request",
      Vendors: "Vendors",
      Notifications: "Notifications",
    },
  ],
  7: [
    {
      report: "report",
      MyProfile: "MyProfile",
      MyRequests: "MyRequests",
      NewIndent: "NewIndent",
      Itemmaterials: "Item materials",
      returns: "returns",
      newmaterialrequest: "new material request",
      Servicerequest: "Service request",
      Vendors: "Vendors",
      Notifications: "Notifications",
    },
  ],
  5: [
    {
      report: "report",
      MyProfile: "MyProfile",
      MyRequests: "MyRequests",
      CretateSTO: "Cretate STO",
      Itemmaterials: "Item materials",
      Notifications: "Notifications",
    },
  ],
  19: [
    {
      report: "report",
      MyProfile: "MyProfile",
      MyRequests: "MyRequests",
      NewIndent: "NewIndent",
      Itemmaterials: "Item materials",
      returns: "returns",
      Newmaterialrequest: "New material request",
      Servicerequest: "Service request",
      Vendors: "Vendors",
      Notifications: "Notifications",
    },
  ],
};

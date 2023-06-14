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

var icons_list = {};

var roles_menus = {
  //Indent user role
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
  //Indent manager role = 2
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
  //HOD role = 7
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
  //Issue manager role = 5
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
  //SUBHOD role = 19
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

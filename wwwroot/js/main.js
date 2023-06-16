var host = "https://172.16.1.69:3002";
var path = "/api/v4/";

//check login user data
const Logindata = JSON.parse(localStorage.getItem("user_info"));
// console.log("Logindata data on Home js----->", Logindata);
if (!Logindata) {
  window.location.href = "../Login";
}

var plant_id = JSON.parse(localStorage.getItem("plant_id"));
var sort_by = "alphabetically";
var search = "";
var user_loc_response;
var plant;
var products_result;
var selectedValue;
var products_pagination;
var pagenumber = 1;
var search_type = false;
// var addtocart = [];

const notification_Api = host + path + "notification_logs";
var notification_Payload = { user_id: Logindata.user[0].id };
const user_store_locations_api =
  host + path + "user_store_locations?id=" + Logindata.user[0].id;
const Product_api = host + path + "products";

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

var icons_list = {
  Index: '<span class="material-symbols-rounded">dashboard</span>',
  MyProfile: '<span class="material-symbols-rounded">assignment_ind</span>',
  MyRequests: '<span class="material-symbols-rounded">check_circle</span>',
  NewIndent: '<span class="material-symbols-rounded">assignment</span>',
  returns: '<span class="material-symbols-rounded">forward</span>',
  NewPurchaseReq:
    '<span class="material-symbols-rounded">assignment_add</span>',
  Servicerequest: '<span class="material-symbols-rounded">settings</span>',
  Itemmaterials: "Item materials",
  Vendors: '<span class="material-symbols-rounded">group</span>',
  Notifications:
    '<span class="material-symbols-rounded">mark_chat_unread</span>',
  Newmaterialrequest:
    '<span class="material-symbols-rounded">assignment_add</span>',
  CretateSTO: '<span class="material-symbols-rounded">priority_high</span>',
};

//else{icon='<span class="material-symbols-rounded">priority_high</span>'}
var roles_menus = {
  //Indent user role = 3
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

var host = "https://172.16.1.69:3002";
var path = "/api/v4/";

//check login user data
var Logindata = JSON.parse(localStorage.getItem("user_info"));
// console.log("Logindata data on Home js----->", Logindata);
if (!Logindata) {
  window.location.href = "../Login";
}

var sort_by = "alphabetically";
var search = "";
var plant;
var products_result;
var selectedValue;
var products_pagination;
var pagenumber = 1;
var search_type = false;
// var addtocart = [];

var notification_Api = host + path + "notification_logs";
var notification_Payload = { user_id: Logindata.user[0].id };
var user_store_locations_api =
  host + path + "user_store_locations?id=" + Logindata.user[0].id;
var Product_api = host + path + "products";
var user_locations_Api =
  host + path + "user_locations" + "?id=" + Logindata.user[0].id;

// notification_logs Api call hear

function Notifications() {
  $.ajax({
    url: notification_Api,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(notification_Payload),
    success: function (response) {
      if (response.success === true) {
        // console.log("notification_logs js ->Get successfully:", response);
        document.getElementById("noticationbody").innerHTML = "";
        document.getElementById("notifications_no").innerHTML =
          response.notification_logs.length;
        response.notification_logs.forEach((element) => {
          var inputTimestamp = new Date(element.created_at);
          const formattedTime = getTimeAgo(inputTimestamp);
          document.getElementById("noticationbody").innerHTML += `
                    <div class="notification-wrap">
                        <div class="notification-inner">
                            <div class="user-img"><img src="https://172.16.1.69/img/profile.28fb3626.jpg"></div>
                            <div class="user-info">
                                <h3>${element.message}</h3>
                                <p>(${
                                  element.product_id + "-" + element.name
                                })</p>
                                <p>${formattedTime}</p>
                            </div>
                        </div>
                    </div>`;
        });
      }
    },
    error: function (xhr, status, error) {
      if (status === "error") {
        spinner(false);
        console.log("Error: " + error);
        toastlogin("warning", error);
      }
    },
    error: function (error) {
      toastlogin("error", error);
      toastlogin("error", "Network error. Please try again later.");
      console.error("Error creating data on user_store_locations:->>", error);
    },
  });
}
Notifications();
// notification_logs Api call end hear

// cart notifications

function cartcount() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart != null) {
    document.getElementById("notifications_cart").innerHTML = cart.length;
  } else {
    document.getElementById("notifications_cart").innerHTML = 0;
  }
}
cartcount();

var v = 1;

function spinner(isloading) {
  if (isloading == true) {
    document.getElementById("spinnerbody").style.display = "block";
  } else {
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
  Itemmaterials: '<span class="material-symbols-rounded">priority_high</span>',
  Vendors: '<span class="material-symbols-rounded">group</span>',
  Notifications:
    '<span class="material-symbols-rounded">mark_chat_unread</span>',
  Newmaterialrequest:
    '<span class="material-symbols-rounded">assignment_add</span>',
  CretateSTO: '<span class="material-symbols-rounded">priority_high</span>',
  report: '<span class="material-symbols-rounded">dashboard</span>',
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
      Index: "Index",
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
      Index: "report",
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
      Index: "report",
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
      Index: "report",
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
  // requestmanager
  11: [
    {
      Index: "report",
      MyProfile: "MyProfile",
      MyRequests: "MyApprovals",
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

// toast function
function toast(action, msg) {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "1500",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  Command: toastr[action](msg);
}

function getTimeAgo(timestamp) {
  var currentTime = new Date();
  var timeDifference = Math.floor((currentTime - timestamp) / 1000); // Time difference in seconds

  var hours = Math.floor(timeDifference / 3600); // Convert seconds to hours
  var days = Math.floor(hours / 24); // Convert hours to days

  if (days >= 1) {
    if (days === 1) {
      return "1 day ago";
    } else {
      return days + " days ago";
    }
  } else {
    return hours + " hours ago";
  }
}

function popClose(name) {
  $("#" + name).modal("hide");
}

function showModal(bodyContent, title, otherMessage) {
  const modal = $("#customModalCenter");
  const modalTitle = modal.find(".modal-title");
  const modalBody = modal.find(".modal-body");

  modalTitle.text(title);
  modalBody.text(bodyContent);

  // Add any other logic or modifications you need for the modal content

  modal.modal("show");
}

function handleNo() {
  // Add your code here for the "No" button functionality
  console.log("No button clicked");
  // You can close the modal if needed:
  // $('#customModalCenter').modal('hide');
}

function handleYes() {
  // Add your code here for the "Yes" button functionality
  console.log("Yes button clicked");
  // You can close the modal if needed:
  $("#customModalCenter").modal("hide");
  return true;
}

var host = "https://172.16.1.69:3002";
var path = "/api/v4/";

//check login user data
var Logindata = JSON.parse(localStorage.getItem("user_info"));
// console.log("Logindata data on Home js----->", Logindata);
if (!Logindata) {
  window.location.href = "../Login";
}

var url = window.location.href;

// Check if the URL is the error URL
if (url === "chrome-error://chromewebdata/") {
  console.log(
    "Invalid URL encountered. Redirecting to home page or error page."
  );
  window.location.href = "../Home"; // Replace with the appropriate home page URL or error page URL
}

function checkUserRole() {
  var url = window.location.href;
  var parts = url.split("/");
  var lastPart = parts[parts.length - 1];

  for (var roleId in roles_menus) {
    if (3 == roleId) {
      var roleMenuItems = roles_menus[roleId][0];
      if (!roleMenuItems.hasOwnProperty(lastPart)) {
        //console.log("Routing to " + lastPart);
        // Perform the necessary action or redirect to the page
        href = "../NotFound";
      }
    }
  }
  // Check for HTTP error 404
  if (lastPart === "404") {
    console.log("Error 404 encountered. Redirecting to home page.");
    window.location.href = "/Home/Index"; // Replace with the appropriate home page URL
  }
}

// checkUserRole();

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
        toast("warning", error);
      }
    },
    error: function (error) {
      toast("error", error);
      toast("error", "Network error. Please try again later.");
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

// display pagination btn method global start

function paginationlist(current, total, next, perPage, pagename) {
  var Arrow_Right = "";
  var Arrow_left = "";
  document.getElementById("paginationlist").innerHTML = "";

  current != 0
    ? (Arrow_left = `onclick = "page(${current},'${pagename}')"`)
    : (Arrow_left = "");

  current != total - 1
    ? (Arrow_Right = `onclick="page(${next + 1},'${pagename}')"`)
    : (Arrow_Right = "");

  // const Arrow_left =
  document.getElementById("paginationlist").innerHTML += `
    <li ${Arrow_left} class="page-item">
      <a class="page-link prev" aria-label="Previous">
          <span aria-hidden="true" >&#10094;</span>
          <span class="sr-only" >Previous</span>
      </a>
    </li>`;

  var current_active;
  for (var page = 0; page < total; page++) {
    if (current == page) {
      current_active = "active";
    } else {
      current_active = "";
    }
    document.getElementById("paginationlist").innerHTML += `
    <li onclick="page(${
      page + 1
    },'${pagename}')" class="page-item ${current_active}">
        <a class="page-link">${page + 1}</a>
    </li>`;
  }

  // const Arrow_Right =
  document.getElementById("paginationlist").innerHTML += ` <!--Numbers-->
    <li class="page-item" ${Arrow_Right}>
      <a class="page-link next"
          aria-label="Next">
          <span aria-hidden="true">&#10095;</span>
          <span class="sr-only">Next</span>
      </a>
    </li>`;
}

function page(clickpagenumber, pagename) {
  pagenumber = clickpagenumber;
  switch (pagename) {
    case "MyRequests":
      i_ordershow(pagenumber);
      break;

    case "NewIndent":
      cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
      break;

    default:
      alert("name not found");
      break;
  }
}

// display pagination btn method end

var v = 1;

function spinner(isloading) {
  if (isloading == true) {
    document.getElementById("spinnerbody").style.display = "block";
  } else {
    document.getElementById("spinnerbody").style.display = "none";
  }
}

var icons_list = {
  Report: '<span class="material-symbols-rounded">dashboard</span>',
  MyProfile: '<span class="material-symbols-rounded">assignment_ind</span>',
  MyRequests: '<span class="material-symbols-rounded">check_circle</span>',
  NewIndent: '<span class="material-symbols-rounded">assignment</span>',
  returns: '<span class="material-symbols-rounded">forward</span>',
  NewPurchaseReq:
    '<span class="material-symbols-rounded">assignment_add</span>',
  Servicerequest: '<span class="material-symbols-rounded">settings</span>',
  Itemmaterials:
    '<span class="material-symbols-rounded">format_list_bulleted</span > ',
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
      Report: "Report",
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
      Report: "Report",
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
      Report: "report",
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
      Report: "report",
      MyProfile: "MyProfile",
      MyRequests: "Approvals",
      CretateSTO: "Cretate STO",
      Itemmaterials: "Item materials",
      Notifications: "Notifications",
    },
  ],
  //SUBHOD role = 19
  19: [
    {
      Report: "report",
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
      Report: "report",
      MyProfile: "MyProfile",
      MyRequests: "MyApprovals",
      Itemmaterials: "Item materials",
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

function showModal(bodyContent, title, popname, otherMessage, color) {
  const modal = $("#customModalCenter");
  const bgcolor = modal.find(".modal-header");
  const modalTitle = modal.find(".modal-title");
  const modalBody = modal.find(".modal-body");
  const modalbtnyes = modal.find(".common-blue-button");
  bgcolor.addClass(color);
  modalTitle.text(title);
  modalBody.text(bodyContent);
  var count = "";
  switch (popname) {
    case "s_p_delete":
      modalbtnyes.on("click", function () {
        var getcart = JSON.parse(localStorage.getItem("cart"));
        var filteredArray = getcart.filter(function (obj) {
          return obj.id !== otherMessage;
        });
        // console.log("filteredArray->>>", filteredArray);
        localStorage.setItem("cart", JSON.stringify(filteredArray));
        toast("error", "prodect deleted");
        cartshow();
        cartcount();
        modal.modal("hide");
      });
      break;

    case "clearcart":
      modalbtnyes.on("click", function () {
        localStorage.removeItem("cart");
        toast("error", "all prodect clear");
        cartshow();
        cartcount();
        modal.modal("hide");
      });
      break;

    case "PR_raised":
      modal.find(".common-blue-button").text("Approve");
      modal.find(".common-red-button").text("Cancel");
      modalbtnyes.on("click", function () {
        console.log("PR_raised");
        modal.modal("hide");
      });
      break;

    case "myrequestdelete":
      modal.find(".common-blue-button").text("Yes");
      modal.find(".common-red-button").text("Cancel");
      modalbtnyes.on("click", function () {
        console.log("myrequestdelete");
        modal.modal("hide");
        console.log(count);
        count++;
        console.log(count);
        i_ordershow(1);
      });
      break;

    default:
      break;
  }

  modal.modal("show");
}

function handleYes() {
  // Add your code here for the "Yes" button functionality
  console.log("Yes button clicked");
  // close the modal
  $("#customModalCenter").modal("hide");
  return true;
}

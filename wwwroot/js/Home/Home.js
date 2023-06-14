//check login user data
const Logindata = JSON.parse(localStorage.getItem("user_info"));
console.log("Logindata data on Home js----->", Logindata);
if (!Logindata) {
  window.location.href = "../Login";
}

var sort_by = "alphabetically";
var search = "";
var user_loc_response;
var plant;
var products_result;
var selectedValue;
var products_pagination;
var pagenumber = 1;

const notification_Api = host + path + "notification_logs";
var notification_Payload = { user_id: Logindata.user[0].id };
const user_store_locations_api =
  host + path + "user_store_locations?id=" + Logindata.user[0].id;
const Product_api = host + path + "products";

//ajax of user_store_locations_api start
$.ajax({
  url: user_store_locations_api,
  type: "GET",
  contentType: "application/json",
  success: function (response) {
    console.log(" loc js -> Data created successfully:", response);
    user_loc_response = response;
    dropdownlist(response);
    cardshow(response.locations[0].id, response, sort_by, search, pagenumber);
  },
  error: function (error) {
    console.error("Error creating data on user_store_locations:->>", error);
  },
});
//ajax of user_store_locations_api end

// notification_logs Api call hear
$.ajax({
  url: notification_Api,
  type: "POST",
  contentType: "application/json",
  data: JSON.stringify(notification_Payload),
  success: function (response) {
    // console.log("notification_logs js ->Get successfully:", response);
    document.getElementById("notifications_no").innerHTML =
      response.notification_logs.length;
  },
  error: function (error) {
    console.error("Error creating data on user_store_locations:->>", error);
  },
});
// notification_logs Api call end hear

//dropdownlist display method start

function dropdownlist(data) {
  if (data.success === true) {
    var locations = data.locations;
    locations.forEach((element) => {
      $("#myDropdown1").append(
        $("<option></option>")
          .attr("value", element.id)
          .text(
            element.plant_id +
              " - " +
              element.storage_loc +
              " - " +
              element.storage_location_desc
          )
      );
    });
  }
}
//dropdownlist display method end

$("#myDropdown1").change(function () {
  pagenumber = 1;
  selectedValue = $(this).val();
  console.log("Selected value: " + selectedValue);
  // Call cardshow function here on change dropdown
  console.log("plan_id---------->>>>>>", user_loc_response);
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
});
//dropdownlist display method end

$("#myDropdown2").change(function () {
  sort_by = $(this).val();
  console.log("sort_by: " + selectedValue);
  // Call cardshow function here on change dropdown
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
});

$("#searchIndent").keydown(function () {
  search = $(this).val();
  console.log("search--->", search);
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
});

//cardshow function and product APi call hear

function cardshow(loc_id, user_loc_response, sort_by, search, pagenumber) {
  document.getElementById("cardbody").innerHTML = "";
  user_loc_response.locations.forEach((element) => {
    if (element.id == loc_id) {
      plant = element;
      localStorage.setItem("plant_id", JSON.stringify(plant));
    }
  });
  //payload data
  const Payload = {
    page: pagenumber,
    npp: 12,
    sort_by: sort_by,
    search: search,
    material_group_id: [],
    material_type_id: [],
    plant: plant,
  };
  // Post products_APi call hear
  $.ajax({
    url: Product_api,
    type: "POST",
    data: JSON.stringify(Payload),
    contentType: "application/json",
    success: function (response) {
      // console.log(" Home js -> Data created successfully:", response);
      products_result = response.products.result;
      products_pagination = response.products.pagination;
      // console.log("result ajax in Home js ->>>>>", result);

      //home page cards function call hear
      homepagecards(products_result, products_pagination);
    },
    error: function (error) {
      console.error("Error creating data:", error);
    },
  });

  var instock;

  //home page cards function
  function homepagecards(products_result, products_pagination) {
    if (products_result.length > 0) {
      products_result.forEach((element, Index) => {
        if (element.valution_type != "") {
          var labcolor;
          if (element.valution_type == "NEW") {
            labcolor = "bg-blue";
          } else if (element.valution_type == "REFURBISH") {
            labcolor = "bg-yellow";
          }
        }
        if (element.stock == 0) {
          instock = "<span class='error'> Stock not available</span>";
        } else {
          instock = "<span> In Stock</span>";
        }
        // card detail store in body
        document.getElementById("cardbody").innerHTML += `
            <div class="col-sm-6 col-md-6 col-lg-3">
              <div class="product-card">
                <img class="product-img" src="${element.image_url}">
                <div class="product-text">
                 <div class="product-title">
                    <h5><b>${element.name}</b></h5>
                    <span class="${labcolor}">${element.valution_type}</span>
                  </div>
                  <p><span>material Id</span>: ${element.material_sap_id}</p>
                  <p><span>material Type</span>: ${element.material_type} </p>
                  <p><span>material Group</span>:  ${element.material_group}</p>
                  <p><span>Base Unit</span>: ${element.base_unit} </p>
                </div>
                <div class="product-cart">
                  <div class="stockcountbox">
                    <input type="hidden" class="hiddeninput" value="${element.id}">
                    <input class="stockcount" type="text" value="${element.stock}" disabled />${instock}
                  </div>
                  <div>
                    <div class="wrap">
                      <button type="button" class="sub"><span class="material-symbols-rounded" onclick="RemoveClick(${element.id})" >remove</span></button>
                      <input class="count" type="text" value="0" min="1" max="100" />
                      <button type="button" class="add"><span class="material-symbols-rounded" onclick="AddClick(${element.id})">add</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
      });

      console.log("current-->", products_pagination.current);
      console.log("total-->", products_pagination.total);
      console.log("next-->", products_pagination.next);
      console.log("perPage;-->", products_pagination.perPage);
      var Arrow_Right = "";
      var Arrow_left = "";
      document.getElementById("paginationlist").innerHTML = "";
      if (products_pagination.current != 0) {
        //Arrow_left are  disabled
        Arrow_left = `onclick = "Previoupage(${products_pagination.current})"`;
      } else {
        //Arrow_left are  visible
        Arrow_left = "";
      }
      if (products_pagination.current != products_pagination.total - 1) {
        //Arrow_left are  disabled
        Arrow_Right = `onclick="Nextpage(${products_pagination.next + 1})"`;
      } else {
        //Arrow_left are  visible
        Arrow_Right = "";
      }

      // const Arrow_left =
      document.getElementById("paginationlist").innerHTML += `<!--Arrow left-->
                          <li ${Arrow_left} class="page-item">
                            <a class="page-link prev" 
                                aria-label="Previous">
                                <span
                                    aria-hidden="true" >&#10094;</span>
                                <span
                                    class="sr-only" >Previous</span>
                            </a>
                          </li>`;

      var current;
      for (var page = 0; page < products_pagination.total; page++) {
        if (products_pagination.current == page) {
          current = "active";
        } else {
          current = "";
        }
        document.getElementById(
          "paginationlist"
        ).innerHTML += `<li onclick="page(${
          page + 1
        })" class="page-item ${current}">
                          <a class="page-link">${page + 1}</a>
                        </li>`;
      }

      // const Arrow_Right =
      document.getElementById("paginationlist").innerHTML += ` <!--Numbers-->
                                <li class="page-item" ${Arrow_Right}>
                                  <a class="page-link next"
                                      aria-label="Next">
                                      <span
                                          aria-hidden="true">&#10095;</span>
                                      <span
                                          class="sr-only">Next</span>
                                  </a>
                            </li>`;

      // document.getElementById("paginationlist").innerHTML +=
      // Arrow_left + " " + paginationlist + " " + Arrow_Right;
    } else {
      document.getElementById(
        "cardbody"
      ).innerHTML += `<div class="cardimgbody">
                    <div class="notfoundimg">
                      <img src="https://172.16.1.69/img/no_results_found.ff4ae51d.jpg">
                    </div>
                  </div>`;
    }
  }
}

//page
function page(clickpagenumber) {
  pagenumber = clickpagenumber;
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
}
function Previoupage(clickpagenumber) {
  pagenumber = clickpagenumber;
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
}
function Nextpage(clickpagenumber) {
  pagenumber = clickpagenumber;
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
}
//

var obj1 = [];
// const handleClick = (elem) => {
//   // obj1.push(elem);
//   console.log("element current ========>", elem);
// };
function AddClick(id) {
  products_result.forEach((element) => {
    if (element.id === id) {
      console.log("->>>>>>>>>>>>>>>>>>>>>>>>", id, element);
    }
  });
}
function RemoveClick(id) {}

// function for add and sub btn   <p><span class="stockcount">${element.stock}</span> In Stock</p>
$(document).ready(function () {
  // add click btn

  $(document).on("click", ".add", function () {
    // console.log("element current ========>", obj1);
    var obj = $(this)
      .parent()
      .parent()
      .siblings(".stockcountbox")
      .find(".hiddeninput")
      .val();
    // console.log("hiddeninput id------------------------>>>>>>>>>", obj);
    // obj1.map((ob) => {
    //   if (ob.id == obj) {
    //     console.log("found", ob);
    //   }
    // });
    var th = $(this).closest(".wrap").find(".count");
    var avaItems = $(this)
      .parent()
      .parent()
      .siblings(".stockcountbox")
      .find(".stockcount")
      .val();
    if (avaItems == 0) {
      //pop show--->>>>   PR/STO Request.   ---> Material Stock is not available. Please approve to raised PR/STO request.
      alert(
        " Material Stock is not available. Please approve to raised PR/STO request"
      );
      $(this)
        .parent()
        .parent()
        .siblings(".stockcountbox")
        .find("span")
        .addClass("error")
        .text("Stock not available");
    } else {
      avaItems--;
      $(this)
        .parent()
        .parent()
        .siblings(".stockcountbox")
        .find(".stockcount")
        .val(avaItems);
    }
    console.log("input(+)--->", avaItems);
    th.val(+th.val() + 1);
  });

  //  minus click btn
  $(document).on("click", ".sub", function () {
    var th = $(this).closest(".wrap").find(".count");
    if (th.val() > 0) th.val(+th.val() - 1);

    var avaItems = $(this)
      .parent()
      .parent()
      .siblings(".stockcountbox")
      .find(".stockcount")
      .val();

    if (th.val() != 0) {
      avaItems++;
    }

    $(this)
      .parent()
      .parent()
      .siblings(".stockcountbox")
      .find(".stockcount")
      .val(avaItems);

    console.log("input(-)--->", avaItems);
    console.log("th(-)--->", th.val());
  });
});

var Cart = [];

// const button = document.querySelector("#sidebar-toggle");
// const wrapper = document.querySelector("#wrapper");

// button.addEventListener("click", (e) => {
//   console.log("test");
//   e.preventDefault();
//   wrapper.classList.toggle("toggled");
// });

// const sidebar = document.querySelector(".sidebar");
// const sidebarBtn = document.querySelector(".bx-menu");

// sidebarBtn.addEventListener("click", () => {
//   sidebar.classList.toggle("close");
// });

const arrows = document.querySelectorAll(".arrow");
arrows.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    const arrowParent = e.target.closest(".arrow").parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  });
});

var i = 1;
var badge = document.getElementById("badge");

var int = window.setInterval(updateBadge, 2000); //Update the badge ever 5 seconds
var badgeNum;
function updateBadge() {
  //To rerun the animation the element must be re-added back to the DOM
  // var badgeChild = badge.children[0];
  // if (badgeChild.className === "badge-num")
  //   badge.removeChild(badge.children[0]);
  // badgeNum = document.createElement("div");
  //badge.setAttribute("class", "badge-num");
  // badgeNum.innerHTML = i++;
  // var insertedElement = badge.insertBefore(badgeNum, badge.firstChild);
  // console.log(badge.children[0]);
}

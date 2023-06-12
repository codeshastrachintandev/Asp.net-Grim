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
    cardshow(response.locations[0].id, response, sort_by, search);
  },
  error: function (error) {
    console.error("Error creating data on user_store_locations:->>", error);
  },
});
//ajax of user_store_locations_api end

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
  selectedValue = $(this).val();
  console.log("Selected value: " + selectedValue);
  // Call cardshow function here on change dropdown
  console.log("plan_id---------->>>>>>", user_loc_response);
  cardshow(selectedValue, user_loc_response, sort_by, search);
});
//dropdownlist display method end

$("#myDropdown2").change(function () {
  sort_by = $(this).val();
  console.log("sort_by: " + selectedValue);
  // Call cardshow function here on change dropdown
  cardshow(selectedValue, user_loc_response, sort_by, search);
});

$("#searchIndent").keydown(function () {
  search = $(this).val();
  console.log("search--->", search);
  cardshow(selectedValue, user_loc_response, sort_by, search);
});

//cardshow function and product APi call hear

function cardshow(loc_id, user_loc_response, sort_by, search) {
  document.getElementById("cardbody").innerHTML = "";
  user_loc_response.locations.forEach((element) => {
    if (element.id == loc_id) {
      plant = element;
      localStorage.setItem("plant_id", JSON.stringify(plant));
    }
  });
  //payload data
  const Payload = {
    page: 1,
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
      // console.log("result ajax in Home js ->>>>>", result);

      //home page cards function call hear
      homepagecards(products_result);
    },
    error: function (error) {
      console.error("Error creating data:", error);
    },
  });

  var instock;

  //home page cards function
  function homepagecards(products_result) {
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
                    <input class="stockcount" type="text" value="${element.stock}" disabled />${instock}
                  </div>
                  <div>
                    <div class="wrap">
                      <button type="button" class="sub">-</button>
                      <input class="count" type="text" value="0" min="1" max="100" />
                      <button type="button"  class="add">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
      });
    } else {
      var body = `<div class="cardimgbody">
                    <div class="notfoundimg">
                      <img src="https://172.16.1.69/img/no_results_found.ff4ae51d.jpg">
                    </div>
                  </div>`;
      document.getElementById("cardbody").innerHTML += body;
    }
  }
}

// function for add and sub btn   <p><span class="stockcount">${element.stock}</span> In Stock</p>
$(document).ready(function () {
  // add click btn

  $(document).on("click", ".add", function () {
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

  //  sub click btn
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

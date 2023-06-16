// var plant_id = JSON.parse(localStorage.getItem("plant_id"));
// var sort_by = "alphabetically";
// var search = "";
// var user_loc_response;
// var plant;
// var products_result;
// var selectedValue;
// var products_pagination;
// var pagenumber = 1;
// var search_type = false;
// // var addtocart = [];

// const notification_Api = host + path + "notification_logs";
// var notification_Payload = { user_id: Logindata.user[0].id };
// const user_store_locations_api =
//   host + path + "user_store_locations?id=" + Logindata.user[0].id;
// const Product_api = host + path + "products";

//ajax of user_store_locations_api start
$.ajax({
  url: user_store_locations_api,
  type: "GET",
  contentType: "application/json",
  success: function (response) {
    // console.log(" loc js -> Data created successfully:", response);
    user_loc_response = response;
    dropdownlist(response);
  },
  error: function (error) {
    console.error("Error creating data on user_store_locations:->>", error);
  },
});
//ajax of user_store_locations_api end

function cartcount() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart != null) {
    document.getElementById("notifications_cart").innerHTML = cart.length;
  } else {
    document.getElementById("notifications_cart").innerHTML = 0;
  }
}
cartcount();
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
    // console.log("plant_id", locations, plant_id);

    var dropdown = $("#myDropdown1");

    locations.forEach((element) => {
      const optionElement = $("<option>", {
        value: element.id,
        text:
          element.plant_id +
          " - " +
          element.storage_loc +
          " - " +
          element.storage_location_desc,
      });
      if (element.id === plant_id.id) {
        optionElement.attr("selected", "selected");
      }
      dropdown.append(optionElement);
    });
  }
  pagenumber = 1;
  cardshow(plant_id.id, user_loc_response, sort_by, search, pagenumber);
}
//dropdownlist display method end

$("#myDropdown1").change(function () {
  pagenumber = 1;
  selectedValue = $(this).val();
  console.log("Selected value: ", selectedValue);
  localStorage.removeItem("cart");
  // Call cardshow function here on change dropdown
  console.log("plan_id---------->>>>>>", user_loc_response);
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
  localStorage.removeItem("cart");
});
//dropdownlist display method end

$("#myDropdown2").change(function () {
  sort_by = $(this).val();
  console.log("sort_by: " + selectedValue);
  // Call cardshow function here on change dropdown
  cardshow(selectedValue, user_loc_response, sort_by, search, pagenumber);
});

$("#searchIndent").on("input", function (event) {
  search_type = true;
  search = $(this).val();
  pagenumber = 1;
  console.log("search--->", search);
  document.getElementById("paginationlist").innerHTML = "";
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
  var Payload = {
    page: pagenumber,
    npp: 12,
    sort_by: sort_by,
    search: search,
    material_group_id: [],
    material_type_id: [],
    plant: plant,
  };

  if (search_type) {
    const NewPayload = {
      page: pagenumber,
      npp: 12,
      sort_by: sort_by,
      search: search,
      material_group_id: [],
      material_type_id: [],
      plant: plant,
      search_type: "all_plants",
    };
    Payload = NewPayload;
  }
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
      homepagecards(products_result, products_pagination);
    },
    error: function (error) {
      console.error("Error creating data:", error);
    },
  });

  var instock;
  var cartobj;
  var cart = JSON.parse(localStorage.getItem("cart"));
  //home page cards function
  function homepagecards(products_result, products_pagination) {
    // console.log(products_result);
    if (products_result.length > 0) {
      products_result.forEach((element, Index) => {
        // check valution_type
        if (element.valution_type != "") {
          var labcolor;
          if (element.valution_type == "NEW") {
            labcolor = "bg-blue";
          } else if (element.valution_type == "REFURBISH") {
            labcolor = "bg-yellow";
          }
        }
        //check stock
        if (element.stock == 0) {
          instock = "<span class='error'> Stock not available</span>";
        } else {
          instock = "<span> In Stock</span>";
        }

        var cartquan = 0;
        var countstock = 0;
        // cartobj has 2 val or more
        if (cart != null) {
          cart.forEach((cartobj) => {
            if (cartobj.id == element.id) {
              cartquan = cartobj.quantity;
              cartobj.stock;
            }
          });
        }
        // if (element.stock == 0) {
        //   countstock = element.stock - cartquan;
        // } else {
        //   countstock = element.stock;
        // }

        // card detail store in body
        document.getElementById("cardbody").innerHTML += `
            <div class="col-sm-6 col-md-6 col-lg-3">
              <div class="product-card">
                <img class="product-img" src="${element.image_url}">
                <div class="product-text">
                 <div class="product-title">
                    <h6><b>${element.name}</b></h6>
                    <span class="${labcolor}">${element.valution_type}</span>
                  </div>
                  <p><span>material Id</span>: ${element.material_sap_id}</p>
                  <p><span>material Type</span>: ${element.material_type} </p>
                  <p><span>material Group</span>:  ${element.material_group}</p>
                  <p><span>Base Unit</span>: ${element.base_unit} </p>
                </div>
                <div class="product-cart">
                  <div class="stockcountbox">
                    <input class="stockcount" type="text" value="${
                      element.stock - cartquan
                    }" disabled />${instock}
                  </div>
                  <div>
                    <div class="wrap">
                      <button type="button" class="sub" data-index="${Index}"><span class="material-symbols-rounded">remove</span></button>
                      <input class="count" type="text" value="${cartquan}" min="1" max="100" />
                      <button type="button" class="add" data-index="${Index}"><span class="material-symbols-rounded">add</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
      });

      paginationlist(
        products_pagination.current,
        products_pagination.total,
        products_pagination.next,
        products_pagination.perPage
      );
    } else {
      document.getElementById(
        "cardbody"
      ).innerHTML += `<div class="cardimgbody">
                    <div class="notfoundimg">
                      <img src="https://172.16.1.69/img/no_results_found.ff4ae51d.jpg">
                    </div>
                  </div>`;
      document.getElementById("paginationlist").innerHTML = "";
    }
  }
}

// $(document).ready(function () {

// add click btn

$(document).on("click", ".add", function () {
  var index = $(this).data("index");
  console.log("products_result[index]->", products_result[index]);

  var th = $(this).closest(".wrap").find(".count");
  var avaItems = $(this)
    .parent()
    .parent()
    .siblings(".stockcountbox")
    .find(".stockcount")
    .val();
  //pop show--->>>>   PR/STO Request.   ---> Material Stock is not available. Please approve to raised PR/STO request.
  if (avaItems == 0) {
    $(this)
      .parent()
      .parent()
      .siblings(".stockcountbox")
      .find("span")
      .addClass("error")
      .text("Stock not available");
    alert(
      "Material Stock is not available. Please approve to raised PR/STO request"
    );
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

  var temp = {
    id: products_result[index].id,
    name: products_result[index].name,
    price: products_result[index].price,
    stock: products_result[index].stock,
    i_stock: 1,
    bag: products_result[index].bag,
    quantity: parseInt(th.val()),
    plant_id: products_result[index].plant_id,
    status: "Pending",
    p_location: "",
    p_remarks: "",
    //?
    wbs_element_number: "WBS123456",
    sap_id: "SAP123456",
    //?
    base_unit: products_result[index].base_unit,
    valution_type: products_result[index].valution_type,
  };
  var addtocart = JSON.parse(localStorage.getItem("cart"));
  if (!addtocart) {
    addtocart = [];
  }
  addtocart.push(temp);
  var result_added = removeDuplicatesAndUpdate(addtocart);

  // console.log("removeDupandUpdate->", result_added);

  //store data
  localStorage.setItem("cart", JSON.stringify(result_added));
  cartcount();
});

//  minus click btn
$(document).on("click", ".sub", function () {
  var index = $(this).data("index");
  console.log("products_result[index]->", products_result[index]);

  var th = $(this).closest(".wrap").find(".count");

  var stockcount = $(this)
    .parent()
    .parent()
    .siblings(".stockcountbox")
    .find(".stockcount")
    .val();

  if (th.val() > 0) {
    th.val(+th.val() - 1);
    if (products_result[index].stock != stockcount) {
      stockcount++;
      $(this)
        .parent()
        .parent()
        .siblings(".stockcountbox")
        .find("span")
        .removeClass("error")
        .text("In Stock");
    }
  }

  $(this)
    .parent()
    .parent()
    .siblings(".stockcountbox")
    .find(".stockcount")
    .val(stockcount);

  var temp = {
    id: products_result[index].id,
    name: products_result[index].name,
    price: products_result[index].price,
    stock: products_result[index].stock,
    i_stock: 1,
    bag: products_result[index].bag,
    quantity: parseInt(th.val()),
    plant_id: products_result[index].plant_id,
    status: "Pending",
    p_location: "",
    p_remarks: "",
    //?
    wbs_element_number: "WBS123456",
    sap_id: "SAP123456",
    //?
    base_unit: products_result[index].base_unit,
    valution_type: products_result[index].valution_type,
  };
  var subtocart = JSON.parse(localStorage.getItem("cart"));
  if (temp.quantity == 0) {
    subtocart.forEach((element, tempindex) => {
      if (element.id == products_result[index].id) {
        subtocart.splice(tempindex, 1);
      }
    });
  } else {
    subtocart.push(temp);
  }
  var result_added = removeDuplicatesAndUpdate(subtocart);

  localStorage.setItem("cart", JSON.stringify(result_added));

  // console.log("input(-)--->", stockcount);
  // console.log("th(-)--->", th.val());
  cartcount();
});

// });

const arrows = document.querySelectorAll(".arrow");
arrows.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    const arrowParent = e.target.closest(".arrow").parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  });
});

function removeDuplicatesAndUpdate(arr) {
  var uniqueObjects = {};
  for (var i = 0; i < arr.length; i++) {
    var obj = arr[i];
    var objId = obj.id;
    if (uniqueObjects.hasOwnProperty(objId)) {
      var existingObj = uniqueObjects[objId];
      if (!isEqual(obj, existingObj)) {
        $.extend(existingObj, obj);
      }
    } else {
      uniqueObjects[objId] = obj;
    }
  }
  return Object.values(uniqueObjects);
}

// Helper function to compare two objects for equality
function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// display pagination btn
function paginationlist(current, total, next, perPage) {
  var Arrow_Right = "";
  var Arrow_left = "";
  document.getElementById("paginationlist").innerHTML = "";

  current != 0
    ? (Arrow_left = `onclick = "Previoupage(${current})"`)
    : (Arrow_left = "");

  current != total - 1
    ? (Arrow_Right = `onclick="Nextpage(${next + 1})"`)
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
    <li onclick="page(${page + 1})" class="page-item ${current_active}">
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

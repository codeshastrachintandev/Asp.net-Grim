var user_loc_response;
var plant_id = JSON.parse(localStorage.getItem("plant_id"));
//ajax of user_store_locations_api start
function user_loc() {
  $.ajax({
    url: user_store_locations_api,
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      //console.log(" loc js -> Data created successfully:", response);
      user_loc_response = response;
      if (plant_id == null) {
        console.log("user_loc_response-->>", user_loc_response);
        user_loc_response.locations.forEach((element, index) => {
          if (index == 1) {
            localStorage.setItem("plant_id", JSON.stringify(element));
            plant_id = JSON.parse(localStorage.getItem("plant_id"));
          }
        });
      }

      dropdownlist(response);
    },
    error: function (error) {
      console.error("Error creating data on user_store_locations:->>", error);
    },
  });
}
user_loc();
//ajax of user_store_locations_api end

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
  cartcount();
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
  spinner(true);
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
      spinner(false);
    },
    error: function (error) {
      console.error("Error creating data:", error);
      spinner(false);
    },
  });

  var instock;
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
        var totelstock =
          element.stock - cartquan >= 0 ? element.stock - cartquan : 0;
        // if (element.stock == 0) {
        //   countstock = element.stock - cartquan;
        // } else {
        //   countstock = element.stock;
        // }

        // card detail store in body
        document.getElementById("cardbody").innerHTML += `
            <div class="col-sm-6 col-md-6 col-lg-3 card-cut-col">
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
                    <input class="stockcount" type="text" value="${totelstock}" disabled />${instock}
                  </div>
                  <div>
                    <div class="wrap">
                      <button type="button" class="sub" data-index="${Index}"><span class="material-symbols-rounded">remove</span></button>
                      <input class="count" type="text" data-val="${element.stock}"  data-index="${Index}" value="${cartquan}" min="1" max="100" />
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
        products_pagination.perPage,
        "NewIndent"
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
// Define the stock variable

// input on val
$(document).on("input", ".count", function () {
  var enteredValue = $(this).val();
  var stock = $(this).data("val");
  var index = $(this).data("index");
  let val = $(this)
    .parent()
    .parent()
    .siblings(".stockcountbox")
    .find(".stockcount");
  // Check if the entered value is a number
  if ($.isNumeric(enteredValue)) {
    if (enteredValue === "0" || enteredValue.trim() === "") {
      // Set default value to 1
      $(this).val("0");
      enteredValue = 0; // Update the enteredValue variable
    }

    // Check if enteredValue is less than stock
    if (parseInt(enteredValue) > stock) {
      alert("Entered value is less than stock.");
      stock - enteredValue >= 0 ? val.val(stock - enteredValue) : val.val(0);
    } else {
      console.log("Number entered:", enteredValue);
      stock - enteredValue >= 0 ? val.val(stock - enteredValue) : val.val(0);
    }
    var temp = {
      id: products_result[index].id,
      name: products_result[index].name,
      price: products_result[index].price,
      stock: products_result[index].stock,
      i_stock: 1,
      bag: products_result[index].bag,
      quantity: parseInt(enteredValue),
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
    cartcount();
    toast("success", "Prodect added into the cart successfuly");
  }
});

// add click btn
$(document).on("click", ".add", function () {
  var index = $(this).data("index");
  // console.log("products_result[index]->", products_result[index]);

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

    showModal(
      "Material Stock is not available. Please approve to raised PR/STO request.",
      "PR/STO Request.",
      "PR_raised",
      "",
      "bg-blue"
    );
    th.val(1);
  } else {
    avaItems--;
    $(this)
      .parent()
      .parent()
      .siblings(".stockcountbox")
      .find(".stockcount")
      .val(avaItems);
    console.log("input(+)--->", avaItems);
    th.val(+th.val() + 1);
    toast("success", "Prodect added into the cart successfuly");
  }

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

  //store data
  localStorage.setItem("cart", JSON.stringify(result_added));
  cartcount();
});

//  minus click btn
$(document).on("click", ".sub", function () {
  var index = $(this).data("index");
  // console.log("products_result[index]->", products_result[index]);

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

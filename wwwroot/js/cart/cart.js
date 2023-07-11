let plantdata = JSON.parse(localStorage.getItem("plant_id"));
if (plantdata) {
  document.getElementById("plant_name").innerHTML =
    plantdata.plant_id +
    "-" +
    plantdata.storage_loc +
    "-" +
    plantdata.storage_location_desc;
}

//ajax of user_store_locations_api start
$.ajax({
  url: user_locations_Api,
  type: "GET",
  contentType: "application/json",
  success: function (response) {
    dropdownfor_user_loc(response);
  },
  error: function (error) {
    console.error("Error creating data on user_store_locations:->>", error);
  },
});

function dropdownfor_user_loc(data) {
  if (data.success === true) {
    var locations = data.locations;
    // console.log("plant_id", locations, plant_id);

    var dropdown = $("#sel2");
    dropdown.append(`<option value="0">Search Locations</option>`);
    locations.forEach((element) => {
      const optionElement = $("<option>", {
        value: element.plant_id,
        text:
          element.plant_id +
          " - " +
          element.storage_loc +
          " - " +
          element.plant_name,
        "data-id": element.id,
      });
      dropdown.append(optionElement);
    });
  }
}

var selectedId;
$("#sel2").change(function () {
  selectedValue = $(this).val();
  var selectedOption = $(this).find("option:selected");
  // Get the value of the data-id attribute
  selectedId = selectedOption.data("id");
  // Print the data-id value

  // console.log("selectedId->>", selectedId);
  // console.log("selectedValue->>", selectedValue);
  WBS_Element_Number(selectedValue);
});

function WBS_Element_Number(no) {
  spinner(true);
  if (no != "0") {
    $.ajax({
      url: host + path + "wbs_numbers?plant_id=" + no,
      type: "GET",
      contentType: "application/json",
      success: function (response) {
        console.log(response);
        if (response.success === true) {
          var dropdown = $("#sel3");
          // Remove all existing options from the dropdown  WBS_GENERAL
          dropdown.empty();
          dropdown.append(`<option value="WBS_GENERAL">Search WBS</option>`);

          if (response.wbs_numbers.length > 0) {
            response.wbs_numbers.forEach((element) => {
              const optionElement = $("<option>", {
                value: element.wbs_number,
                text: element.display_name,
              });

              dropdown.append(optionElement);
            });
          } else {
            const optionElement = $("<option>", {
              value: "",
              text: "No data found...",
            });
            dropdown.append(optionElement);
          }
          setTimeout(() => {
            spinner(false);
          }, 300);
        }
      },
      error: function (error) {
        console.error("Error creating data on user_store_locations:->>", error);
      },
    });
  } else {
    var dropdown = $("#sel3");
    dropdown.empty();
    const optionElement = $("<option>", {
      value: "",
      text: "No data found...",
    });
    dropdown.append(optionElement);
  }
}

cartshow();

function cartshow() {
  spinner(true);
  document.getElementById("showmsg").innerHTML = "";
  document.getElementById("tbody").innerHTML = "";
  const cartdata = JSON.parse(localStorage.getItem("cart"));

  if (cartdata && cartdata.length > 0) {
    cartdata.forEach((element, index) => {
      tbody(element, index);
    });
  } else {
    document.getElementById("tableid").style.display = "none";
    document.getElementById(
      "showmsg"
    ).innerHTML += `<div class="showmsg">Your indent is currently empty.</div> `;
  }
  setTimeout(() => {
    spinner(false);
  }, 500);
}

function roundUp(num, precision) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}

function tbody(element, sr) {
  document.getElementById("tbody").innerHTML += `  
  <tr id="getitem${sr}" data-itemid="${element.id}">
      <td class="vmiddle">
          <div>${sr + 1}</div>
      </td>
      <td class="vmiddle">
          <div>${element.name}</div>
      </td>
      <td> 
          <div>
              <input type="number"  min="1" class="form-control quantity quantity${sr}" id="${sr}" value="${
    element.quantity
  }"required>
          </div>
      </td>
      <td class="vmiddle">
          <div>
              ₹<span id="Tprice${sr}" data-price="${element.price}" >${roundUp(
    element.price * element.quantity,
    3
  )}</span>
          </div>
      </td>
      <td>
          <div>
              <input type="date" class="form-control minDate minDate${sr}" id="minDate${sr}" required>
          </div>
      </td>
      <td>
          <div>
              <div class="">
                  <select class="form-control DeliveryPriority DeliveryPriority${sr}" data-obj="${element}" placeholder="Delivery Priority*" id="${sr}">
                      <option value="0">Delivery Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                  </select>
              <span class="error-msg cartdropbox4" id="DeliveryPriority${sr}" style="display: none;">*The DeliveryPriority field is required.</span>
              </div>
          </div>
      </td>
      <td>
          <div>
              <input type="text" id="Delval${sr}" disabled name="input1" class="form-control" required>
              <p>0 / 2</p>
          </div>
      </td>     
      <td>
          <div>
              <input type="text" class="form-control input1-${sr}" value="test"  required>
              <p>0 / 20</p>
          </div>
      </td>
      <td>
          <div>
              <input type="text" class="form-control input2-${sr}"  value="test"  required>
          </div>
          <p>0 / 50</p>
      </td>
      <td>
          <div>
              <textarea class="form-control input3-${sr}" rows="1" value="test"   required></textarea>
              <p> 0 / 100</p>
          </div>
      </td>
      <td>
          <div>
              <textarea class="form-control input4-${sr}" rows="1" value="test"  required></textarea>
              <p>0 / 50</p>
          </div>
      </td>
      <td>
          <div>
              <div class="">
                  <select class="form-control Qualitycheckby Qualitycheckby${sr}" data-obj="${element}" placeholder="Quality Check By*"  required>
                      <option value="0">Quality Check By*</option>
                      <option value="User">User</option>
                      <option value="QA Team">QA Team</option>
                      <option value="stores">stores</option>
                  </select>
                <span class="error-msg cartdropbox3" id="Qualitycheckby${sr}" style="display: none;">*The QualityCheckBy field is required.</span>
              </div>
          </div>
      </td>
      <td>
          <div>
              <span><a><span id="${sr}" data-obj="${
    element.id
  }" class="material-symbols-rounded deleteicon">delete</span></a></span>
          </div>
      </td>
  </tr>
`;
}

var form = document.getElementById("formId");
function submitForm(event) {
  event.preventDefault();
}

form.addEventListener("submit", submitForm);

function Pordectorder() {
  var total = 1;

  if (validation()) {
    // console.log("valid");
    // get all data from cart page
    let itemsdata = [];
    var cartarray = JSON.parse(localStorage.getItem("cart"));
    cartarray.forEach((element, index) => {
      // console.log(index, "-", $(".quantity" + index).val() * element.price);
      // console.log("up", total);
      total += $(".quantity" + index).val() * element.price;
      // console.log("down", total);
      let itemstempobj = {
        product_id: $("#getitem" + index).data("itemid"),
        product_name: element.name,
        quantity: $(".quantity" + index).val(),
        total_price: element.price * $(".quantity" + index).val(),
        price: element.price,
        delivery_priority: $(".DeliveryPriority" + index).val(),
        remarks: "",
        stock: element.stock,
        bag: element.bag,
        reason: $(".input3-" + index).val(),
        where_used: $(".input4-" + index).val(),
        section: $(".input2-" + index).val(),
        tracking_no: $(".input1-" + index).val(),
        priority_days: $("#Delval" + index).val(),
        base_unit: element.base_unit,
        delivery_date: $(".minDate" + index).val(),
        quality_check_by: $(".Qualitycheckby" + index).val(),
        valution_type: element.valution_type,
      };
      itemsdata.push(itemstempobj);
    });
    console.log("total->>", total);

    var temporderobj = {
      order: {
        user_id: Logindata.user[0].id,
        first_name: Logindata.user[0].first_name,
        role_id: Logindata.user[0].role_id,
        plant: plantdata,
        items: itemsdata,
        total: total, //total from all prodects -> items
        address: selectedId,
        WBS_NO: $("#sel3").val(),
        urgent_flag: $("#urgent-indent").is(":checked"),
        delivery_type: $("#sel4").val(),
        ref: "", //??
        ticket_id: "", //??
      },
    };
    //console.log("itemsdata--->>", temporderobj);

    // api call
    $.ajax({
      url: host + path + "create_orders",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(temporderobj),

      success: function (response) {
        if (response.success === true) {
          toast("success", response.message);
          console.log("response->>>", response);
          $("#orderPlacedModal").modal("show");
          $("#usernameprint").text("Hey, " + response.data.first_name);
          let plantname = JSON.parse(localStorage.getItem("plant_id"));
          $("#orderid").text(
            "Your order id: " +
              response.data.id +
              " is placed and will be delivered from" +
              response.data.plant.plant_id +
              " - " +
              response.data.plant.storage_location_desc +
              " to " +
              plantname.plant_id +
              "-" +
              plantname.storage_location_desc
          );
          //remove localstorege cart data
          localStorage.removeItem("cart");
          cartshow();
          cartcount();
        }
      },

      error: function (xhr, status, error) {
        if (status === "error") {
          // spinner(false);
          // Handle login error
          console.log("Error: " + error);
          toast("warning", error);
        }
      },

      complete: function (xhr, status) {
        // spinner(false);
        if (!xhr.responseText) {
          toast("error", "Network error. Please try again later.");
        }
      },
    });
  }
}

function validation() {
  let valid = true;

  if (!Deliverystoredorpdown()) {
    valid = false;
  }
  if (!DeliveryTypedorpdown()) {
    valid = false;
  }
  if (!DeliveryPriority()) {
    valid = false;
  }
  if (!Qualitycheckby()) {
    valid = false;
  }
  if (!minDate()) {
    valid = false;
  }
  return valid;
}

function Deliverystoredorpdown() {
  let Deliverystoredorpdown = $("#sel2").val();
  if (Deliverystoredorpdown != 0) {
    document.getElementById("cartdropbox1").style.display = "none";
    return true;
  } else {
    document.getElementById("cartdropbox1").style.display = "block";
    return false;
  }
}

function DeliveryTypedorpdown() {
  let DeliveryTypedorpdown = $("#sel4").val();
  if (DeliveryTypedorpdown != 0) {
    document.getElementById("cartdropbox2").style.display = "none";
    return true;
  } else {
    document.getElementById("cartdropbox2").style.display = "block";
    return false;
  }
}

function DeliveryPriority() {
  let valid;
  $(".DeliveryPriority").each(function (index) {
    let dorpdownvalDel = $(this).val();
    valid = checkerrormsg(dorpdownvalDel, index, "DeliveryPriority");
  });
  return valid;
}

function Qualitycheckby() {
  let valid;
  $(".Qualitycheckby").each(function (index) {
    let dorpdownvalQua = $(this).val();
    valid = checkerrormsg(dorpdownvalQua, index, "Qualitycheckby");
  });

  return valid;
}

function minDate() {
  let valid;
  let date_val = $(".minDate").val();
  if (date_val == "") {
    valid = false;
  } else {
    valid = true;
  }
}

function checkerrormsg(dorpdownval, index, span_name) {
  let id = span_name + index;
  if (dorpdownval != 0) {
    document.getElementById(id).style.display = "none";
    return true;
  } else {
    document.getElementById(id).style.display = "block";
    return false;
  }
}

// set date forment
var today = new Date().toISOString().split("T")[0];
$(".minDate").each(function (index) {
  $("#minDate" + index).attr("min", today);
});

// on change in dropdown
$(".DeliveryPriority").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    // Remove the first option
    selectedOption.remove();
  }

  $(this).each(function (index) {
    let val = $(this).val();
    let id = $(this).attr("id");
    // console.log(val, id);
    if (val == "High") {
      $("#Delval" + id).val(3);
    } else if (val == "Medium") {
      $("#Delval" + id).val(6);
    } else if (val == "Low") {
      $("#Delval" + id).val(15);
    }
  });
});

$(".quantity").change(function () {
  $(this).each(function (index) {
    let id = $(this).attr("id");
    let price = $("#Tprice" + id).data("price");
    let quantity = $(this).val();
    if (quantity == 0) {
      $(this).val(1); // Set the value to 1
      quantity = 1; // Update the quantity variable
    }
    $("#Tprice" + id).text(price * quantity);
  });
});

$(".Qualitycheckby").change(function () {
  const selectedOption = $(this).find("option:selected");

  // Check if it is the first option with a value of 0
  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
});

$("#sel4").change(function () {
  const selectedOption = $(this).find("option:selected");

  if (selectedOption.index() === 0 && selectedOption.val() === "0") {
    selectedOption.remove();
  }
});

$("#sel3").change(function () {
  const selectedOption = $(this).find("option:selected");

  if (selectedOption.index() === 0 && selectedOption.val() === "WBS_GENERAL") {
    selectedOption.remove();
  }
});
// var isChecked;
// $("#urgent-indent").change(function () {
//   // Get the checked status of the checkbox
//   isChecked = $(this).is(":checked");
// });

//showModal("bodyContent","title","which pop name","otherMessage for id" )
$(document).on("click", ".deleteicon", function () {
  var index = $(this).attr("id");
  var objid = $(this).data("obj");
  console.log(index, objid);
  showModal(
    "Do you really want to remove?",
    "Warning",
    "s_p_delete",
    objid,
    "bg-yellow"
  );
});

function clearcart() {
  showModal(
    "Do you really want to clear the cart ?",
    "Clear Cart?",
    "clearcart",
    "",
    "bg-yellow"
  );
}

function popClose(name) {
  $("#" + name).modal("hide");
}

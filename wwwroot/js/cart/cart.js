const plantdata = JSON.parse(localStorage.getItem("plant_id"));
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
      });
      dropdown.append(optionElement);
    });
  }
}

$("#sel2").change(function () {
  selectedValue = $(this).val();
  WBS_Element_Number(selectedValue);
});

function WBS_Element_Number(no) {
  if (no != "0") {
    $.ajax({
      url: host + path + "wbs_numbers?plant_id=" + no,
      type: "GET",
      contentType: "application/json",
      success: function (response) {
        console.log(response);
        if (response.success === true) {
          var dropdown = $("#sel3");
          // Remove all existing options from the dropdown
          dropdown.empty();

          if (response.wbs_numbers.length > 0) {
            response.wbs_numbers.forEach((element) => {
              const optionElement = $("<option>", {
                value: element.id,
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
  document.getElementById("showmsg").innerHTML = "";
  const cartdata = JSON.parse(localStorage.getItem("cart"));

  if (cartdata && cartdata.length > 0) {
    cartdata.forEach((element, index) => {
      tbody(element, index + 1);
    });
  } else {
    document.getElementById("tableid").style.display = "none";
    document.getElementById("showmsg").innerHTML += `<div style="
    display: flex;
    align-content: center;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    ">Your indent is currently empty.</div> `;
  }
}
function clearcart() {
  alert("your cart remove");
  // localStorage.removeItem("cart");
  // cartshow();
}

function roundUp(num, precision) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}

function tbody(element, sr) {
  document.getElementById("tbody").innerHTML += `  
  <tr>
      <td class="vmiddle">
          <div>${sr}</div>
      </td>
      <td class="vmiddle">
          <div>${element.name}</div>
      </td>
      <td>
          <div>
              <input type="text" class="form-control" id="usr" value="${
                element.quantity
              }"required>
          </div>
      </td>
      <td class="vmiddle">
          <div>
              ₹${roundUp(element.price * element.quantity, 3)}
          </div>
      </td>
      <td>
          <div>
              <input type="date" class="form-control" id="usr" required>
          </div>
      </td>
      <td>
          <div>
              <div class="">
                  <select class="form-control" placeholder="Delivery Priority*" id="sel1">
                      <option>Delivery Priority</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                  </select>
              </div>
          </div>
      </td>
      <td>
          <div>
              <input type="text" value="test" class="form-control" required>
              <p>0 / 2</p>
          </div>
      </td>
      <td>
          <div>
              <input type="text" class="form-control" required>
              <p>0 / 20</p>
          </div>
      </td>
      <td>
          <div>
              <input type="text" class="form-control" required>
          </div>
          <p>0 / 50</p>
      </td>
      <td>
          <div>
              <textarea class="form-control" rows="1"  required></textarea>
              <p> 0 / 100</p>
          </div>
      </td>
      <td>
          <div>
              <textarea class="form-control" rows="1" " required></textarea>
              <p>0 / 50</p>
          </div>
      </td>
      <td>
          <div>
              <div class="">
                  <select class="form-control Qualitycheckby" placeholder="Quality Check By*"  required>
                      <option value="0">Quality Check By*</option>
                      <option value="User">User</option>
                      <option value="QA Team">QA Team</option>
                      <option value="stores">stores</option>
                  </select>
                <span class="error-msg" id="cartdropbox3" style="display: none;">*The QualityCheckBy field is required.</span>
              </div>
          </div>
      </td>
      <td>
          <div>
              <span><a><span class="material-symbols-rounded deleteicon">delete</span></a></span>
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
  if (validation()) {
    console.log("valid");
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
  if (!Qualitycheckby()) {
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

function Qualitycheckby() {
  let Deliverystoredorpdown = $(".Qualitycheckby").val();
  $(document).on(".Qualitycheckby", function () {});

  if (Deliverystoredorpdown != 0) {
    document.getElementById("cartdropbox3").style.display = "none";
    return true;
  } else {
    document.getElementById("cartdropbox3").style.display = "block";
    return false;
  }
}

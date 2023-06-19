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
    console.log("plant_id", locations, plant_id);

    var dropdown = $("#sel2");

    locations.forEach((element) => {
      const optionElement = $("<option>", {
        value: element.id,
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
const cartdata = JSON.parse(localStorage.getItem("cart"));
if (cartdata) {
  cartdata.forEach((element, index) => {
    tbody(element, index + 1);
  });
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
                                        }">
                                    </div>
                                </td>
                                <td class="vmiddle">
                                    <div>
                                        ₹${roundUp(
                                          element.price * element.quantity,
                                          3
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <input type="date" class="form-control" id="usr">
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
                                        <input type="text" class="form-control" id="usr">
                                        <p>0 / 2</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <input type="text" class="form-control" id="usr">
                                        <p>0 / 20</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <input type="text" class="form-control" id="usr">
                                    </div>
                                    <p>0 / 50</p>
                                </td>
                                <td>
                                    <div>
                                        <textarea class="form-control" rows="1" id="comment"></textarea>
                                        <p> 0 / 100</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <textarea class="form-control" rows="1" id="comment"></textarea>
                                        <p>0 / 50</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div class="">
                                            <select class="form-control" id="sel1">
                                                <option>User</option>
                                                <option>QA Team</option>
                                                <option>stores</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <span><a><span class="material-symbols-rounded">delete</span></a></span>
                                    </div>
                                </td>
                            </tr>
`;
}

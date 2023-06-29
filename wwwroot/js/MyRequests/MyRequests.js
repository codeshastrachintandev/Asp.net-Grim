let approval_count_api = host + path + "approval_count";
let i_orders_api = host + path + "indent/i_orders";
let pagination = 1;

function MyRequests() {
  $.ajax({
    url: approval_count_api,
    method: "POST",
    dataType: "json",
    data: {
      user_id: Logindata.user[0].id,
      role_id: Logindata.user[0].role_id,
    },
    success: function (response) {
      if (response.success === true) {
        $(".badgeall").text(response.all_count);
        $(".badgeclose").text(response.closed_count);
        $(".badgeopen").text(response.open_count);
        $(".badgepending").text(response.pending_count);
      }
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      toast("warning", "Login failed. Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}
function i_ordershow(pagination) {
  $.ajax({
    url: host + path + "indent/i_orders",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      user_id: 853,
      location_id: [],
      from_date: "2022-06-30",
      to_date: "2023-06-29",
      page: pagination,
      npp: 10,
      indent_status: [],
      role_id: 3,
      indent_type: "Pending",
    }),

    success: function (response) {
      if (response.success === true) {
        showaccordion(response);
      }
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      toast("warning", "Api failed. Please try again.");
    },
    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}
MyRequests();
i_ordershow(pagination);

//date convert
function dateconvert(date) {
  var dateObject = new Date(date);
  var day = dateObject.getDate();
  var month = dateObject.toLocaleString("default", { month: "short" });
  var year = dateObject.getFullYear();
  return day + "th " + month + " " + year;
}
//date end

function showaccordion(data) {
  paginationlist(
    data.orders.pagination.current,
    data.orders.pagination.total,
    data.orders.pagination.next,
    data.orders.pagination.perPage,
    "MyRequests"
  );
  Logindata.user[0].role_id;

  var printContainer = document.getElementById("faq");
  printContainer.innerHTML = "";
  data.orders.result.forEach((element, index) => {
    // indent_approvals
    var card_header = `
    <div class="card-header" id="faqhead1">
        <a href="#" class="btn btn-header-link collapsed"
            data-toggle="collapse" data-target="#faq${index}"
            aria-expanded="true" aria-controls="faq${index}">
            <div>
                <div class="row">
                    <div class="col-md-2 cust-border-wrap">
                        <div class="date-time-wrap">
                            <h3>${dateconvert(element.created_at)}</h3>
                            <div class="mb-4">
                                <button
                                    class="common-button common-blue-button">new</button>
                            </div>
                            <div>
                                <button
                                    class="common-button common-yellow-button">${
                                      element.delivery_type
                                    }</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <p><b>indent id :</b> <span>${element.id}</span></p>
                        <p><b> indentor name :</b> <span>${
                          element.first_name
                        }</span></p>
                        <p> <b>Store address :</b>
                            <span>${
                              element.store_address.plant_id +
                              "-" +
                              element.store_address.storage_location +
                              "-" +
                              element.store_address.name1
                            }</span>
                        </p>
                        <p><b> Delivery Address : </b> ${
                          element.address.plant_id +
                          "-" +
                          element.address.storage_location +
                          "-" +
                          element.address.name1
                        }
                        </p>
                    </div>
                    <div class="col-md-4">
                        <div class="amount-info">
                            <p><b>WBS Elementor No :</b>
                                <span>${element.WBS_NO}</span>
                            </p>
                            <p><b>Total amount:</b>
                                <span> <i> &#8377;</i> ${element.total}</span>
                            </p>
                            <p><b> Total item:</b> <span>${
                              element.total_items
                            }</span></p>
                            <p><b>total Quntity:</b> <span>${
                              element.total_quantity
                            }</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </a>
    </div>`;

    var tr = "";

    element.order_items.forEach((orders, o_index) => {
      //   $("#checkbox" + o_index + 1).attr("disabled", true);
      var v_type;
      var disabled = "";
      orders.indent_approvals.forEach((element) => {
        if (Logindata.user[0].role_id != element.role_id) {
          disabled = "disabled";
        } else {
          disabled = "";
        }
      });
      if (orders.valution_type != 0) {
        v_type = `<p class="cust-badge">
                        ${orders.valution_type}
                        </p>`;
      } else {
        v_type = "";
      }

      tr += `<tr>
                <td>
                    <div class="form-check">
                        <input type="checkbox"
                            class="form-check-input" id="checkbox${
                              o_index + 1
                            }" ${disabled}
                            value="">
                    </div>
                </td>
                <td>${o_index + 1}</td>
                <td>
                    <div>
                        <p>${
                          orders.product_sap_id + " - " + orders.product_name
                        }</p>
                        ${v_type}
                    </div>
                </td>   
                <td>${orders.base_unit}</td>
                <td>${orders.status}</td>
                <td>${orders.intial_qty}</td>
                <td>${orders.issued_qty}</td>
                <td>${orders.remaining_qty}</td>
                <td>${orders.rejected_qty}</td>
                <td>${orders.return_qty}</td>
                <td> <i> &#8377; </i> ${orders.total_price}</td>
                <td>${dateconvert(orders.delivery_date)}</td>
                <td>${orders.tracking_no}</td>
                <td>${orders.section}</td>
                <td>${orders.where_used}</td>
                <td>${orders.reason}</td>
                <td>${orders.delivery_priority}</td>
                <td>${orders.quality_check_by}</td>
                <th>
                    <div>
                        <p onclick="onepopshow(${orders.id})"> <span
                                data-toggle="modal"
                                data-target="#indent-timeline-modal">
                                <span class="material-symbols-rounded">visibility</span>
                            </span>
                            TIMELINE
                        </p>
                        <p onclick="twopopshow(${orders.id})"> <span
                                data-toggle="modal"
                                data-target="#indentApproval">
                                <span class="material-symbols-rounded">visibility</span>
                            </span>
                            Approval Flow
                        </p>
                    </div>
                </th>
            </tr>`;
    });

    var collapse = `
        <div id="faq${index}" class="collapse showx" aria-labelledby="faqhead1"
            data-parent="#faq">
            <div class="card-body">
                <div>
                    <div class="table-search">
                        <div class="search-container">
                            <form>
                                <div class="search-container-inner">
                                    <input type="text"
                                        placeholder="Search.."
                                        name="search">
                                    <button type="submit"><i
                                            class="fa fa-search"></i></button>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div id="table-scroll"
                        class="table-scroll table-scroll-wrap">
                        <table id="main-table" class="main-table">
                            <thead>
                            <tr>
                                    <th scope="col">&nbsp;</th>
                                    <th scope="col">S No</th>
                                    <th scope="col">Material Name</th>
                                    <th scope="col">Base Unit</th>
                                    <!-- <th scope="col">Stock</th> -->
                                    <th scope="col">Status</th>
                                    <th scope="col">Demand Qty</th>
                                    <th scope="col">issue Qty</th>
                                    <th scope="col">Pending Qty</th>
                                    <th scope="col">Rejected Qty
                                    <th scope="col">Return Qty</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Delivery Date</th>
                                    <th scope="col">Tracking Plant</th>
                                    <th scope="col">Where in Plant</th>
                                    <th scope="col">Reason </th>
                                    <th scope="col">Where Used</th>
                                    <th scope="col">Delivery Priority</th>
                                    <th scope="col">Quality Check By</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody id="tbody${index}${element.id}">
                                ${tr}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;

    var card = `
    <div class="card">
        ${card_header + collapse}
    </div>`;

    printContainer.innerHTML += card;
  });
}

function onepopshow(id) {
  console.log("call", id);
  //   $("#indent-timeline-modal").show();
  $.ajax({
    url: host + path + "status_history",
    method: "POST",
    dataType: "json",
    data: {
      id: id,
    },
    success: function (response) {
      if (response.success === true) {
        console.log(response);
        var one = "";
        document.getElementById("timeline").innerHTML = "";
        response.status_history.forEach((ele, index) => {
          var status = ele.status;
          var msg = ele.role;
          var Remarks = "<b>Remarks:</b> " + ele.remarks;
          if (status == "pending") {
            status = "Indent Created";
            msg = "Placed";
            Remarks = "";
          } else if (status == "PR Raised") {
            msg = "PR Requested";
            Remarks =
              `<p><b> SAP Document ID</b>` +
              ele.sap_ref_id +
              " " +
              formatted_datetime(ele.updated_at) +
              `</p>`;
          }
          document.getElementById("timeline").innerHTML += `
            <div class="timeline-container ${convertSpacesToHyphens(
              ele.color
            )}">
                <div class="timeline-icon">
                    <i class="far fa-grin-wink"></i>
                </div>
                <div class="timeline-body">
                    <h4 class="timeline-title">
                        <span class="badge">${status}</span>
                        <span class="badge">Quantity: ${ele.qty} </span>
                    </h4>
                    <p>${msg} by <b>${ele.name}</b>  At ${formatted_datetime(
            ele.created_at
          )}</p>
                    ${Remarks}
                </div>
            </div>
            `;
        });
        /* <p class="timeline-subtitle">1 Hours A   go</p> */
      }
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      toast("warning", "Login failed. Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}

function twopopshow(id) {
  console.log("call", id);
  //   $("#indentApproval").show();
  $.ajax({
    url: host + path + "approvals_details?id=" + id,
    method: "GET",
    dataType: "json",
    success: function (response) {
      if (response.success === true) {
        console.log(response);
      }
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      toast("warning", "Login failed. Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}

function formatted_datetime(input) {
  // Parse the timestamp
  var timestamp = new Date(input);

  // Convert to the desired format
  var day = timestamp.getDate();
  var month = timestamp.toLocaleString("default", { month: "short" });
  var year = timestamp.getFullYear();

  var hours = timestamp.getHours();
  var minutes = timestamp.getMinutes();
  var seconds = timestamp.getSeconds();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  var formatted_date = day + "th " + month + " " + year;
  var formatted_time = hours + ":" + minutes + ":" + seconds + " " + ampm;

  return formatted_date + ", " + formatted_time;
}

function convertSpacesToHyphens(str) {
  return str.replace(/ /g, "-");
}

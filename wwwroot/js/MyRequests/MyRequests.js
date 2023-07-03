let approval_count_api = host + path + "approval_count";
let i_orders_api = host + path + "indent/i_orders";
let pagination = 1;
var statusbtn = "Pending";
var search = "";
var tempobj;

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
      toast("warning", "failed. Please try again.");
    },

    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}

if (Logindata.user[0].id == 859) {
  statusbtn = "Open";
}

function orders(type) {
  statusbtn = type;
  spinner(true);
  i_ordershow(pagination, search);
}

$("#searchIndentNumber").on("input", function (event) {
  search = $(this).val();
  pagination = 1;
  //   console.log("searchindentnumber--->", search);
  i_ordershow(pagination, search);
});

function i_ordershow(pagination, search) {
  document.getElementById("paginationlist").innerHTML = "";
  document.getElementById("faq").innerHTML = "";

  $.ajax({
    url: host + path + "indent/i_orders",
    method: "POST",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      user_id: Logindata.user[0].id,
      location_id: [],
      from_date: currentdate(1),
      to_date: currentdate(0),
      page: pagination,
      npp: 10,
      search: search,
      indent_status: [],
      role_id: Logindata.user[0].role_id,
      indent_type: statusbtn,
    }),

    success: function (response) {
      if (response.success === true) {
        showaccordion(response);
        setTimeout(() => {
          spinner(false);
        }, 300);
      }
    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
      setTimeout(() => {
        spinner(false);
      }, 300);
      toast("warning", "Api failed. Please try again.");
    },
    complete: function (xhr, status) {
      if (status === "error" || !xhr.responseText) {
        setTimeout(() => {
          spinner(false);
        }, 300);
        toast("error", "Network error. Please try again later.");
      }
    },
  });
}
MyRequests();
spinner(true);
i_ordershow(pagination, search);

//date convert
function dateconvert(date) {
  var dateObject = new Date(date);
  var day = dateObject.getDate();
  var month = dateObject.toLocaleString("default", { month: "short" });
  var year = dateObject.getFullYear();
  return day + "th " + month + " " + year;
}

function currentdate(val) {
  // Create a new Date object
  var currentDate = new Date();

  if (val == 1) {
    // Subtract 1 year from the current date
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    // Add one day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Get the updated date components
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1; // Note: January is 0, so we add 1 to get the correct month
  var day = currentDate.getDate();

  // Format the updated date as desired (e.g., YYYY-MM-DD)
  return (
    year +
    "-" +
    month.toString().padStart(2, "0") +
    "-" +
    day.toString().padStart(2, "0")
  );
}
//date end
var obj;
function showaccordion(data) {
  paginationlist(
    data.orders.pagination.current,
    data.orders.pagination.total,
    data.orders.pagination.next,
    data.orders.pagination.perPage,
    "MyRequests"
  );
  // Logindata.user[0].role_id;

  var printContainer = document.getElementById("faq");
  tempobj = data.orders.result;
  printContainer.innerHTML = "";
  data.orders.result.forEach((element, index) => {
    var Indent_status;
    if (element.order_items.every((element) => element.status == "pending")) {
      Indent_status = "New";
    } else if (
      element.order_items.some((element) => element.remaining_qty > 0)
    ) {
      Indent_status = "Open";
    } else {
      Indent_status = "Close";
    }

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
                                    class="common-button common-blue-button">${Indent_status}</button>
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
      var v_type;
      var disabled = "";

      orders.indent_approvals.forEach((element) => {
        if (Logindata.user[0].role_id != element.role_id) {
          disabled = "disabled";
        } else {
          disabled = "";
        }
      });
      var edit;
      if (
        orders.status == "pending" &&
        Logindata.user[0].id == element.created_by
      ) {
        edit = ` <span onclick="editpopshow(${orders.id},${element.id})"
                        data-toggle="modal"
                        data-target="#indentApprovaledit">
                        <span class="material-symbols-rounded">edit</span>
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span class="redicon" onclick="deletealert(${orders.id},${element.id})">
                        <span class="material-symbols-rounded">delete</span>
                    </span>`;
      } else if (orders.status == "PR Raised") {
        edit = `
                <span 
                    data-toggle="modal"
                    data-target="#indentApproval">
                    <span class="material-symbols-rounded" style="color: green;">keyboard_return</span>
                </span>`;
      } else {
        edit = "";
      }

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
                        <p> 
                            ${edit}
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
                                    <button type="submit"><span class="material-symbols-rounded">search</span></button>
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
        $("#timelinebody").addClass("timeline");
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
        // console.log("test->>>", response);
        document.getElementById("timelinebody").innerHTML = "";
        response.approvals_details.forEach((element, index) => {
          document.getElementById("timelinebody").innerHTML += `
                <div class="timeline-container warning">
                    <div class="timeline-icon">
                        <i class="far fa-grin-wink">${index + 1}</i>
                    </div>
                    <div class="timeline-body">
                        <p>Requires approval from <b>${element.role}</b> ${
            element.approver_name
          }
                        </p>
                    </div>
                </div>        
            `;
        });
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

function editpopshow(orders_id, item_id) {
  $("#timelinebody").removeClass("timeline");
  tempobj.forEach((data) => {
    if (data.id == item_id) {
      data.order_items.forEach((orders) => {
        if (orders.id == orders_id) {
          temp = orders;
          console.log("edit->> id ", orders_id);
          console.log("edit->> id ", data);
          $("#ItemName").val(orders.product_name);
          $("#iteminput1").val(orders.intial_qty);
          $("#iteminput2").val(orders.delivery_priority);
          $("#iteminput3").val(orders.priority_days);
          $("#iteminput4").val(orders.tracking_no);
          $("#iteminput5").val(orders.section);
          $("#iteminput7").val(orders.reason);
          $("#iteminput6").val(orders.where_used);
          $("#update").click(function () {
            var temp = {
              item: {
                id: 138,
                delivery_priority: $("#iteminput2").val(),
                quantity: $("#iteminput1").val(),
                reason: $("#iteminput7").val(),
                where_used: $("#iteminput6").val(),
                section: $("#iteminput5").val(),
                tracking_no: $("#iteminput4").val(),
                priority_days: $("#iteminput3").val(),
                total_price: 259.58, ///?
                updated_at: currentgetdate(),
                first_name: Logindata.user[0].first_name,
                indentUser_id: Logindata.user[0].id,
                role_id: Logindata.user[0].role_id,
              },
            };
          });
        }
      });
    }
  });

  //   $("#indentApproval").show();
  // $.ajax({
  //   url: host + path + "approvals_details?id=" + id,
  //   method: "GET",
  //   dataType: "json",
  //   success: function (response) {
  //     if (response.success === true) {
  //       // console.log("test->>>", response);
  //       document.getElementById("timelinebody").innerHTML = "";
  //       response.approvals_details.forEach((element, index) => {
  //         document.getElementById("timelinebody").innerHTML += `
  //               <div class="timeline-container warning">
  //                   <div class="timeline-icon">
  //                       <i class="far fa-grin-wink">${index + 1}</i>
  //                   </div>
  //                   <div class="timeline-body">
  //                       <p>Requires approval from <b>${element.role}</b> ${
  //           element.approver_name
  //         }
  //                       </p>
  //                   </div>
  //               </div>
  //           `;
  //       });
  //     }
  //   },
  //   error: function (xhr, status, error) {
  //     console.log("Error: " + error);
  //     toast("warning", "Login failed. Please try again.");
  //   },

  //   complete: function (xhr, status) {
  //     if (status === "error" || !xhr.responseText) {
  //       toast("error", "Network error. Please try again later.");
  //     }
  //   },
  // });
}

function deletealert(orders_id, item_id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    var temp;
    if (result.isConfirmed) {
      tempobj.forEach((data) => {
        if (data.id == item_id) {
          data.order_items.forEach((order) => {
            if (order.id == orders_id) {
              console.log(order);
              temp = order;
            }
          });
        }
      });
      var payload = { order_id: orders_id, item: temp };
      $.ajax({
        url: host + path + "delete_indent",
        method: "delete",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(payload),
        success: function (response) {
          if (response.success === true) {
            Swal.fire("Deleted!", "Your request has been deleted.", "success");
            toast("success", "prodect deleted");
            i_ordershow(pagination, search);
            spinner(true);
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

function currentgetdate() {
  // Create a new Date object
  const currentDate = new Date();

  // Extract the components of the date and time
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // Combine the components into the desired format
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}
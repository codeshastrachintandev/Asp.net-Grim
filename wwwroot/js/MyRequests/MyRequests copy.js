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
      from_date: "2022-06-29",
      to_date: "2023-06-28",
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
  var printContainer = document.getElementById("faq");
  printContainer.innerHTML = "";
  data.orders.result.forEach((element, index) => {
    // console.log(element);
    // indent_approvals
    element.order_items.forEach((orders) => {
      console.log(orders);
      var card = `
 <div class="card">
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
    </div>

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
                            <tr>
                                <td>
                                    <div class="form-check">
                                        <input type="checkbox"
                                            class="form-check-input"
                                            value="">
                                    </div>
                                </td>
                                <td>${index + 1}</td>
                                <td>
                                    <div>
                                        <p>${
                                          orders.product_sap_id +
                                          " - " +
                                          orders.product_name
                                        }</p>
                                        <p class="cust-badge">
                                        ${orders.valution_type}
                                        </p>
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
                                        <p> <span
                                                data-toggle="modal"
                                                data-target="#indent-timeline-modal"><i
                                                    class="fa fa-eye"
                                                    aria-hidden="true"></i></span>
                                            TIMELINE
                                        </p>
                                        <p> <span
                                                data-toggle="modal"
                                                data-target="#indentApproval"><i
                                                    class="fa fa-eye"
                                                    aria-hidden="true"></i></span>
                                            Approval
                                            Flow</p>
                                    </div>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
      printContainer.innerHTML += temp;

      // $("#tbody" + index + element.id).DataTable({
      //   paging: false,
      //   ordering: false,
      //   info: false,
      // });
    });
  });
}

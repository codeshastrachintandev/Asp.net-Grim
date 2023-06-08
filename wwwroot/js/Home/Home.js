const Logindata = JSON.parse(localStorage.getItem("user_info"));
console.log("Logindata data on Home js----->", Logindata);
if (!Logindata) {
  window.location.href = "Login";
}

const arrows = document.querySelectorAll(".arrow");

arrows.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    const arrowParent = e.target.closest(".arrow").parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  });
});

// api url
const api_product = "https://172.16.1.69:3002/api/v4/products";
const Payload = {
  page: 1,
  npp: 12,
  sort_by: "alphabetically",
  search: "",
  material_group_id: [],
  material_type_id: [],
  plant: {
    id: 1586,
    plant_id: "NC08",
    plant_name: "CommonCentral General Store ",
    storage_loc: "CGEN",
    storage_location_desc: "Central Gen Stor",
    store: "X",
    created_at: "2021-09-28T07:03:12.000Z",
    updated_at: "2022-06-03T10:18:03.000Z",
  },
};
console.log(Payload);
var result;
// function homepage() {
//   fetch(api_product, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(Payload),
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       console.log("response data in Home js--------->:", response.products);
//       result = response.products.result;
//       console.log("result ->>>>>", result);
//       card(result);
//     });
// }

$.ajax({
  url: api_product,
  type: "POST",
  data: JSON.stringify(Payload),
  contentType: "application/json",
  success: function (response) {
    console.log(" Home js -> Data created successfully:", response);
    result = response.products.result;
    console.log("result ajax in Home js ->>>>>", result);
    homepage(result);
  },
  error: function (error) {
    console.error("Error creating data:", error);
  },
});

function homepage(result) {
  result.forEach((element, Index) => {
    if (element.valution_type != "") {
      var labcolor;
      if (element.valution_type == "NEW") {
        // var labcolor = "bg-yellow";
        labcolor = "bg-blue";
      } else if (element.valution_type == "REFURBISH") {
        labcolor = "bg-yellow";
      }
    }
    var body = `
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
                  <div>
                    <p><span class="stockcount">${element.stock}</span> In Stock</p>
                  </div>
                  <div>
                    <div class="wrap">
                      <button type="button"  class="sub">-</button>
                      <input class="count" type="text" value="1" min="1" max="100" />
                      <button type="button"  class="add">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
    document.getElementById("cardbody").innerHTML += body;
  });
}
$(document).ready(function () {
  $(document).on("click", ".add", function () {
    var th = $(this).closest(".wrap").find(".count");
    var st = $(".stockcount").val();
    console.log("add val---->>>>>", st);
    th.val(+th.val() + 1);
  });

  $(document).on("click", ".sub", function () {
    var th = $(this).closest(".wrap").find(".count");
    var st = $(".stockcount");
    console.log("sub val---->>>>>", st.val());
    if (th.val() > 1) th.val(+th.val() - 1);
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

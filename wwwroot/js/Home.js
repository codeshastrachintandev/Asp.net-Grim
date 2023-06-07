const Logindata = JSON.parse(localStorage.getItem("user_info"));
console.log("Logindata----->", Logindata);
if (!Logindata) {
  window.location.href = "Login";
}

document.getElementById("username").innerHTML =
  Logindata.user[0].first_name + " " + Logindata.user[0].sap_user_id;

const arrows = document.querySelectorAll(".arrow");

arrows.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    const arrowParent = e.target.closest(".arrow").parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  });
});

const sidebar = document.querySelector(".sidebar");
const sidebarBtn = document.querySelector(".bx-menu");

sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
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
function homepage() {
  fetch(api_product, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Payload),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log("response data--------->:", response.products);
      result = response.products.result;
      console.log("result->>>>>", result);
      card(result);
    });
}

homepage();

//display card data
function card(result) {
  result.forEach((element) => {
    var body = `
        <div class="card">
            <img src="${element.image_url}" class="card-img-top" alt="...">
            <div class="card-body">
              <div class="row">
                <b><div class="col-12">${element.name}</div></b>
              </div>
              <div class="row">
                <div class="col">material id:</div>
                <div class="col">${element.material_sap_id}</div>
              </div>
              <div class="row">
                <div class="col">material type: </div>
                <div class="col">${element.material_group}</div>
              </div>
              <div class="row">
                <div class="col">base unit:</div>
                <div class="col">${element.base_unit}</div>
              </div>
              <div class="row">
                <div class="col">Stock: ${element.stock}</div>
                <div class="col cart-btn-box ">
                  <button>-</button>
                  <div>0</div>
                  <button>+</button>
                </div>
              </div>
            </div>
        </div>
      `;
    // document.getElementById("cardbody").innerHTML += body;
  });
}

const button = document.querySelector("#sidebar-toggle");
const wrapper = document.querySelector("#wrapper");

button.addEventListener("click", (e) => {
  console.log("test");
  e.preventDefault();
  wrapper.classList.toggle("toggled");
});

$(document).ready(function () {
  $(".sidebar-nav li").click(function (e) {
    $(".sidebar-nav li").removeClass("active");
    $(this).addClass("active");
    //e.preventDefault();
  });
});

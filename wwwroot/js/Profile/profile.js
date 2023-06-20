var user_data = JSON.parse(localStorage.getItem("user_info"));
if (user_data) {
  getuserdata();
}
function getuserdata() {
  $.ajax({
    url: host + path + "user_details",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      user_id: user_data.user[0].id,
      role_id: user_data.user[0].role_id,
    }),
    success: function (response) {
      userdatashow(response);
    },
    error: function (error) {
      console.error("Error creating data on user_store_locations:->>", error);
    },
  });
}

function userdatashow(res) {
  $("#profile-banner1").text(
    res.user[0].sap_user_id + "-" + res.user[0].first_name
  );
  $("#profile-banner2").text(res.user[0].designation);
  $("#profile-banner3").text(res.user[0].department_name);

  $("#user-role").text(res.user[0].role);
  $("#user-mobile_no").text(res.user[0].mobile_no);
  $("#user-email").text(res.user[0].email);

  const joining_date = formatDate(res.user[0].created_at);

  $("#user-joining_date").text(joining_date);
  $("#user-sap_user_id").text(res.user[0].sap_user_id);
  $("#user-manager_id").text(
    res.user[0].manager_id + "-" + res.user[0].reporting_to
  );
  var store_loc1 = $("#store_loc1");
  res.user[0].store_plants.forEach((element) => {
    const location_wrap = `
        <div class="location-wrap">
            <div class="location-item-wrap">
                <span class="bg-green material-symbols-rounded">my_location</span>
                <span>${
                  element.plant_id +
                  "-" +
                  element.storage_location +
                  "-" +
                  element.storage_location_desc
                }</span>
            </div>
        </div>
    `;
    store_loc1.append(location_wrap);
  });

  var store_loc2 = $("#store_loc2");
  res.user[0].delivery_plants.forEach((element) => {
    const location_wrap = `
        <div class="location-wrap">
            <div class="location-item-wrap">
                <span class="bg-green material-symbols-rounded">my_location</span>
                <span>${
                  element.plant_id +
                  "-" +
                  element.storage_location +
                  "-" +
                  element.plant_name
                }</span>
            </div>
        </div>
    `;
    store_loc2.append(location_wrap);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const suffix = getDaySuffix(day);
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const formattedDate = `${day}${suffix} ${month} ${year}`;
  return formattedDate;
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  const lastDigit = day % 10;

  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

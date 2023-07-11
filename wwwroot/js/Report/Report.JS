// let obj = {
//   S_NO: "value",
//   Indent_Date: "value",
//   Indent_No: "value",
//   Indent_Status: "value",
//   Indent_Total_Quantity: "value",
//   Indent_Price: "value",
//   Indent_Location: "value",
//   Indent_Raised_By: "value",
//   Approved_By: "value",
//   dispatch_location: "value",
//   Department_Name: "value",
//   Indentre_Mail_ID: "value",
//   Indenter_Mobile_No: "value",
// };

// let newArray = [];

// for (let i = 0; i < 3; i++) {
//   let newObj = {};
//   for (let key in obj) {
//     newObj[key] = `${key}_value_${i + 1}`;
//   }
//   newArray.push(newObj);
// }

// console.log(newArray);

// var table = new DataTable('#example');
function test() {
  $.ajax({
    url: host + path + "manager/indent_report",
    method: "POST",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      user_id: 854,
      location_id: [],
      from_date: "2022-07-11",
      to_date: "2023-07-10",
      page: 1,
      npp: 10,
      indent_status: [],
    }),
    success: function (response) {
      if (response.success === true) {
        console.log("test->>>", response);
        document.getElementById("tbody").innerHTML = "";
        response.orders.order_result.forEach((element, index) => {
          let newObj = {};

          element.order_items.forEach((order_i, o_index) => {
            //   document.getElementById("tbody").innerHTML += `
            //     <td>${index}</td>
            //     <td>${formatDate(element.created_at)}</td>
            //     <td>${element.id}</td>
            //     <td>${order_i.status}</td>
            //     <td>${element.total_quantity}</td>
            //     <td>${order_i.price}</td>
            //     <td>${
            //       element.address.plant_id +
            //       "-" +
            //       element.address.storage_location +
            //       "-" +
            //       element.address.name1
            //     }</td>
            //     <td>${order_i.first_name}</td>
            //     <td>${order_i.manager_name}</td>
            //     <td>${
            //       element.store_address.plant_id +
            //       "-" +
            //       element.store_address.storage_location +
            //       "-" +
            //       element.store_address.name1
            //     }</td>
            //     <td>${element.department}</td>
            //     <td>${element.email}</td>
            //     <td>${element.mobile_no}</td>
            //  `;
            newObj = {
              S_NO: index,
              Indent_Date: formatDate(element.created_at),
              Indent_No: element.id,
              Indent_Status: order_i.status,
              Indent_Total_Quantity: element.total_quantity,
              Indent_Price: order_i.price,
              Indent_Location:
                element.address.plant_id +
                "-" +
                element.address.storage_location +
                "-" +
                element.address.name1,
              Indent_Raised_By: order_i.first_name,
              Approved_By: order_i.manager_name,
              dispatch_location:
                element.store_address.plant_id +
                "-" +
                element.store_address.storage_location +
                "-" +
                element.store_address.name1,
              Department_Name: element.department,
              Indentre_Mail_ID: element.email,
              Indenter_Mobile_No: element.mobile_no,
            };
          });

          newArray.push(newObj);
        });
      }
      setTimeout(function () {}, 2500);
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
test();

// function calltest() {
//   $("#example").DataTable({
//     processing: true,
//     serverSide: true,
//     ajax: {
//       url: host + path + "manager/indent_report", // Replace with your API endpoint URL
//       type: "POST",
//       dataType: "application/json;charset=UTF-8",
//       data: function (d) {
//         // You can add additional parameters to the request here
//        return JSON.stringify({
//           user_id: 854,
//           location_id: [],
//           from_date: "2022-07-11",
//           to_date: "2023-07-10",
//           page: 1,
//           npp: 10,
//           indent_status: []
//         });
//       },
//       dataSrc: function (response) {
//         console.log(response);
//         // Handle the response data and format it for DataTables
//         if (response.error) {
//           // Show error message
//           alert(response.error);
//           return [];
//         } else {
//           return response.data; // Assuming your API returns an array of objects with data
//         }
//       },
//       error: function (xhr, error, thrown) {
//         // Handle AJAX error
//         alert("Error: " + error);
//       },
//     },
//     columns: [{ data: "name" }, { data: "age" }, { data: "city" }],
//   });
// }
// calltest();

function formatDate(dateString) {
  const date = new Date(dateString);

  // Format the date
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Format the time
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  // Add suffix to the day
  const day = date.getDate();
  const suffix = getDaySuffix(day);
  const formattedDay = day + suffix;

  // Combine the formatted components
  const formattedDateTime = `${formattedDay} ${formattedDate}, ${formattedTime}`;

  return formattedDateTime;
}

// Function to get the day suffix (e.g., 1st, 2nd, 3rd, 4th)
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

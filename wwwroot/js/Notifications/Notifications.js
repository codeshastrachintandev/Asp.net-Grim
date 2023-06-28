$.ajax({
  url: notification_Api,
  type: "POST",
  contentType: "application/json",
  data: JSON.stringify(notification_Payload),
  success: function (response) {
    if (response.success === true) {
      // console.log("notification_logs js ->Get successfully:", response);
      document.getElementById("Notificationsfullbody").innerHTML = "";
      document.getElementById("notifications_no").innerHTML =
        response.notification_logs.length;
      var timestamps = [];
      response.notification_logs.forEach((element) => {
        // console.log(element.created_at);
        var inputTimestamp = new Date(element.created_at);

        var formattedTime = getTimeAgo(inputTimestamp);
        //date get only in hour and day i have isues in mins
        // console.log(formattedTime);

        document.getElementById("Notificationsfullbody").innerHTML += `
            <div class="col-md-6">
                <div class="notification-wrap">
                    <div class="notification-inner">
                        <div class="user-img"><img src="https://172.16.1.69/img/profile.28fb3626.jpg"></div>
                        <div class="user-info">
                            <h3>${element.message}</h3>
                            <p>(${element.product_id + "-" + element.name})</p>
                            <p>${formattedTime}</p>
                        </div>
                    </div>
                </div>
            </div>`;
      });
    }
  },
  error: function (xhr, status, error) {
    if (status === "error") {
      spinner(false);
      console.log("Error: " + error);
      toastlogin("warning", error);
    }
  },
  error: function (error) {
    toastlogin("error", error);
    toastlogin("error", "Network error. Please try again later.");
    console.error("Error creating data on user_store_locations:->>", error);
  },
});

function getTimeAgo(timestamp) {
  var currentTime = new Date();
  var timeDifference = Math.floor((currentTime - timestamp) / 1000); // Time difference in seconds

  var hours = Math.floor(timeDifference / 3600); // Convert seconds to hours
  var minutes = Math.floor(timeDifference / 60); // Convert seconds to minutes
  var days = Math.floor(hours / 24); // Convert hours to days

  if (days >= 1) {
    if (days === 1) {
      return "1 day ago";
    } else {
      return days + " days ago";
    }
  } else if (hours >= 1) {
    if (hours === 1) {
      return "1 hour ago";
    } else {
      return hours + " hours ago";
    }
  } else if (minutes >= 1) {
    if (minutes === 1) {
      return "1 minute ago";
    } else {
      return minutes + " minutes ago";
    }
  } else {
    return "Just now";
  }
}

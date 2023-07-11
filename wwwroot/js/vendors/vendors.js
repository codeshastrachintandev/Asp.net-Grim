// function checkvendor() {
//   document.getElementById("Error-show").style.display = "none";
//   var name = document.forms["My_Form"]["name"].value;
//   var contactname = document.forms["My_Form"]["contactname"].value;
//   var phone = document.forms["My_Form"]["phone"].value;
//   var address = document.forms["My_Form"]["address"].value;
//   var remark = document.forms["My_Form"]["remark"].value;

//   // Perform client-side validation (optional)

//   if (name == null || name == "") {
//     document.getElementById("Error-show").style.display = "block";
//     document.getElementById("error-msg1").innerHTML = "Please enter name";
//   }
//   if (contactname == null || contactname == "") {
//     document.getElementById("Error-show").style.display = "block";
//     document.getElementById("error-msg2").innerHTML =
//       "Please enter contactname";
//   }
//   if (phone == null || phone == "") {
//     document.getElementById("Error-show").style.display = "block";
//     document.getElementById("error-msg3").innerHTML = "Please enter phone";
//   }
//   if (address == null || address == "") {
//     document.getElementById("Error-show").style.display = "block";
//     document.getElementById("error-msg4").innerHTML = "Please enter address";
//   }
//   if (remark == null || remark == "") {
//     document.getElementById("Error-show").style.display = "block";
//     document.getElementById("error-msg5").innerHTML = "Please enter remark";
//   }
//   return false;
// }

function checkvendor() {
  var isValid = true;

  // Clear previous error styles and messages
  $(".error-msg").hide();
  $("errmsg").removeClass("error");

  // Validate Vendor Name
  var vendorName = $("input[name='name']").val();
  if (vendorName.trim() === "") {
    $(".error-msg1").addClass("error");
    $(".error-msg1").text("Vendor Name is required.").show();
    isValid = false;
  } else if (vendorName.trim().length < 2) {
    $(".error-msg1").text("Vendor Name must be at least 2 characters.").show();
    $(".error-msg1").addClass("error");
    isValid = false;
  } else {
    $(".error-msg1").removeClass("error");
    $(".error-msg1").css("display", "none");
  }

  // Validate Contact Name
  var contactName = $("input[name='contactname']").val();
  if (contactName.trim() === "") {
    $(".error-msg2").text("Contact Name is required.").show();
    $(".error-msg2").addClass("error");
    isValid = false;
  } else if (contactName.trim().length < 2) {
    $(".error-msg2").text("Contact Name must be at least 2 characters.").show();
    $(".error-msg2").addClass("error");
    isValid = false;
  } else {
    $(".error-msg2").removeClass("error");
    $(".error-msg2").css("display", "none");
  }

  // Validate Mobile Number
  var phoneNumber = $("input[name='phone']").val();
  if (phoneNumber.trim() === "") {
    $(".error-msg3").text("Mobile Number is required.").show();
    $(".error-msg3").addClass("error");
    isValid = false;
  } else if (!/^\d+$/.test(phoneNumber)) {
    $(".error-msg3").text("Mobile Number should only contain numbers.").show();
    $(".error-msg3").addClass("error");
    isValid = false;
  } else if (phoneNumber.length !== 10) {
    $(".error-msg3").text("Mobile Number must be 10 digits.").show();
    $(".error-msg3").addClass("error");
    isValid = false;
  } else {
    $(".error-msg3").removeClass("error");
    $(".error-msg3").css("display", "none");
  }

  // Validate Address
  var address = $("textarea[name='address']").val();
  if (address.trim() === "") {
    $(".error-msg4").text("Address is required.").show();
    $(".error-msg4").addClass("error");
    isValid = false;
  } else if (address.trim() === vendorName.trim()) {
    $(".error-msg4")
      .text("Address should be different from Vendor Name.")
      .show();
    $(".error-msg4").addClass("error");
    isValid = false;
  } else {
    $(".error-msg4").removeClass("error");
    $(".error-msg4").css("display", "none");
  }

  // Validate Remark (optional)
  var remark = $("textarea[name='remark']").val();

  // Return validation result
  return isValid;
}

$(document).ready(function () {
  $("#submit-form").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission

    var isValid = checkvendor(); // Perform form validation

    if (isValid) {
      var formData = $(this).serialize(); // Serialize the form data
      var params = {};
      queryString.split("&").forEach(function (param) {
        var parts = param.split("=");
        var key = decodeURIComponent(parts[0]);
        var value = decodeURIComponent(parts[1]);
        params[key] = value;
      });

      // Extract the values of the form fields
      var name = params["name"];
      var contactName = params["contactname"];
      var phone = params["phone"];
      var address = params["address"];
      var remark = params["remark"];
      console.log(formData);
      $.ajax({
        url: host + path + "", // Replace with the URL to submit the form data
        type: "POST",
        data: JSON.stringify({
          user_id: Logindata.user[0].id,
          name: name,
          vendor_name: contactName,
          mobile_no: phone,
          address: address,
          remarks: remark,
          is_verified: "0",
          created_by: Logindata.user[0].id,
        }),
        success: function (response) {
          // Handle the success response here
          console.log("Form submitted successfully!");
          toast("success", "successfully");
          // You can also display a success message to the user
        },
        error: function (xhr, status, error) {
          // Handle the error response here
          console.error("Form submission failed: " + error);
          toast("error", error);
          // You can display an error message to the user if needed
        },
      });
    }
  });
});

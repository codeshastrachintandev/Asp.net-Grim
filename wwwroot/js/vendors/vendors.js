function checkvendor() {
  document.getElementById("Error-show").style.display = "none";
  var name = document.forms["My_Form"]["name"].value;
  var contactname = document.forms["My_Form"]["contactname"].value;
  var phone = document.forms["My_Form"]["phone"].value;
  var address = document.forms["My_Form"]["address"].value;
  var remark = document.forms["My_Form"]["remark"].value;

  // Perform client-side validation (optional)

  if (name == null || name == "") {
    document.getElementById("Error-show").style.display = "block";
    document.getElementById("error-msg1").innerHTML = "Please enter name";
  }
  if (contactname == null || contactname == "") {
    document.getElementById("Error-show").style.display = "block";
    document.getElementById("error-msg2").innerHTML =
      "Please enter contactname";
  }
  if (phone == null || phone == "") {
    document.getElementById("Error-show").style.display = "block";
    document.getElementById("error-msg3").innerHTML = "Please enter phone";
  }
  if (address == null || address == "") {
    document.getElementById("Error-show").style.display = "block";
    document.getElementById("error-msg4").innerHTML = "Please enter address";
  }
  if (remark == null || remark == "") {
    document.getElementById("Error-show").style.display = "block";
    document.getElementById("error-msg5").innerHTML = "Please enter remark";
  }
}

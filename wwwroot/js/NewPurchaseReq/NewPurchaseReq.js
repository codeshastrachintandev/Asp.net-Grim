$(document).ready(function () {
  // Add event listener to form submission
  $("form").submit(function (event) {
    // Prevent form submission
    event.preventDefault();

    // Perform validation
    var isValid = true;

    $("input, select, textarea", this).each(function () {
      if ($(this).val().trim() === "") {
        $(this).addClass("error");
        isValid = false;
      } else {
        $(this).removeClass("error");
      }

      if ($(this).is("select") && $(this).val() === "0") {
        $(this).addClass("error");
        isValid = false;
      }
    });

    // If any field is empty or has a select value of 0, stop form submission
    if (!isValid) {
      return;
    }

    // If all validation passes, submit the form
    this.submit();
  });
});

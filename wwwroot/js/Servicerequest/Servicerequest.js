// Add form validation logic here
function checkServicerequst() {
  // Perform your validation checks here
  var isValid = true;

  // Validate Acct PR Type Service
  var PRTypeService = $("#PRTypeService").val();
  if (PRTypeService === "") {
    $("#error1").addClass("error");
    isValid = false;
  } else {
    $("#error1").removeClass("error");
  }

  // Validate Acct Item category D-Service
  var ItemcategoryD_Service = $("#ItemcategoryD-Service").val();
  if (ItemcategoryD_Service === "") {
    $("#error2").addClass("error");
    isValid = false;
  } else {
    $("#error2").removeClass("error");
  }

  // Validate Acct Assignment Cart
  var acctAssignment = $("#acctAssignment").val();
  if (acctAssignment === "") {
    $("#error3").addClass("error");
    isValid = false;
  } else {
    $("#error3").removeClass("error");
  }

  // Validate Search Plant
  var searchPlant = $("#searchPlant").val();
  if (searchPlant === "") {
    $("#error4").addClass("error");
    isValid = false;
  } else {
    $("#error4").removeClass("error");
  }

  // Validate Service Group
  var serviceGroup = $("#serviceGroup").val();
  if (serviceGroup === "") {
    $("#error5").addClass("error");
    isValid = false;
  } else {
    $("#error5").removeClass("error");
  }

  // Validate Quantity
  var Quantity = $("#Quantity").val();
  if (Quantity === "") {
    $("#error7").addClass("error");
    isValid = false;
  } else {
    $("#error7").removeClass("error");
  }

  // Validate UOM
  //   var uom = $("#uom").val();
  //   if (uom === "") {
  //     $("#uom").addClass("error");
  //     isValid = false;
  //   } else {
  //     $("#uom").removeClass("error");
  //   }

  // Validate G/L Account
  //   var glAccount = $("#glAccount").val();
  //   if (glAccount === "") {
  //     $("#glAccount").addClass("error");
  //     isValid = false;
  //   } else {
  //     $("#glAccount").removeClass("error");
  //   }

  // Validate Cost Center
  var costCenter = $("#costCenter").val();
  if (costCenter === "") {
    $("#error11").addClass("error");
    isValid = false;
  } else {
    $("#error11").removeClass("error");
  }

  // Validate Purchase Group
  //   var purchaseGroup = $("#purchaseGroup").val();
  //   if (purchaseGroup === "") {
  //     $("#purchaseGroup").addClass("error");
  //     isValid = false;
  //   } else {
  //     $("#purchaseGroup").removeClass("error");
  //   }

  // Validate Purchase Organization
  var purchaseOrg = $("#purchaseOrg").val();
  if (purchaseOrg === "") {
    $("#error13").addClass("error");
    isValid = false;
  } else {
    $("#error13").removeClass("error");
  }
  // Validate Short Text
  var ShortText = $("#ShortText").val();
  if (ShortText === "") {
    $("#error14").addClass("error");
    isValid = false;
  } else {
    $("#error14").removeClass("error");
  }
  // Validate Reason
  var Reason = $("#Reason").val();
  if (Reason === "") {
    $("#error15").addClass("error");
    isValid = false;
  } else {
    $("#error15").removeClass("error");
  }
  return isValid;
  // If all validation checks pass, submit the form
}

$(document).ready(function () {
  $("#submit-form").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission
    var isValid = checkServicerequst();
    console.log(isValid);
    if (isValid) {
      alert("VLAID", isValid);

      // $.ajax({
      //   url: host + path + "", // Replace with the URL to submit the form data
      //   type: "POST",
      //   data: formData,
      //   success: function (response) {
      //     // Handle the success response here
      //     console.log("Form submitted successfully!");
      //     toast("success", "successfully");
      //     // You can also display a success message to the user
      //   },
      //   error: function (xhr, status, error) {
      //     // Handle the error response here
      //     console.error("Form submission failed: " + error);
      //     toast("error", error);
      //     // You can display an error message to the user if needed
      //   },
      // });
    }
  });
});

// img drag and drop

const INPUT_FILE = document.querySelector("#upload-files");
const INPUT_CONTAINER = document.querySelector("#upload-container");
const FILES_LIST_CONTAINER = document.querySelector("#files-list-container");
const FILE_LIST = [];
let UPLOADED_FILES = [];

const multipleEvents = (element, eventNames, listener) => {
  const events = eventNames.split(" ");

  events.forEach((event) => {
    element.addEventListener(event, listener, false);
  });
};

const previewImages = () => {
  FILES_LIST_CONTAINER.innerHTML = "";
  if (FILE_LIST.length > 0) {
    FILE_LIST.forEach((addedFile, index) => {
      const content = `
        <div class="form__image-container js-remove-image" data-index="${index}">
          <img class="form__image" src="${addedFile.url}" alt="${addedFile.name}">
        </div>
      `;

      FILES_LIST_CONTAINER.insertAdjacentHTML("beforeEnd", content);
    });
  } else {
    console.log("empty");
    INPUT_FILE.value = "";
  }
};

const fileUpload = () => {
  if (FILES_LIST_CONTAINER) {
    multipleEvents(INPUT_FILE, "click dragstart dragover", () => {
      INPUT_CONTAINER.classList.add("active");
    });

    multipleEvents(INPUT_FILE, "dragleave dragend drop change blur", () => {
      INPUT_CONTAINER.classList.remove("active");
    });

    INPUT_FILE.addEventListener("change", () => {
      const files = [...INPUT_FILE.files];
      console.log("changed");
      files.forEach((file) => {
        const fileURL = URL.createObjectURL(file);
        const fileName = file.name;
        if (!file.type.match("image/")) {
          alert(file.name + " is not an image");
          console.log(file.type);
        } else {
          const uploadedFiles = {
            name: fileName,
            url: fileURL,
          };

          FILE_LIST.push(uploadedFiles);
        }
      });

      console.log("FILE_LIST->>", FILE_LIST); //final list of uploaded files
      previewImages();
      UPLOADED_FILES = document.querySelectorAll(".js-remove-image");
      removeFile();
    });
  }
};

const removeFile = () => {
  UPLOADED_FILES = document.querySelectorAll(".js-remove-image");

  if (UPLOADED_FILES) {
    UPLOADED_FILES.forEach((image) => {
      image.addEventListener("click", function () {
        const fileIndex = this.getAttribute("data-index");

        FILE_LIST.splice(fileIndex, 1);
        previewImages();
        removeFile();
      });
    });
  } else {
    [...INPUT_FILE.files] = [];
  }
};

fileUpload();
removeFile();

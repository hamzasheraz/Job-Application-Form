document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("jobApplicationForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      if (validateForm()) {
        processFormData();
      }
    });

  document
    .getElementById("viewApplicationsBtn")
    .addEventListener("click", function () {
      viewApplicationsAsTable();
    });
});

function validateForm() {
  var form = document.getElementById("jobApplicationForm");
  var isValid = true;

  var emailInput = document.getElementById("email");
  var emailError = document.getElementById("emailError");
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (!isValid) return false;

  var phoneNumberInput = document.getElementById("phoneNumber");
  var phoneNumberError = document.getElementById("phoneNumberError");
  var phoneNumberPattern = /^\d{10}$/;
  if (!phoneNumberPattern.test(phoneNumberInput.value)) {
    phoneNumberError.textContent =
      "Please enter a valid phone number (11 digits).";
    isValid = false;
  } else {
    phoneNumberError.textContent = "";
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    isValid = false;
  }

  return isValid;
}

function processFormData() {
  var formData = new FormData(document.getElementById("jobApplicationForm"));
  var applicationsTableBody = document.querySelector(
    "#applicationsTable tbody"
  );

  var row = document.createElement("tr");
  var resumeFileName = document.getElementById("resume").files[0].name;
  row.innerHTML = `
      <td>${formData.get("firstName")} ${formData.get("lastName")}</td>
      <td>${formData.get("email")}</td>
      <td>${formData.get("phoneNumber")}</td>
      <td>${resumeFileName}</td> <!-- Displaying filename -->
      <td>${formData.get("coverLetter")}</td>
    `;
  applicationsTableBody.appendChild(row);

  var applicantData = {};
  for (var [key, value] of formData.entries()) {
    applicantData[key] = value;
  }
  console.log("Submitted Application Data:", applicantData);
}

function viewApplicationsAsTable() {
  var applicationsTableContainer = document.getElementById(
    "applicationsTableContainer"
  );
  var applicationsTableBody = document.querySelector(
    "#applicationsTable tbody"
  );
  applicationsTableBody.innerHTML = "";

  applicationsTableContainer.style.display = "block";
}

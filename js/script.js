document.addEventListener("DOMContentLoaded", function () {
  // Static data
  var staticPatientName = "Patient Name";
  var staticSymptoms = "Static Symptoms";
  var staticMedications = "Static Medications";
  var staticStatus = "Static Status: Excellent"; // You can customize the status as needed

  // Create a record element for the static data
  var staticRecordElement = document.createElement("div");
  staticRecordElement.className = "record";
  staticRecordElement.innerHTML = `
    <div class="record-header">
        <h5 class="record-date">[Static Date]</h5>
        <div class="icons">
          <button id="edit" class="btn btn-secondary"><i class="fa-solid fa-pen-to-square"></i></button>
          <button id="close" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div>
    <div class="record-body">
        <h4 class="record-section-title">Patient: ${staticPatientName}</h4>
        <h4 class="record-section-title">Symptoms</h4>
        <ul class="record-list">
            <li>${staticSymptoms}</li>
        </ul>
        <h4 class="record-section-title">Medications</h4>
        <ul class="record-list">
            <li>${staticMedications}</li>
        </ul>
    </div>
    <div class="record-footer">
        <h4 class="record-status">${staticStatus}</h4>
    </div>
`;

  // Append the static record to the record container
  document.querySelector(".record-container").appendChild(staticRecordElement);

  // Event listener for adding dynamic records
  document.getElementById("add-record-btn").addEventListener("click", function (event) {
    event.preventDefault();

    function isInvalidInput(input) {
      const pattern = /^\s*$/;
      return pattern.test(input);
    }

    // Get values from the form
    var patientName = document.getElementById("PatientNameInput").value;
    var symptoms = document.getElementById("SymptomsInput").value;
    var medications = document.getElementById("MedicationsInput").value;
    var currentDate = new Date().toLocaleDateString();

    if (isInvalidInput(patientName) === true || isInvalidInput(symptoms) == true || isInvalidInput(medications) == true) {
      messageModal("Invalid input: Please enter a non-empty value.");
    } else {
      // Create a new record element with the entered details
      var recordElement = document.createElement("div");
      recordElement.className = "record";
      var recordId = Date.now();
      recordElement.setAttribute("data-record-id", recordId);
      recordElement.innerHTML = `
        <div class="record-header">
            <h5 class="record-date">${currentDate}</h5>
            <div class="icons">
              <button id="edit" class="btn btn-secondary"><i class="fa-solid fa-pen-to-square"></i></button>
              <button id="close" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        <div class="record-body">
            <h4 class="record-section-title">Patient:<span>${patientName}</span> </h4>
            <h4 class="record-section-title">Symptoms</h4>
            <ul class="record-list">
                <li>${symptoms}</li>
            </ul>
            <h4 class="record-section-title">Medications</h4>
            <ul class="record-list">
                <li>${medications}</li>
            </ul>
        </div>
        <div class="record-footer">
            <h4 class="record-status">Status: Poor</h4>
        </div>
    `;
    }
    // Append the new record to the record container
    document.querySelector(".record-container").appendChild(recordElement);

    const closeButton = recordElement.querySelector("#close");
    const confirmModal = document.getElementById("confirmationModal");

    // Function to open confirm modal
    function openConfirmModal() {
      return new Promise((resolve, reject) => {
        document.getElementById("confirmDelete").addEventListener("click", function () {
          confirmModal.style.display = "none";
          resolve(true);
        });
        document.getElementById("cancelDelete").addEventListener("click", function () {
          confirmModal.style.display = "none";
          resolve(false);
        });
      });
    }

    closeButton.addEventListener("click", async function () {
      confirmModal.style.display = "flex";
      const result = await openConfirmModal();
      console.log(result);
      if (result) {
        const recordId = recordElement.getAttribute("data-record-id");
        // Find the record element with the matching identifier and remove it
        const recordToDelete = document.querySelector(`[data-record-id="${recordId}"]`);
        if (recordToDelete) {
          document.querySelector(".record-container").removeChild(recordToDelete);
        }
      }
    });

    // modal for any message
    function messageModal(message) {
      const modal = document.getElementById("messageModal");
      modal.style.display = "flex";

      const messageElement = document.getElementById("messageModalText");
      messageElement.textContent = message;

      document.getElementById("acknowledgmentBtn").addEventListener("click", function () {
        modal.style.display = "none";
      });
    }

    function enterEditMode(recordElement) {
      // Get the elements that need to be edited
      const patientNameElement = recordElement.querySelector(".record-section-title span");
      const symptomsElement = recordElement.querySelector(".record-list li");
      const medicationsElement = recordElement.querySelectorAll(".record-list li")[1];

      // Create input fields and populate them with the current values
      const patientNameInput = document.createElement("input");
      patientNameInput.classList.add("form-control");
      patientNameInput.value = patientNameElement.textContent;

      const symptomsInput = document.createElement("input");
      symptomsInput.classList.add("form-control");
      symptomsInput.value = symptomsElement.textContent;

      const medicationsInput = document.createElement("input");
      medicationsInput.classList.add("form-control");
      medicationsInput.value = medicationsElement.textContent;

      // Replace the content with input fields
      patientNameElement.innerHTML = "";
      patientNameElement.appendChild(patientNameInput);

      symptomsElement.innerHTML = "";
      symptomsElement.appendChild(symptomsInput);

      medicationsElement.innerHTML = "";
      medicationsElement.appendChild(medicationsInput);
    }

    function saveChanges(recordElement) {
      const patientNameInput = recordElement.querySelector(".record-section-title span input");
      const symptomsInput = recordElement.querySelector(".record-list li input");
      const medicationsInput = recordElement.querySelectorAll(".record-list li input")[1];

      const patientNameElement = recordElement.querySelector(".record-section-title span");
      const symptomsElement = recordElement.querySelector(".record-list li");
      const medicationsElement = recordElement.querySelectorAll(".record-list li")[1];

      //To check if any of the field is empty
      if (isInvalidInput(patientNameInput.value) === true || isInvalidInput(symptomsInput.value) == true || isInvalidInput(medicationsInput.value) == true) {
        messageModal("Invalid input: Please enter a non-empty value.");
      } else {
        // Update the content with the new values
        patientNameElement.innerHTML = patientNameInput.value;
        symptomsElement.innerHTML = symptomsInput.value;
        medicationsElement.innerHTML = medicationsInput.value;
        editButton.style.display = "block";
        saveButton.style.display = "none";
      }
    }

    const editButton = recordElement.querySelector("#edit");
    const saveButton = document.createElement("button");
    saveButton.classList.add("btn", "text-light", "btn-large", "btn-block", "savebtn");
    saveButton.style.display = "none";

    editButton.addEventListener("click", function () {
      editButton.style.display = "none";
      saveButton.style.display = "block";
      enterEditMode(recordElement);
    });

    saveButton.textContent = "Save";
    recordElement.appendChild(saveButton);
    saveButton.addEventListener("click", function () {
      saveChanges(recordElement);
    });

    // Clear the form fields after adding the record
    document.getElementById("PatientNameInput").value = "";
    document.getElementById("SymptomsInput").value = "";
    document.getElementById("MedicationsInput").value = "";
  });
});

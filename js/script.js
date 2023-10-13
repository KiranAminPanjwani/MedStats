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
        <button id="edit">✏️</button>
        <button id="close"><img src="./trash-alt-icon-462x512-xs5e5fm6.png" alt="dustbin"></button>
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

    if (isInvalidInput(patientName) === "true" || isInvalidInput(symptoms) == true || isInvalidInput(medications) == true) {
      alert("Invalid input: Please enter a non-empty value.");
    }
    else {
      // Create a new record element with the entered details
      var recordElement = document.createElement("div");
      recordElement.className = "record";
      var recordId = Date.now();
      recordElement.setAttribute("data-record-id", recordId); 
      recordElement.innerHTML = `
        <div class="record-header">
            <h5 class="record-date">${currentDate}</h5>
        <div class="icons">
          <button id="edit">✏️</button>
          <button id="close"><img src="./trash-alt-icon-462x512-xs5e5fm6.png" alt="dustbin"></button>
        </div>
        </div>
        <div class="record-body">
            <h4 class="record-section-title">Patient: ${patientName}</h4>
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

     const closeButton = recordElement.querySelector("#close");
  closeButton.addEventListener("click", function () {
    // Get the unique record identifier associated with the button
    const recordId = recordElement.getAttribute("data-record-id");
    // Find the record element with the matching identifier and remove it
    const recordToDelete = document.querySelector(`[data-record-id="${recordId}"]`);
    if (recordToDelete) {
      document.querySelector(".record-container").removeChild(recordToDelete);
    }
  });

    // Append the new record to the record container
    document.querySelector(".record-container").appendChild(recordElement);

    // Clear the form fields after adding the record
    document.getElementById("PatientNameInput").value = "";
    document.getElementById("SymptomsInput").value = "";
    document.getElementById("MedicationsInput").value = "";
  });
});

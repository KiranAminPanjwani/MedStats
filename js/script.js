document.addEventListener("DOMContentLoaded", function () {
  /** ---- Selectors ---- */

  /** ---- Variables ---- */
  let recordObj = [];
  const RECORDOBJ_KEY = "MyRecords";

  /** ---- FUNCTIONS ---- */
  const isInvalidInput = (input) => {
    const pattern = /^\s*$/;
    return pattern.test(input);
  };

  const drawRecord = (record) => {
    // Create a new record element with the entered details
    var recordElement = document.createElement("div");
    recordElement.className = "record";
    var recordId = record.id;
    recordElement.setAttribute("data-record-id", recordId);
    recordElement.innerHTML = `
      <div class="record-header">
          <h5 class="record-date">${record.currentDate}</h5>
      <div class="icons">
        <button class="edit btn btn-secondary">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="save btn btn-secondary" style="display:none;">
          <i class="fa-solid fa-floppy-disk"></i>
        </button>
        <button class="delete btn btn-danger">
          <i class="fa-solid fa-trash"></i>
        </button>
        </div>
      </div>
      <div class="record-body">
          <h4 class="record-section-title">Patient:<span>${record.patientName}</span> </h4>
          <h4 class="record-section-title">Symptoms</h4>
          <ul class="record-list">
              <li>${record.symptoms}</li>
          </ul>
          <h4 class="record-section-title">Medications</h4>
          <ul class="record-list">
              <li>${record.medications}</li>
          </ul>
      </div>
      <div class="record-footer">
          <h4 class="record-status">Status: Poor</h4>
      </div>
  `;
  recordElement.querySelector(".edit").addEventListener("click", enterEditMode);
  recordElement.querySelector(".delete").addEventListener("click", deleteRecord);
  recordElement.querySelector(".save").addEventListener("click", saveEditedRecord);
    // Append the new record to the record container
    document.querySelector(".record-container").appendChild(recordElement);
  };

   // Function to open confirm modal
   function openConfirmModal(){
    const confirmModal = document.getElementById('confirmationModal');
    return new Promise((resolve, reject) => {
      document.getElementById('confirmDelete').addEventListener('click', function(){         
        confirmModal.style.display= 'none';
        resolve(true);
      });
      document.getElementById('cancelDelete').addEventListener('click', function(){
        confirmModal.style.display= 'none';
        resolve(false);
      });
    });
  }

    // modal for any message
    function messageModal(message){
      const modal =  document.getElementById('messageModal')
      modal.style.display = "flex";

      const messageElement = document.getElementById('messageModalText')
      messageElement.textContent = message;
      
      document.getElementById('acknowledgmentBtn').addEventListener('click',function(){
        modal.style.display = "none";
      });
    }

  const deleteRecord = async(event) => {
    console.log('a');
    const confirmModal = document.getElementById('confirmationModal');
    confirmModal.style.display= 'flex';
    const result = await openConfirmModal();

    if(result){
    /** 1.Delete from the screen */
    var recordElement = event.target.closest(".record");
    // Get the unique record identifier associated with the button
    const recordId = recordElement.getAttribute("data-record-id");
    // Find the record element with the matching identifier and remove it
    const recordToDelete = document.querySelector(
      `[data-record-id="${recordId}"]`
    );
    if (recordToDelete) {
      document.querySelector(".record-container").removeChild(recordToDelete);
    }

    /** 2.Delete from the localstorage */
    recordObj = recordObj.filter(
      (item) =>
        item.id !== parseInt(recordElement.getAttribute("data-record-id"))
    );
    localStorage.setItem(RECORDOBJ_KEY, JSON.stringify(recordObj));
    };
  }
  const saveNewRecord = (record) => {
    // Save new record to browser's local storage
    recordObj.push(record);
    localStorage.setItem(RECORDOBJ_KEY, JSON.stringify(recordObj));
  };

  const saveChanges = (recordElement) => {
    const patientNameInput = recordElement.querySelector(".record-section-title span input");
    const symptomsInput = recordElement.querySelector(".record-list li input");
    const medicationsInput = recordElement.querySelectorAll(".record-list li input")[1];

    const patientNameElement = recordElement.querySelector(".record-section-title span");
    const symptomsElement = recordElement.querySelector(".record-list li");
    const medicationsElement = recordElement.querySelectorAll(".record-list li")[1];

    //To check if any of the field is empty
    if (
      isInvalidInput(patientNameInput.value) === true ||
      isInvalidInput(symptomsInput.value) == true
    ) {
      messageModal("Invalid input: Please enter a non-empty value.");
    } else {
      // Update the content with the new values
      patientNameElement.innerHTML = patientNameInput.value;
      symptomsElement.innerHTML = symptomsInput.value;
      medicationsElement.innerHTML = medicationsInput.value;
  
    }
  };

  const saveEditedRecord = (event) => {
    var recordElement = event.target.closest(".record");
    var recordId = recordElement.getAttribute("data-record-id");

    /** 1.Edit from the screen */
    const patientNameInput = recordElement.querySelector(".record-section-title span input");
    const symptomsInput = recordElement.querySelector(".record-list li input");
    const medicationsInput = recordElement.querySelectorAll(".record-list li input")[1];
    const patientNameElement = recordElement.querySelector(".record-section-title span");
    const symptomsElement = recordElement.querySelector(".record-list li");
    const medicationsElement = recordElement.querySelectorAll(".record-list li")[1];


    //To check if any of the field is empty
    if (
      isInvalidInput(patientNameInput.value) === true ||
      isInvalidInput(symptomsInput.value) == true
    ) {
      messageModal("Invalid input: Please enter a non-empty value.");
    } else {
      // Update the content with the new values
      patientNameElement.innerHTML = patientNameInput.value;
      symptomsElement.innerHTML = symptomsInput.value;
      medicationsElement.innerHTML = medicationsInput.value;

      var thisRecord = event.target.closest("div");

      thisRecord.querySelector(".save").style.display = "none";
      thisRecord.querySelector(".edit").style.display = "block";
    }

    /** 2.Edit from the localstorage */
    const recordToEdit = recordObj.find(({ id }) => id == recordId);
    if (recordToEdit) {
      recordToEdit.patientName = patientNameInput.value;
      recordToEdit.symptoms = symptomsInput.value;
      recordToEdit.medications = medicationsInput.value;
    }
    localStorage.setItem(RECORDOBJ_KEY, JSON.stringify(recordObj));
  };
  
  const enterEditMode = (event) => {
    // event.target.style.display = "none";

    var thisRecord = event.target.closest("div");
    thisRecord.querySelector(".save").style.display = "block";
    thisRecord.querySelector(".edit").style.display = "none";
    var recordElement = event.target.closest(".record");
    
        // Get the elements that need to be edited
        const patientNameElement = recordElement.querySelector(
          ".record-section-title span"
        );
        const symptomsElement = recordElement.querySelector(".record-list li");
        const medicationsElement =
          recordElement.querySelectorAll(".record-list li")[1];
    
        // Create input fields and populate them with the current values
        const patientNameInput = document.createElement("input");
        patientNameInput.classList.add('form-control');
        patientNameInput.value = patientNameElement.textContent;
    
        const symptomsInput = document.createElement("input");
        symptomsInput.classList.add('form-control');
        symptomsInput.value = symptomsElement.textContent;
    
        const medicationsInput = document.createElement("input");
        medicationsInput.classList.add('form-control');
        medicationsInput.value = medicationsElement.textContent;
    
        // Replace the content with input fields
        patientNameElement.innerHTML = "";
        patientNameElement.appendChild(patientNameInput);
    
        symptomsElement.innerHTML = "";
        symptomsElement.appendChild(symptomsInput);
    
        medicationsElement.innerHTML = "";
        medicationsElement.appendChild(medicationsInput);

  };

  const onRecordSubmit = (event) => {
    event.preventDefault();

    // Get values from the form
    var patientName = document.getElementById("PatientNameInput");
    var symptoms = document.getElementById("SymptomsInput");
    var medications = document.getElementById("MedicationsInput");
    var currentDate = new Date().toLocaleDateString();

    //To check if any of the field is empty
    if (
      isInvalidInput(patientName.value) === true ||
      isInvalidInput(symptoms.value) == true
    ) {
      messageModal("Invalid input: Please enter a non-empty value.");
    } else {
      const newRecord = {
        patientName: patientName.value,
        symptoms: symptoms.value,
        medications: medications.value,
        currentDate,
        id: Date.now(),
      };
      drawRecord(newRecord); //draw record on the screen
      saveNewRecord(newRecord); //save record to the localstorage

      //empty input field after saving
      patientName.value = "";
      symptoms.value = "";
      medications.value = "";
    }
  };

  /** ---- On startup ---- */
  //Check the existence of the localstorage value and draw them on the screen
  const savedRecordObj = localStorage.getItem(RECORDOBJ_KEY);
  if (savedRecordObj !== null) {
    const parsedSavedRecordObj = JSON.parse(savedRecordObj);
    parsedSavedRecordObj.forEach((item) => drawRecord(item));
    recordObj = parsedSavedRecordObj;
  }
  const inputBtn = document.getElementById("MedicalForm");
  const editButtons = document.querySelectorAll(".edit");
  const deleteButtons = document.querySelectorAll(".delete");
  const saveButtons = document.querySelectorAll(".save");

  /** ---- Event Listners ---- */
  inputBtn.addEventListener("submit", (event) => {
    onRecordSubmit(event);
  });
  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", enterEditMode);
  });
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", deleteRecord);
  });
  saveButtons.forEach((saveButton) => {
    saveButton.addEventListener("click",saveEditedRecord);
  });
});

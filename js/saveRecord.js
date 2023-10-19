/* Selectors */
const medicalForm = document.getElementById("MedicalForm");
const inputName = document.querySelector("#PatientNameInput input");
const inputSymtom = document.querySelector("#SymptomsInput input");
const inputMed = document.querySelector("#MedicationsInput input");

const inputBtn = document.getElementById("add-record-btn");


const onSave=(e)=>{
    e.preventDefault();
    console.log(e.value);
}



/* Event Listeners */
inputBtn.addEventListener("sybt=",(e)=>{onSave(e)});
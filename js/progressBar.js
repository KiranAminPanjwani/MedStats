// progressbar.js is show the popup when users click a node in progress bar

//show progress when user clicks
const progressbarPopup= (numberPopup) => {
    // input number of id Ex. Popup1 input 1
    // When the user clicks on progressbar open the popup
    document.getElementById("Popup" + numberPopup.toString()).classList.toggle("show");
    
}

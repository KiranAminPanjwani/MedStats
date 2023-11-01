// Document Ready Event

function updateCurrentyYear() {
  const currentYear = new Date().getFullYear();
  document.getElementById("current-year").textContent = currentYear;
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("backToTopBtn").style.display = "flex";
  } else {
    document.getElementById("backToTopBtn").style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", function () {
  updateCurrentyYear();
  window.onscroll = scrollFunction;
});

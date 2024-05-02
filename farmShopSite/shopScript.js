const storeNavDropdown = document.querySelector(".dropdown-placeholder");
const storeNavLinks = document.querySelector(".nav-selection-list");

storeNavDropdown.addEventListener("click", function () {
  storeNavLinks.classList.toggle("hide");
});

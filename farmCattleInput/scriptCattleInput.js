const openEntryForm = document.getElementById("add-entry-btn");
const cattleHome = document.querySelector(".cattle-home");
const cattleEntryForm = document.querySelector(".cattle-entry-form");
const dialogModal = document.querySelector(".confirm-close-dialog");
const closeEntryBtn = document.getElementById("close-form-btn");
const nameInput = document.getElementById("cattle-name");
const discardBtn = document.getElementById("discard-btn");
const outputDiv = document.getElementById("cattle-output-container");

let cattleInputArray = [];

function toggleHidden() {
  cattleHome.classList.toggle("hidden");
  cattleEntryForm.classList.toggle("hidden");
}

function checkCattleInput() {
  const checkRadioButtons = document.querySelectorAll(
    'input[type="radio"]:checked'
  );

  if (checkRadioButtons.length > 0 || nameInput.value.trim() !== "") {
    dialogModal.showModal();
  } else {
    toggleHidden();
  }
}

function createCattleCard(cattleEntry) {
  const cattleCard = document.createElement("div");
  cattleCard.classList.add("cattle-card");

  cattleCard.innerHTML = `
  <h2 class="cattle-card-title">${cattleEntry.name}</h2>
  <div class="cattle-card-text">
  <p>${cattleEntry.gender} </p>
  <p>${cattleEntry.branded} </p>
  <p>${cattleEntry.tagged} </p>
  </div>
  `;

  outputDiv.appendChild(cattleCard);
}

function discardChanges() {
  nameInput.value = "";
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((button) => {
    button.checked = false;
  });
  toggleHidden();
}

openEntryForm.addEventListener("click", () => {
  toggleHidden();
});

closeEntryBtn.addEventListener("click", () => {
  checkCattleInput();
});

discardBtn.addEventListener("click", discardChanges);

cattleEntryForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const cattleName = document.getElementById("cattle-name").value;
  const cattleGender = document.querySelector(
    "input[name='gender']:checked"
  ).value;
  const branded = document.querySelector('input[name="brand"]:checked').value;
  const tagged = document.querySelector('input[name="tagging"]:checked').value;

  const cattleEntry = {
    id: Date.now(),
    name: cattleName,
    gender: cattleGender,
    branded: branded,
    tagged: tagged,
  };

  cattleInputArray.push(cattleEntry);
  window.localStorage.setItem(
    "cattleInputArray",
    JSON.stringify(cattleInputArray)
  );
  discardChanges();

  createCattleCard(cattleEntry);
});

window.addEventListener("load", () => {
  const storedCattleData = localStorage.getItem("cattleInputArray");
  if (storedCattleData) {
    cattleInputArray = JSON.parse(storedCattleData);

    cattleInputArray.forEach(createCattleCard);
  }
});

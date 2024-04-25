const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navList.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navList.classList.remove("active");
  })
);

// function winLotto() {
//   for (let i = 0; i < 6; i++) {
//     const randomNumber = Math.floor(Math.random() * 52) + 1;
//   }
// }

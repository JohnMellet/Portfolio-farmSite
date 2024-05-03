const storeNavDropdown = document.querySelector(".dropdown-placeholder");
const storeNavLinks = document.querySelector(".nav-selection-list");
const shopItemContainer = document.querySelector(".shop-item-container");
const editButton = document.querySelector(".edit-btn");
const deleteButton = document.querySelector(".delete-btn");

const storeProductsArray = [
  { id: 1, name: "Product 1", price: 10.99 },
  { id: 2, name: "Product 2", price: 15.99 },
  { id: 3, name: "Product 3", price: 5.99 },
];

const addProductForm = document.getElementById("addProductForm");
const priceRegex = /^[0-9]+(\.[0-9]+)?$/;

addProductForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const productNameInput = document.getElementById("productName").value.trim();
  const productPriceInput = document
    .getElementById("productPrice")
    .value.trim();

  if (productNameInput && priceRegex.test(productPriceInput)) {
    addProductCard(productNameInput, productPriceInput);
  } else {
    alert("enter valid");
  }

  updateStoreContainer();
});

const updateStoreContainer = () => {
  const storedProducts = JSON.parse(localStorage.getItem("storeProducts"));
  shopItemContainer.innerHTML = "";

  storedProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.setAttribute("id", product.id);
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.psdstamps.com%2Fwp-content%2Fuploads%2F2019%2F11%2Fround-new-product-stamp-png.png&f=1&nofb=1&ipt=60dc0c9f54347bcab787373f4250054e625fb49bb63db2d121cdee7475090ac3&ipo=images"
      />  
      <p class="product-title">${product.name}</p>
      <p class="product-price">$${product.price}</p>
      <button type="button" class="product-btn">Add to cart</button>
      `;
    shopItemContainer.appendChild(productCard);
  });
};

const addProductCard = (name, price) => {
  let nextId = 1;
  while (storeProductsArray.some((product) => product.id === nextId)) {
    nextId++;
  }

  const newProduct = {
    id: nextId,
    name: name,
    price: price,
  };
  storeProductsArray.push(newProduct);
  localStorage.setItem("storeProducts", JSON.stringify(storeProductsArray));
};

const editShopProducts = () => {};

const deleteShopProducts = () => {};

storeNavDropdown.addEventListener("click", function () {
  storeNavLinks.classList.toggle("hide");
});

editButton.addEventListener("click", () => {
  const shopButtons = document.querySelectorAll(".product-btn");
  shopButtons.forEach((button) => {
    button.textContent = "Edit";
    button.dataset.action = "edit";
  });
});

deleteButton.addEventListener("click", () => {
  const shopButtons = document.querySelectorAll(".product-btn");
  shopButtons.forEach((button) => {
    button.textContent = "Delete";
    button.dataset.action = "delete";
  });
});

document.addEventListener("click", (event) => {
  const buttonClicked = event.target;
  if (buttonClicked.dataset.action === "edit") {
    editShopProducts();
  }

  if (target.dataset.action === "delete") {
    deleteShopProducts();
  }
});

window.addEventListener("load", function () {
  updateStoreContainer();
});

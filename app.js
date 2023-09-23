const bookList = document.getElementById("cards");
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("filterInput");


// Shopping cart in localStorage or empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];


function fetchFunction() {
  return fetch("https://example-data.draftbit.com/books?_limit=10")
    .then((data) => {
      return data.json()
    })
    .catch((error) => error);
}

function displayBooks(books) {
  bookList.innerHTML = ""; 
  books.map((book) => {
    const allBook = document.createElement("div"); 
    allBook.innerHTML = `
          <img class="displayphotoes" src=${book.image_url} alt="img" />
          <h1 class="title">${
            book.title.length > 18
              ? book.title.substring(0, 18).concat(" ...")
              : book.title
          }</h1>
          <p class="author">Author: ${book.authors} </p>
          <p><strong>Price:</strong> $${book.rating.toFixed(2)}</p>
          <button class="add-to-cart" data-id="${
            book.id
          }" class="btn">Add to Cart</button>
          <a href="BookDetails/details.html?id=${
            book.id
          }" class="button">See More</a>
  `;

    const addToCartButton = allBook.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", () => addToCart(book));

    bookList.appendChild(allBook);
  });
}

// Function to update the shopping cart count
function updateCartCount() {
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalCount.toString();
}


// Function to open the shopping cart page
function openShoppingCart() {
  window.location.href = "./ShoppingCart/cart.html";
}

cartIcon.addEventListener("click", openShoppingCart);

// Aadds book to the shopping cart + update cart count
function addToCart(book) {
const existingItem = cart.find((item) => item.id === book.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...book, quantity: 1 });
    
    updateCartCount();
  }

  // Saveing updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

}

// Update the shopping cart/count display on page load
 updateCartCount(); 



// Function to update the shopping cart count
function updateCartCount() {
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalCount.toString();
}


// Function to open the shopping cart page
function openShoppingCart() {
  window.location.href = "./ShoppingCart/cart.html";
}

cartIcon.addEventListener("click", openShoppingCart);

// Aadds book to the shopping cart + update cart count
function addToCart(book) {
  const existingItem = cart.find((item) => item.id === book.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...book, quantity: 1 });
    
    updateCartCount();
  }

  // Saveing updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

}

fetchFunction()
  .then(displayBooks)
  .catch((error) => error);
//----------------------------------------------------


// Drop down Search bar

let select = document.getElementById("select");
let dropDownList = document.getElementById("dropDownList");
let selectText = document.getElementById("selectText");
let inputField = document.getElementById("inputField");
let options = document.getElementsByClassName("options");

select.onclick = function () {
  dropDownList.classList.toggle("open");
};

for (option of options) {
  option.onclick = function () {
    selectText.innerHTML = this.innerHTML;
    inputField.placeholder = "Search In " + selectText.innerHTML;
  };
}

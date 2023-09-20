const bookList = document.getElementById("cards");
// const bookList2 = document.getElementById("book-list"); es igivea rac cards
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("filterInput");


// Shopping cart in localStorage or empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// // levanis
// fetch("https://example-data.draftbit.com/books?_limit=10").then((data) => {
//   data.json().then((result) => {
//     console.log("#Result#: ");
//     getUniqueGenreList(result).then((result2) => {
//       console.log("#result2#: ", result2);
//     });
//   });
// });

//amas rom vshli agar amodis card-ebi
function fetchFunction() {
  return fetch("https://example-data.draftbit.com/books?_limit=10")
    .then((data) => {
      return data.json();
    })
    .catch((error) => error);
}

// ak vcer lokacias -anu????
// change it for map new version/ also can use -> for (const book of books)
function displayBooks(books) {
  bookList.innerHTML = "";

  books.map((book) => {
    const allBook = document.createElement("div"); // allBook = cards meoreshi
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






// test.js dan

// function showBookDetailsFromUrl() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const bookId = urlParams.get("id");
//   const book = allBookss.find((b) => b.id === parseInt(bookId));

//   if (book) {
//     const bookDetails = document.getElementById("cards");
//     bookDetails.innerHTML = `
//         <h3>${book.title}</h3>
//         <p>${book.authors}</p>
//         <p>${book.description}</p>
//         <img src='${book.imageURL}' alt='${book.title}'/>
//         `;
//   } else {
//     document.getElementById("cards").innerHTML = `<p>Book is not found</p>`;
//   }
// }



// document.getElementById("streamDiv").addEventListener("click", function () {
//   window.location.href = "Stream/livestream.html";
// });

// //levanis
// function getUniqueGenreList(jsonArray) {
//   return new Promise((resolve, reject) => {
//     try {
//       const uniqueGenres = jsonArray
//         .map((item) => item.genre_list.split(","))
//         .flat()
//         .reduce((acc, genre) => {
//           if (!acc.includes(genre)) {
//             acc.push(genre);
//           }
//           return acc;
//         }, []);

//       resolve(uniqueGenres);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// // // book details
//----------------------------------------------------
// am eachBookDetails vidzaxebdi zemot  line 49
// button class="button" onclick="eachBookDetails(${
//             book.id
//           })">See Details</button>

//----------------------------------------------------
// function eachBookDetails(bookId) {
//   fetchFunction() // es sainteresoa !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//     .then((books) => {
//       const value = books.find((book) => book.id === bookId);

//       if (value) {
//         const details = `

//         <div class="book-details">
//         <div class="detailPhoto">
//         <img class="photoes" src=${value.image_url} alt="img" />
//         <div/>
//         <h2 class="detailsTitle">${value.title}</h2>
//         <h4 class="detailsAuthor">Author: ${value.authors}</h4>
//         <h3>Genres ${value.genres}</h3>
//         <p> <strong>Description:</strong> ${value.description}</p>
//         <p> <strong>Format:</strong> ${value.format}</p>
//         <h4 class="detailsAuthor">Quote: ${value.Quote1}</h4>
//         <h3>Price: $${value.rating}</h3>
//         <button class="btn">Add To Cart</button>
//         <button class="instent-purchas">Instent Purchas</button>
//       </div>
//     </div>`;

//         bookList.innerHTML = details;
//       } else {
//         bookList.innerHTML = "<p>There are no details for this book!</p>";
//       }
//     })
//     .catch((error) => error);
// }

// FILTER/SEARCH BAR
let grid = document.querySelector(".products");
let filterInput = document.getElementById("filterInput");

// get values from the api create dynamic element

// add event listener
filterInput.addEventListener("keyup", filterProducts);

// addEventListener's callback function
function filterProducts() {
  let filterValue = filterInput.value.toUpperCase();
  console.log("filterValiu is ", filterValue);
  let item = grid.querySelectorAll(".cards");
  console.log(filterValue);

  for (let i = 0; i < item.length; i++) {
    let span = item[i].querySelector(".title");

    console.log("i am item: ", item);

    if (span.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      item[i].style.display = "initial";
    } else {
      item[i].style.display = "none";
    }
  }
}

fetchFunction()
  .then(displayBooks)
  .catch((error) => error);

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

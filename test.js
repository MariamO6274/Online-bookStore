
let allBookss = []; // A allBookss to store books fetched from API

document.addEventListener("DOMContentLoad", function () {
  // romelime iventi tu chaitvirta es eSveba es DOMContentLoad
  //Initialize book list if on list.html
  if (document.getElementById("book-list")) {
    fetchBooks();
  }

  //Show book details if on details.html
  if (document.getElementById("book-details")) {
    //Fetch books is the allBookss is empty
    if (allBookss.length === 0) {
      fetchBooks().then(() => {
        showBookDetailsFromUrl();
      });
    } else {
      showBookDetailsFromUrl(); // listi daxata da bookdetails utxra showBookDetailsFromUrl-o
    }
  }
});

function fetchBooks() {
  return fetch("https://example-data.draftbit.com/books?_limit=10")
    .then((response) => response.json())
    .then((books) => {
      allBookss = books;
      initBookList(books);
    })
    .catch((error) => {
      console.error("Error fetching books: ", error);
    });
}

function initBookList(books) {
  const bookList = document.getElementById("book-list");

  books.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.innerHTML = `
    <h3>${book.title}</h3>
    <p>${book.authors}</p>
    <p>${book.description}</p>
    <img src='${book.imageURL}' alt='${book.title}'/>
    <button onclick="redirectToDetails(${book.id})">See Details</button>;

    `;
    bookList.appendChild(bookItem);
  });
}

// gverdi rom sheicvalos, axali funqcia sheqmna da
function redirectToDetails(bookId) {
  window.location.href = `details.html?id=${bookId}`;
}
// onclick = "redirectToDetails(${book.id})"; es axalshi agar minda

function showBookDetailsFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");
  const book = allBookss.find((b) => b.id === parseInt(bookId));

  if (book) {
    const bookDetails = document.getElementById("book-details");
    bookDetails.innerHTML = `
        <h3>${book.title}</h3>
        <p>${book.authors}</p>
        <p>${book.description}</p>
        <img src='${book.imageURL}' alt='${book.title}'/>
        `;
  } else {
    document.getElementById(
      "book-details"
    ).innerHTML = `<p>Book is not found</p>`;
  }
}













































////////////////////////amis qvemot old
// fetch("https://example-data.draftbit.com/books?_limit=10").then((data) => {
//   // console.log(data)
//   return data
//     .json()
//     .then((booksObj) => {
//       console.log(booksObj);
//       // console.log(booksArray[2].title);
//       let allBook = "";
//       booksObj.map((value) => {
//         allBook += `<div class="each-card">
//           <img class="photoes" src=${value.image_url} alt="img" />
//           <h1 class="title">${value.title}</h1>
//           <p class="author">Author: ${value.authors} </p>
//           <a class="button" href="./Pages/details.html">Add To Cart</a>
//         </div>`;
//       });
//       document.getElementById("cards").innerHTML = allBook;
//     })
//     .catch((error) => error);
// });

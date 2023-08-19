let grid = document.querySelector(".products");
let filterInput = document.getElementById("filterInput");

fetch("https://example-data.draftbit.com/books?_limit=10").then((data) => {
  // console.log(data)
  return data
    .json()
    .then((booksObj) => {
      console.log(booksObj);
      // console.log(booksArray[2].title);
      let allBook = "";
      booksObj.map((value) => {
        allBook += `<div class="each-card">
          <img class="photoes" src=${value.image_url} alt="img" />
          <h1 class="title">${value.title}</h1>
          <p class="author">Author: ${value.authors} </p>
          <a class="button" href="./Pages/details.html">Add To Cart</a>
        </div>`;
      });
      document.getElementById("cards").innerHTML = allBook;
    })
    .catch((error) => error);
});

// add event listener
filterInput.addEventListener("keyup", filterProducts);

// callback function
function filterProducts() {
  let filterValue = filterInput.value.toUpperCase();
  let item = grid.querySelectorAll(".each-card");
   console.log(filterValue);

  for (let i = 0; i < item.length; i++) {
    let span = item[i].querySelector(".title");

    if (span.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      item[i].style.display = "initial";
    } else {
      item[i].style.display = "none";
    }
  }
}

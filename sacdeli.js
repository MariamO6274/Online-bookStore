//////////////////////amis qvemot old
fetch("https://example-data.draftbit.com/books?_limit=10").then((data) => {
  // console.log(data)
  return data
    .json()
    .then((booksObj) => {
      console.log(booksObj);
  
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

// function fetchBooks() {
//   fetch(API_URL)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("#Result#: ", data);
//       getUniqueGenreList(data).then((data2) => {
//         console.log("#result2#: ", data2);
//       });
//       //  book list search fn
//       bookListSearch(data);
//     })
//     .catch((error) => console.error("Error fetching data:", error));
// }

// let result = getUniqueGenreList(result).then((result2)=> {
//    console.log("result ", result2)
// })
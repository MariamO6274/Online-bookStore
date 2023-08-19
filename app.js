
fetch("https://example-data.draftbit.com/books?_limit=10")
.then((data)=>{
    // console.log(data)
    return data.json()
    .then((booksObj)=> {
        console.log(booksObj);
        // console.log(booksArray[2].title);
        let allBook = "";
        booksObj.map((value) => {
          allBook += `<div class="each-card">
          <img class="photoes" src=${value.image_url} alt="img" />
          <h1 class="title">${value.title}</h1>
          <p class="author">Author: ${value.authors} </p>
          <p class="genres">Genres: ${value.genres}</p>
          <a class="button" href="./Pages/details.html">Add To Cart</a>
        </div>`;
        });
        document.getElementById("cards").innerHTML = allBook;
    }).catch((error)=> error)
})
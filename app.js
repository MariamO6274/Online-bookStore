
fetch("https://example-data.draftbit.com/books?_limit=10").then((data)=>{
    console.log(data)
    return data.json()
    .then((booksObj)=> {
        console.log(booksObj);
        // console.log(booksArray[2].title);
        let allBook = "";
        booksObj.map((value) => {
          allBook += `<div class="each-card">
          <img class="photoes" src=${value.image_url} alt="img" />
          <h1 class="title">${value.title}</h1>
          <p class="genres">Genres: ${value.genres}</p>
          <p class="price">Price: $${value.rating}</p>
          <button>Read more</button>
        </div>`;
        });
        document.getElementById("cards").innerHTML = allBook;
    }).catch((error)=> error)
})
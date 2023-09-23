const API_URL = "https://example-data.draftbit.com/books?_limit=10";
const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");

// Function to fetch data from the API and populate the book list
function fetchBooks() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("#Result#: ", data);
      getUniqueGenreList(data).then((data2) => {
        console.log("#result2#: ", data2);
      });
      //  book list search fn
      bookListSearch(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Function to create a book card element
function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("book-card");

  const img = document.createElement("img");
  img.src = book.image_url;
  img.alt = book.title;

  const title = document.createElement("h3");
  title.textContent =
    book.title.length > 15
      ? book.title.substring(0, 15).concat(" ...")
      : book.title;

  const author = document.createElement("p");
  author.textContent = `by ${book.authors}`;

  const detailsButton = document.createElement("button");
  detailsButton.textContent = "Details";
  detailsButton.addEventListener("click", () => {
    window.location.href = `../BookDetails/details.html?id=${book.id}`; // for details page
  });

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(detailsButton);

  return card;
}

//last class work
function getUniqueGenreList(jsonArray) {
  return new Promise((resolve, reject) => {
    try {
      const uniqueGenres = jsonArray
        .map((item) => item.genre_list.split(","))
        .flat()
        .reduce((acc, genre) => {
          if (!acc.includes(genre)) {
            acc.push(genre);
          }
          return acc;
        }, []);

      resolve(uniqueGenres);
    } catch (error) {
      reject(error);
    }
  });
}
//last class work ends here

// Function to update the book list based on search input
function bookListSearch(data) {
  bookList.innerHTML = "";
  const searchText = searchInput.value.toLowerCase();

  data.forEach((book) => {
    if (book.title.toLowerCase().includes(searchText)) {
      const bookCard = createBookCard(book);
      bookList.appendChild(bookCard);
    }
  });
}

// Event listener for the search input
searchInput.addEventListener("input", fetchBooks);

// fetchBooks function to load initial data
fetchBooks();

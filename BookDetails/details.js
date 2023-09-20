document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const bookID = params.get("id");

  try {
    const response = await fetch(
      `https://example-data.draftbit.com/books/${bookID}`
    );
    const book = await response.json();
    const bookDetailsContainer = document.getElementById("bookDetails");

    bookDetailsContainer.innerHTML = `
            <h2>${book.title}</h2>
            <img src="${book.image_url}" alt="${book.title}">
            <h4>Author: ${book.authors}</h4>
            <p> <strong>Genres:</strong> ${book.genres}</p>
            <p> <strong>Description:</strong> ${book.description}</p>
            <p> <strong>Format:</strong> ${book.format}</p>
            <h3>Price: $${book.rating}</h3>
            <button>Add To Cart</button>
            <button class="instent-purchas">Instent Purchas</button>
        `;
  } catch (error) {
    console.error("Error fetching book data:", error);
  }
});

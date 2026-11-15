
// ========================================
// THE COZY CHAPTER - MAIN JAVASCRIPT
// ========================================

// Load catalogue when the page is ready
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const catalog = await loadCatalog();

        console.log("Catalogue loaded successfully!");
        renderBooks(catalog.books);
        console.log("Books displayed on the website!");
    } catch (error) {
        console.error("Website initialization failed:", error);
    }
});


// ========================================
// DISPLAY BOOKS
// ========================================

function renderBooks(books) {
    const bookGrid = document.getElementById("book-grid");

    if (!bookGrid) {
        console.error("Book grid container not found!");
        return;
    }

    bookGrid.innerHTML = "";

    books.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.dataset.category = book.genreId;

        // Featured label
        if (book.featured) {
            const featuredLabel = document.createElement("span");
            featuredLabel.className = "sale";
            featuredLabel.textContent = "FEATURED";
            bookCard.appendChild(featuredLabel);
        }

        // Book cover container
        const cover = document.createElement("div");
        cover.className = "book-cover";

        // Text placeholder (shown if image is unavailable)
        const placeholder = document.createElement("div");
        placeholder.className = "book-placeholder";

        const heart = document.createElement("span");
        heart.textContent = "♡";

        const placeholderTitle = document.createElement("p");
        placeholderTitle.textContent = book.title;

        placeholder.append(heart, placeholderTitle);

        if (book.image) {
            const coverImage = document.createElement("img");

            coverImage.className = "book-cover-image";
            coverImage.src = book.image;
            coverImage.alt = `Cover of ${book.title}`;
            coverImage.loading = "lazy";

            // Show placeholder if image fails
            coverImage.addEventListener("error", () => {
                coverImage.remove();
                placeholder.hidden = false;
            }, { once: true });

            placeholder.hidden = true;
            cover.append(coverImage, placeholder);
        } else {
            placeholder.hidden = false;
            cover.appendChild(placeholder);
        }

        // Book information
        const info = document.createElement("div");
        info.className = "book-info";

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.className = "author";
        author.textContent = book.author
            ? book.author.name
            : "Unknown Author";

        const genre = document.createElement("p");
        genre.className = "genre";
        genre.textContent = book.genre
            ? book.genre.name
            : "Uncategorized";

        const bottom = document.createElement("div");
        bottom.className = "book-bottom";

        const price = document.createElement("span");
        price.className = "price";
        price.textContent = `₹${book.price}`;

        const addButton = document.createElement("button");
        addButton.className = "add-btn";
        addButton.type = "button";
        addButton.textContent = "+ Add";

        bottom.append(price, addButton);
        info.append(title, author, genre, bottom);

        bookCard.append(cover, info);
        bookGrid.appendChild(bookCard);
    });

    console.log("Rendered books:", books.length);
}


// ========================================
// SEARCH AND CATEGORY FILTERING
// ========================================

let currentCategory = "all";


// Apply search and category filters
function applyFilters() {
    const searchInput = document.getElementById("search");

    const searchTerm = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const allBooks = window.catalog?.books || [];

    const filteredBooks = allBooks.filter(book => {

        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm) ||
            book.author?.name.toLowerCase().includes(searchTerm) ||
            book.genre?.name.toLowerCase().includes(searchTerm) ||
            book.tags?.some(tag =>
                tag.toLowerCase().includes(searchTerm)
            );

        const matchesCategory =
            currentCategory === "all" ||
            book.genreId === currentCategory;

        return matchesSearch && matchesCategory;
    });

    renderBooks(filteredBooks);

    console.log("Filtered books:", filteredBooks.length);
}


// Search function
function filterBooks() {
    applyFilters();
}


// Category filter function
function filterCategory(category, button) {

    currentCategory = category;

    document.querySelectorAll(".category").forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    applyFilters();
}

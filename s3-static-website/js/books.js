
async function loadCatalog() {
    try {
        // Load all three JSON files simultaneously
        const [booksResponse, authorsResponse, genresResponse] =
            await Promise.all([
                fetch("./data/books.json"),
                fetch("./data/authors.json"),
                fetch("./data/genres.json")
            ]);

        // Check whether all requests succeeded
        if (!booksResponse.ok || !authorsResponse.ok || !genresResponse.ok) {
            throw new Error("Unable to load one or more catalogue files.");
        }

        // Convert JSON responses into JavaScript objects
        const books = await booksResponse.json();
        const authors = await authorsResponse.json();
        const genres = await genresResponse.json();

        // Create lookup maps for faster connections
        const authorMap = new Map(
            authors.map(author => [author.id, author])
        );

        const genreMap = new Map(
            genres.map(genre => [genre.id, genre])
        );

        // Connect every book with its author and genre
        const connectedBooks = books.map(book => {
            const author = authorMap.get(book.authorId);
            const genre = genreMap.get(book.genreId);

            if (!author) {
                console.warn(`Missing author for: ${book.title}`);
            }

            if (!genre) {
                console.warn(`Missing genre for: ${book.title}`);
            }

            return {
                ...book,
                author: author || null,
                genre: genre || null
            };
        });

        // Validate author genre references
        authors.forEach(author => {
            author.genreIds.forEach(genreId => {
                if (!genreMap.has(genreId)) {
                    console.warn(
                        `Unknown genre "${genreId}" for ${author.name}`
                    );
                }
            });
        });

        // Store the complete catalogue globally
        window.catalog = {
            books: connectedBooks,
            authors,
            genres
        };

        console.log("The Cozy Chapter catalogue loaded successfully!");
        console.log("Total books:", connectedBooks.length);
        console.log("Total authors:", authors.length);
        console.log("Total genres:", genres.length);

        return window.catalog;

    } catch (error) {
        console.error("Catalogue loading failed:", error);
        throw error;
    }
}

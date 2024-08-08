document.addEventListener('DOMContentLoaded', function() {
    const bookCardsContainer = document.querySelector('.book-cards');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('genreFilter');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const ratingFilter = document.getElementById('ratingFilter');

    let books = [];
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            books = data;
            displayBooks(books);
        })
        .catch(error => console.error('Error fetching books:', error));

    // Function to display books
    function displayBooks(booksToDisplay) {
        bookCardsContainer.innerHTML = '';
        booksToDisplay.forEach(book => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${book.cover}" alt="${book.title} Cover">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Price: ${book.price.toFixed(2)}₹</p>
                <p>Rating: ${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5 - Math.floor(book.rating))}</p>
            `;
            bookCardsContainer.appendChild(card);
        });
    }


    searchInput.addEventListener('input', filterBooks);


    priceRange.addEventListener('input', function() {
        priceValue.textContent = `₹${priceRange.value}`;
        filterBooks();
    });

    ratingFilter.addEventListener('change', filterBooks);

    function filterBooks() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const maxPrice = parseFloat(priceRange.value);
        const selectedRating = parseFloat(ratingFilter.value);

        const filteredBooks = books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                                  book.author.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === '' || book.category === selectedCategory;
            const matchesPrice = book.price <= maxPrice;
            const matchesRating = isNaN(selectedRating) || book.rating >= selectedRating;

            return matchesSearch && matchesCategory && matchesPrice && matchesRating;
        });

        displayBooks(filteredBooks);
    }
});


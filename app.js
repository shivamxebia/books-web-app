document.addEventListener('DOMContentLoaded', function() {
    const bookCardsContainer = document.querySelector('.book-cards');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('genreFilter');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const ratingFilter = document.getElementById('ratingFilter');

    let books = [];
    let originalBooks = [];

    // Fetch and display books
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            books = data;
            originalBooks = data;
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

    // Filter books by category
    function filterByCategory() {
        const selectedCategory = categoryFilter.value;
        if (selectedCategory === '') {
            books = originalBooks;
        } else {
            books = books.filter(book => book.category === selectedCategory);
        }
        applyFilters();
    }

    // Filter books by price
    function filterByPrice() {
        const maxPrice = parseFloat(priceRange.value);
        books = books.filter(book => book.price <= maxPrice);
        applyFilters();
    }

    // Filter books by rating
    function filterByRating() {
        const selectedRating = parseFloat(ratingFilter.value);
        if (isNaN(selectedRating)) {
            books = originalBooks;
        } else {
            books = books.filter(book => Math.floor(book.rating) == selectedRating);
        }
        applyFilters();
    }

    // Filter books by search term
    function filterBySearch() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.length === 0) {
            books = originalBooks;
        } else {
            books = books.filter(book =>
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm)
            );
        }
        applyFilters();
    }

    // Apply all filters
    function applyFilters() {
        displayBooks(books);
    }

    // Event listeners
    searchInput.addEventListener('input', function() {
        resetBooks();
        filterBySearch();
    });

    priceRange.addEventListener('input', function() {
        priceValue.textContent = `₹${priceRange.value}`;
        resetBooks();
        filterByPrice();
    });

    ratingFilter.addEventListener('change', function() {
        resetBooks();
        filterByRating();
    });

    categoryFilter.addEventListener('change', function() {
        resetBooks();
        filterByCategory();
    });

    function resetBooks() {
        books = originalBooks;
    }

    // Initialize the price value display
    priceValue.textContent = `₹${priceRange.value}`;
});

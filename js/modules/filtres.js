import { getAllBooks } from './storage.js';
import { displayBooks } from './library.js';

const searchInput = document.querySelector('#search');

document.addEventListener('change', async (e) => {
    const allBooks = await getAllBooks();

    const fieldMap = {
        'status_filter': 'status',
        'author_filter': 'author',
        'age_filter': 'age',
        'series_filter': 'series',
    };

    const field = fieldMap[e.target.id];

    if (field) {
        filterRun(allBooks, field, e.target.value);
    }
});

searchInput.addEventListener('input', async (e) => {
    const allBooks = await getAllBooks();
    const value = e.target.value.toLowerCase().trim();
    const field = 'title';
    if (value) {
        filterRun(allBooks, field, value, false);
    } else {
        displayBooks(allBooks);
    }
});

const filterRun = (allBooks, field, value, exact = true) => {
    if (value === "all") {
        displayBooks(allBooks);
    }
    else {
        const newBooks = allBooks.filter(book =>
            exact
                ? book[field]?.toLowerCase() === value.toLowerCase()
                : book[field]?.toLowerCase().includes(value.toLowerCase())
        );
        displayBooks(newBooks);
    }
};
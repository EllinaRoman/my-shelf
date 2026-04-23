import { getAllBooks } from './storage.js';

const updateMyLists = (allBooks) => {
  const setAuthors = new Set();
  const setSeries = new Set();
  const setGenres = new Set();
  const setTropes = new Set();

  allBooks.forEach((book) => {
    if (book.author) setAuthors.add(book.author.trim().toLowerCase());
    if (book.series) setSeries.add(book.series.trim().toLowerCase());

    if (book.allGenres) {
      book.allGenres.forEach(g => setGenres.add(g.trim().toLowerCase()));
    }
    if (book.allTropes) {
      book.allTropes.forEach(t => setTropes.add(t.trim().toLowerCase()));
    }
  });

  const listToUpdate = [
    { element: document.querySelector('#author-list'), data: setAuthors },
    { element: document.querySelector('#series-list'), data: setSeries },
    { element: document.querySelector('#genres-list'), data: setGenres },
    { element: document.querySelector('#tropes-list'), data: setTropes }
  ];


  listToUpdate.forEach(({ element, data }) => {
    if (element) {
      element.innerHTML = Array.from(data).map(val => `<option value="${val}">`).join('');
    }
  })
}

export const renderBooks = async () => {
  const books = await getAllBooks();
  books.reverse();
  const container = document.querySelector('.book-grid');

  if (books.length === 0) {
    container.innerHTML = `<div class="no-book">
          <span class="icon">📭</span>Книги не найдены. Добавьте первую!
      </div>`;
    return;
  }

  updateMyLists(books)

  let htmlContent = '';
  books.forEach((el) => {
    const displayGenres = (el.mainGenres && el.mainGenres.length > 0) ? el.mainGenres : (el.allGenres && el.allGenres.length > 0) ? el.allGenres.slice(0, 2) : [];
    const displayTropes = (el.mainTropes && el.mainTropes.length > 0) ? el.mainTropes : (el.allTropes && el.allTropes.length > 0) ? el.allTropes.slice(0, 2) : [];


    let coverContent;
    if (el.cover) {
      coverContent = `<img src="${el.cover}" alt="Обложка" class="new-book_cover" />`;
    } else {
      const hueValue = typeof el.accentHue === 'string'
        ? (el.accentHue.match(/\d+/) ? el.accentHue.match(/\d+/)[0] : 280)
        : (el.accentHue || 280);

      coverContent = `
        <div class="new-book_no-cover" style="--book-hue: ${hueValue}">
            <p class="no-cover_author">${el.author}</p>
            <p class="no-cover_title">${el.title}</p>
        </div>
    `;
    }
    htmlContent += `<div class="new-book" data-status="${el.status}" data-id="${el.id}" data-modal="edit-book">
          <div class="new-book_bar"></div>
          <div class="new-book_main">
            ${coverContent}
            <div class="new-book_main-info">
              <div class="new-book_info">
                <div class="new-book_text">
                  <p class="new-book_title">${el.title}</p>
                  <p class="new-book_author">${el.author}</p>
                </div>
                <div class="new-book_tags">
                  <p class="tag-age new-book_age">${el.age}</p>
                  ${el.series ? "<p class='tag-series new-book_series'>Серия</p>" : ''}
                  ${displayGenres.map(g => `<p class="tag-genre new-book_genre">${g}</p>`).join('')}
                  ${displayTropes.map(t => `<p class="tag-trope new-book_trope">${t}</p>`).join('')}
                  <p class="new-book_status" data-status="${el.status}">${el.statusText}</p>
                </div>
                ${el.rating > 0 ? `
                <div class="new-book_stars">${'★'.repeat(el.rating)}${'☆'.repeat(5 - el.rating)}</div>` : ''}
            </div>
          </div>
          </div>
        </div>`;
  });
  container.innerHTML = htmlContent;
};
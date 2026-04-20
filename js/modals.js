const formAddBook = document.querySelector('#modal_add-book');

document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('.close-modal');
    if (closeBtn) {
        const overlay = closeBtn.closest('.modal-overlay');
        if (overlay) setModalState(overlay, false);
        return;
    }

    if (e.target.classList.contains('modal-overlay')) {
        const overlay = e.target;
        if (overlay) setModalState(overlay, false);
        return;
    }

    const openBtn = e.target.closest('[data-modal]');
    if (openBtn) {
        const modalId = openBtn.dataset.modal;
        const overlay = document.querySelector(`.modal-overlay[data-modal="${modalId}"]`);
        if (overlay) setModalState(overlay, true);
        return;
    }
})

const setModalState = (overlay, isOpen) => {
    overlay.classList.toggle('open', isOpen);
    document.body.classList.toggle('modal-open', isOpen);
}


formAddBook.addEventListener('submit', (e) => {
    e.preventDefault();
    const { title, author, cover } = e.target.elements;
    let isValid = true;
    [title, author].forEach(input => {
        input.parentElement.classList.remove('is-invalid');
    });
    if (!title.value.trim()) {
        const parent = title.closest('.add-book_title-book');
        parent.classList.add('is-invalid');
        isValid = false;
    }
    if (!author.value.trim()) {
        const parent = author.closest('.add-book_author-list');
        parent.classList.add('is-invalid');
        isValid = false;
    }


    if (isValid) {
        const formData = new FormData(formAddBook);
        const saveBook = (coverData) => {
            const newBook = {
                id: Date.now(),
                title: formData.get('title'),
                author: formData.get('author'),
                series: formData.get('series'),
                seriesNum: formData.get('series-num'),
                age: formData.get('age'),
                annotation: formData.get('annotation'),
                status: formData.get('add-status'),
                cover: coverData,
                accentHue: coverData ? null : getBookDesign(),
                allGenres: [...selectedGenres],
                allTropes: [...selectedTropes],
                mainGenres: Array.from(listGenre.querySelectorAll('.active-genre'))
                    .map(el => el.querySelector('.text-genre').textContent),
                mainTropes: Array.from(listTrope.querySelectorAll('.active-trope'))
                    .map(el => el.querySelector('.text-trope').textContent),
            };
            console.log('Объект книги готов:', newBook);
            formAddBook.reset();

            const imgPreview = document.querySelector('.cover-preview');
            const label = document.querySelector('.add-book_label-cover');

            imgPreview.src = '';
            imgPreview.style.display = "none";
            label.style.fontSize = '0.8rem';

            selectedGenres.length = 0;
            selectedTropes.length = 0;
            listGenre.innerHTML = '';
            listTrope.innerHTML = '';
            listGenre.parentElement.style.display = 'none';
            listTrope.parentElement.style.display = 'none';

            const overlay = formAddBook.closest('.modal-overlay');
            setModalState(overlay, false);
        };

        const file = cover.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                saveBook(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            saveBook(null);
        }
    }
})
import { resetForm } from './form.js';
import { getRandomBook } from './randomBook.js';
import { updateBookStatus } from './storage.js';
import { renderBooks } from './library.js';

document.addEventListener('click', async (e) => {
    const target = e.target;
    const isCloseBtn = target.closest('.close-modal');
    const isCancelBtn = target.closest('.btn_add-book_cancel');
    const isOverlayClick = target.classList.contains('modal-overlay');

    if (isCloseBtn || isCancelBtn || isOverlayClick) {
        const overlay = isOverlayClick ? target : target.closest('.modal-overlay');
        if (overlay) {
            const form = overlay.querySelector('form');
            if (form) {
                resetForm(form);
            } else {
                setModalState(overlay, false);
            }
        }
        return;
    }

    const openBtn = e.target.closest('.btn[data-modal]');
    if (openBtn) {
        const { modal, id } = openBtn.dataset;

        if (modal === 'random-book') {
            getRandomBook();
        }
        const overlay = document.querySelector(`.modal-overlay[data-modal="${modal}"]`);
        if (overlay) setModalState(overlay, true);
        return;
    }

    const randomBtn = e.target.closest('.random-book_buttons .btn');
    if (randomBtn) {
        randomAction(randomBtn)
        return;
    }

    const card = e.target.closest('.new-book[data-modal]');
    if (card) {
        const modal = card.dataset.modal;
        const overlay = document.querySelector(`.modal-overlay[data-modal="${modal}"]`);
        if (overlay) setModalState(overlay, true);
    }

});

export const setModalState = (overlay, isOpen) => {
    overlay.classList.toggle('open', isOpen);
    document.body.classList.toggle('modal-open', isOpen);

    if (!isOpen) {
        overlay.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
    }
};

const randomAction = async (btn) => {
    const { action, id } = btn.dataset;
    const overlay = btn.closest('.modal-overlay');
    const bookId = Number(id);
    if (!bookId) return;

    if (action === 'want') {
        await updateBookStatus(bookId, 'want');
    } else if (action === 'future') {
        await updateBookStatus(bookId, 'future');
    } else {
        await updateBookStatus(bookId, 'not-reading');
    }
    await renderBooks();
    setModalState(overlay, false);
}

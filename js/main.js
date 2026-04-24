if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/my-shelf/sw.js')
            .then(reg => console.log('SW зарегистрирован!', reg))
            .catch(err => console.log('Ошибка SW:', err));
    });
}

import './modules/form.js';
import './modules/filtres.js';
import './modules/modals.js';
import './modules/status-glider.js';
import './modules/navigation.js';
import './modules/tags-trops.js';
import './modules/theme.js';
import './modules/ui-helpers.js';
import './modules/randomBook.js';
import './modules/editBook.js';
import './modules/storage.js';
import './modules/library.js';



import { renderBooks } from './modules/library.js';

renderBooks();

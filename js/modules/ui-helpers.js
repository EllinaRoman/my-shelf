const bookCoverInput = document.querySelector('.add-book_cover');
const imgPreview = document.querySelector('.cover-preview');
const label = document.querySelector('.add-book_label-cover');

bookCoverInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    console.log('Файл выбран:', file);
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            imgPreview.src = reader.result;
            imgPreview.classList.remove('hidden');
            label.style.fontSize = '0';
        };
        reader.readAsDataURL(file);
    } else {
        imgPreview.src = "";
        imgPreview.classList.add('hidden');
        label.style.fontSize = '';
    }
});

export const getBookDesign = () => {
    const chance = Math.random() * 100;
    let hue;
    if (chance < 25) {
        hue = Math.floor(Math.random() * 40 + 310);
    } else if (chance < 50) {
        hue = Math.floor(Math.random() * 50 + 240);
    } else if (chance < 75) {
        hue = Math.floor(Math.random() * 40 + 180);
    } else {
        hue = Math.floor(Math.random() * 50 + 80);
    }
    return hue;
};
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
            imgPreview.style.display = "block";
            label.style.fontSize = '0';
        };
        reader.readAsDataURL(file);
    } else {
        imgPreview.src = "";
        imgPreview.style.display = "none";
        label.style.fontSize = '';
    }
})

const getBookDesign = () => {
    const isPink = Math.random() > 0.5;
    const hue = isPink ? Math.floor(Math.random() * 20 + 325) : Math.floor(Math.random() * 20 + 265);
    return `hsl(${hue}, 70%, 80%)`;
}
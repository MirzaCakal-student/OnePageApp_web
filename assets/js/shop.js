

const purchaseButtons = document.querySelectorAll('.btn-buy');
const modalTitle = document.querySelector('#purchaseModalLabel');
        
purchaseButtons.forEach(button => {
    button.addEventListener('click', function() {
    const title = this.getAttribute('data-title');
    modalTitle.textContent = `${title} Purchase`;
    });
});

     
function toggleDescription(button) {
    const moreText = button.nextElementSibling;
    const isVisible = moreText.style.display === 'block';
    moreText.style.display = isVisible ? 'none' : 'block';
    button.textContent = isVisible ? 'View More' : 'View Less';
}

        
const galleryImages = document.querySelectorAll('.interactive-gallery');
galleryImages.forEach(image => {
    image.addEventListener('click', function() {
        const imageUrl = this.getAttribute('data-bs-image');
        const modalImage = document.getElementById('modal-image');
        modalImage.src = imageUrl;
    });
});
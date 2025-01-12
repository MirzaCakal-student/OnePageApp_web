const themeSwitch = document.getElementById('themeSwitch');
const modeLabel = document.getElementById('modeLabel');
        
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        modeLabel.textContent = 'Light Mode'; 
    } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        modeLabel.textContent = 'Dark Mode'; 
        }
});

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
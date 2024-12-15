let currentSlideIndex = 1;

function openModal() {
    document.getElementById("imageModal").style.display = "flex";
    showSlide(currentSlideIndex);
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

function plusSlides(n) {
    showSlide(currentSlideIndex += n);
}

function setCurrentSlide(n) {
    showSlide(currentSlideIndex = n);
}

function showSlide(n) {
    const slides = document.getElementsByClassName("popup-slide");
    if (n > slides.length) { currentSlideIndex = 1 }
    if (n < 1) { currentSlideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[currentSlideIndex - 1].style.display = "block";
}

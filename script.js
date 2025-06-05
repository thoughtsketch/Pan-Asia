window.onload = function () {
    document.getElementById("contactModal").style.display = "flex";
  };

  function closeModal() {
    document.getElementById("contactModal").style.display = "none";
  }

// Hero Carousel Functionality
(function() {
  const slides = document.querySelectorAll('.carousel-item');
  const dots = document.querySelectorAll('.carousel-container [data-slide]');
  let currentIndex = 0;
  let intervalId;
  const intervalTime = 4000; // 4 seconds

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
        slide.style.opacity = '1';
        slide.style.zIndex = '10';
      } else {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.zIndex = '0';
      }
    });
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.remove('bg-white/50', 'scale-90');
        dot.classList.add('bg-white', 'scale-100');
      } else {
        dot.classList.remove('bg-white', 'scale-100');
        dot.classList.add('bg-white/50', 'scale-90');
      }
    });
    currentIndex = index;
  }

  function nextSlide() {
    let next = (currentIndex + 1) % slides.length;
    showSlide(next);
  }

  function startAutoPlay() {
    intervalId = setInterval(nextSlide, intervalTime);
  }

  function stopAutoPlay() {
    clearInterval(intervalId);
  }

  // Dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      stopAutoPlay();
      startAutoPlay();
    });
  });

  // Initialize
  if (slides.length > 0 && dots.length > 0) {
    showSlide(0);
    startAutoPlay();
  }
})();

// Function to open the modal
function openModal() {
    document.getElementById('contactModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Function to close the modal
function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
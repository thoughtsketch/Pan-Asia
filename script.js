let formSubmitted = false;

window.onload = function () {
    document.getElementById("contactModal").style.display = "flex";
  };

  function closeModal() {
    document.getElementById("contactModal").style.display = "none";
    document.body.style.overflow = 'auto';
  }

// Hero Carousel Functionality
(function() {
    const carouselBody = document.getElementById('carouselBody');
    const slides = document.querySelectorAll('.hs-carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let intervalId;
    const intervalTime = 4000; // 4 seconds

    function showSlide(index) {
        // Calculate the transform value
        const transformValue = -index * 100;
        carouselBody.style.transform = `translateX(${transformValue}%)`;

        // Update dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.remove('opacity-50');
                dot.classList.add('opacity-100');
            } else {
                dot.classList.remove('opacity-100');
                dot.classList.add('opacity-50');
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

// Add phone number input handling
document.getElementById("mobile").addEventListener("input", function(e) {
  // Remove any non-digit characters
  let value = e.target.value.replace(/\D/g, '');
  
  // Limit to 10 digits
  if (value.length > 10) {
    value = value.slice(0, 10);
  }
  
  // Update input value
  e.target.value = value;
});

// Function to handle form submission
document.getElementById("contactForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent default form submission

  console.log("Form submission started");

  if (formSubmitted) {
    console.log("Form already submitted, preventing duplicate submission");
    alert("Form already submitted!");
    return;
  }

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  let mobile = document.getElementById("mobile").value.trim();
  const termsChecked = document.getElementById("termsCheckbox").checked;

  // Remove any non-digit characters
  mobile = mobile.replace(/\D/g, '');

  console.log("Form Data:", {
    name,
    email,
    mobile,
    termsChecked
  });

  // Validate required fields
  if (!name || !email || !mobile || !termsChecked) {
    console.log("Validation failed - missing required fields");
    alert("All fields are required, and you must accept the terms.");
    return;
  }

  // Validate phone number (must be exactly 10 digits)
  if (mobile.length !== 10) {
    console.log("Validation failed - phone number must be exactly 10 digits");
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  console.log("Form validation passed");

  // Additional fixed fields
  const project = "Codename North Hinjewadi"; // Updated project name
  const source = "Website"; // Fixed source value

  // Add +91 prefix to mobile number
  mobile = `+91${mobile}`;

  // Payload to send
  const payload = { name, email, mobile, project, source };
  console.log("Prepared payload:", payload);

  try {
    console.log("Attempting to send email...");
    // Step 1: Always send data to email via PHP backend, even if API fails
    const emailHandlerUrl = "/emailHandler.php"; // Update with correct PHP script path
    const emailResponse = await fetch(emailHandlerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(payload), // Convert JSON to URL-encoded string
    });

    if (!emailResponse.ok) {
      const emailError = await emailResponse.json();
      console.error("Email sending failed:", emailError);
      throw new Error(emailError.message || "Failed to send email");
    }
    const emailResult = await emailResponse.json();
    console.log("Email sent successfully:", emailResult);
  } catch (error) {
    console.error("Email Error:", error.message);
  }

  try {
    console.log("Attempting to send data to API...");
    // Step 2: Try sending data to API
    const apiUrl = "https://maestro-realtek.turbo.8ease.co/public/companies/1dc9b9ef-c91a-4f4e-8cde-3020ed6747d2/leads-all";
    const apiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!apiResponse.ok) {
      console.error("API request failed:", await apiResponse.text());
      throw new Error("Failed to submit data to API");
    }
    const apiResult = await apiResponse.json();
    console.log("Data sent to API successfully:", apiResult);
  } catch (error) {
    console.error("API Error:", error.message);
  }

  console.log("Form submission completed, redirecting to thank you page");
  // Step 3: Redirect to thank-you page regardless of errors
  formSubmitted = true; // Mark the form as submitted
  window.location.href = "thank-you.html"; // Redirect to thank-you page
});

// Gallery Scroll Function
function scrollGallery(direction) {
  const container = document.getElementById('galleryContainer');
  const itemWidth = container.querySelector('.flex-none').offsetWidth;
  const gap = 16; // 1rem gap between items
  const scrollAmount = (itemWidth + gap) * 3; // Scroll by 3 items at a time
  
  if (direction === 'left') {
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  } else {
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
}
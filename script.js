/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Function to close the menu if clicked outside
function closeMenuOnClickOutside(event) {
  var topnav = document.getElementById("myTopnav");
  // Check if the click is outside the topnav and if the menu is open
  if (topnav.className.includes("responsive") && !topnav.contains(event.target)) {
    topnav.className = "topnav"; // Close the menu
  }
}

// Attach the event listener to the document to detect clicks outside
document.addEventListener("click", closeMenuOnClickOutside);

// Debounce function to limit the rate at which a function is called
    function debounce(func, delay) {
      let timeoutId;
      return function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
      };
    }
    
// JavaScript to change the class based on content height and window height
//     function adjustClass() {
//     var footer = document.getElementById("footer");
//     var contentHeight = document.body.scrollHeight; // Total content height, including padding
//     var windowHeight = window.innerHeight; // Height of the window

//     if (contentHeight <= windowHeight) {
//         footer.className = "footer-fixed";
//     } else {
//         footer.className = "footer-relative";
//     }
// }

// Initial adjustment on page load
// adjustClass();

// // Event listener for window resize with debounce
// window.addEventListener("resize", debounce(adjustClass, 250));

// Event listener for accessing whatsapp on desktop vs mobile
document.addEventListener("DOMContentLoaded", function() {
    var whatsappLink = document.getElementById("whatsapp-link");
    var phoneNumber = "40766591635"; // Your phone number with country code (no plus sign)

    // Check if the user is on a mobile device
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        whatsappLink.href = "https://wa.me/" + phoneNumber;
    } else {
        whatsappLink.href = "https://web.whatsapp.com/send?phone=" + phoneNumber;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var facebookLink = document.getElementById("facebook-link");
    var facebookPageURL = "https://www.facebook.com/frumix.ro"; // Your Facebook page URL
    var facebookDeepLink = "fb://page/320369184498044"; // Your Facebook page ID in the deep link format

    // Check if the user is on a mobile device
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        facebookLink.href = facebookDeepLink;
        facebookLink.addEventListener("click", function(e) {
            // Attempt to open in the Facebook app
            setTimeout(function() {
                window.location.href = facebookPageURL; // Fallback to browser if app is not installed
            }, 25);
        });
    } else {
        facebookLink.href = facebookPageURL;
    }
});

// Toggle dropdown-bottom content visibility

document.querySelectorAll('.toggle-dropdown').forEach(button => {
  button.addEventListener('click', function() {
    // Only toggle when viewport is 768px or smaller
    if (window.innerWidth <= 768) {
      // Select the following sibling dropdown content for this button
      const dropdownContent = button.parentElement.nextElementSibling;

      // Toggle the 'show' class only if it has the 'dropdown-content-bottom' class
      if (dropdownContent && dropdownContent.classList.contains('dropdown-content-bottom')) {
        dropdownContent.classList.toggle('show');
      }
    }
  });
});

// Search functionality start

document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("search-bar");
    const products = document.querySelectorAll(".produs");

    searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase();
        products.forEach(product => {
            const productName = product.querySelector(".product-name").textContent.toLowerCase();
            if (productName.includes(query)) {
                product.style.display = "block"; // Show matching product
            } else {
                product.style.display = "none"; // Hide non-matching product
            }
        });
    });
});

// Search functionality end

// Banner images rotation

document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "./images/banner-tablouri-canvas-1920x586.jpg", 
        "./images/banner-tablouri-lemn-1920x586.jpg", 
        "./images/banner-coastere-1920x586.jpg"
    ]; // List of image URLs
    const banner = document.getElementById("banner");
    let currentImageIndex = 0;

    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length; // Move to the next image, loop back if at the end
        banner.style.opacity = 0; // Fade out
        setTimeout(() => {
            banner.src = images[currentImageIndex]; // Change image
            banner.style.opacity = 1; // Fade in
        }, 1000); // Matches the CSS transition duration
    }, 10000); // 10-second interval
});

//Banner images rotation end

// Image switching for product page

const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('main-image');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        mainImage.src = thumbnail.src;
    });
});

// Image switching for product page end
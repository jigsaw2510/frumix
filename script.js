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
    function adjustClass() {
    var footer = document.getElementById("footer");
    var contentHeight = document.body.scrollHeight; // Total content height, including padding
    var windowHeight = window.innerHeight; // Height of the window

    if (contentHeight <= windowHeight) {
        footer.className = "footer-fixed";
    } else {
        footer.className = "footer-relative";
    }
}

// Initial adjustment on page load
adjustClass();

// Event listener for window resize with debounce
window.addEventListener("resize", debounce(adjustClass, 250));
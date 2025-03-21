// Navbar toggle
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Close menu when clicked outside
function closeMenuOnClickOutside(event) {
  var topnav = document.getElementById("myTopnav");
  if (topnav.className.includes("responsive") && !topnav.contains(event.target)) {
    topnav.className = "topnav";
  }
}
document.addEventListener("click", closeMenuOnClickOutside);

// WhatsApp link adjustment based on device
document.addEventListener("DOMContentLoaded", function () {
  var whatsappLink = document.getElementById("whatsapp-link");
  var phoneNumber = "40766591635"; // Your phone number

  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    whatsappLink.href = "https://wa.me/" + phoneNumber;
  } else {
    whatsappLink.href = "https://web.whatsapp.com/send?phone=" + phoneNumber;
  }
});

// Facebook link adjustment based on device
document.addEventListener("DOMContentLoaded", function () {
  var facebookLink = document.getElementById("facebook-link");
  var facebookPageURL = "https://www.facebook.com/frumix.ro";
  var facebookDeepLink = "fb://page/320369184498044";

  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    facebookLink.href = facebookDeepLink;
    facebookLink.addEventListener("click", function (e) {
      setTimeout(function () {
        window.location.href = facebookPageURL;
      }, 25);
    });
  } else {
    facebookLink.href = facebookPageURL;
  }
});

// #home, #about, or other hash fragments in the URL 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1); // Get the section ID
    const targetElement = document.getElementById(targetId);

    // Scroll to the target section
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });

    // Use replaceState to remove the hash without reloading the page
    history.replaceState(null, null, ' ');
  });
});

// Navbar scroll hide/show
const menuToggle = document.getElementById("menu-toggle");
const overlayMenu = document.getElementById("overlay-menu");
const menuImage = document.getElementById("menu-image");
const hoverImage = document.getElementById("hover-image");
const menuItems = document.querySelectorAll(".menu-item");
const menuRight = document.getElementById("menu-right");
const scrollIndicator = document.getElementById("scroll-indicator");
const navbar = document.getElementById("navbar");
const siteTitle = document.getElementById("site-title");

let isOpen = false;
let lastScrollTop = 0;

// Get default item ("About")
const defaultItem = document.querySelector('.menu-item[data-image]');

// Toggle menu
menuToggle.addEventListener("click", () => {
  isOpen = !isOpen;
  overlayMenu.classList.toggle("hidden", !isOpen);
  menuToggle.textContent = isOpen ? "✖" : "☰";

  // Hide/show site title
  siteTitle.classList.toggle("hidden", isOpen);

  if (isOpen && defaultItem && hoverImage) {
    // Show default image when menu opens
    const imageUrl = defaultItem.getAttribute("data-image");
    hoverImage.src = imageUrl;
    hoverImage.classList.remove("opacity-0");
    hoverImage.classList.add("opacity-100");
  } else {
    hoverImage.classList.remove("opacity-100");
    hoverImage.classList.add("opacity-0");
    hoverImage.src = "";
  }
});

// Hover to switch image
menuItems.forEach(item => {
  item.addEventListener("mouseenter", () => {
    const imageUrl = item.getAttribute("data-image");
    if (hoverImage && imageUrl) {
      hoverImage.src = imageUrl;
      hoverImage.classList.remove("opacity-0");
      hoverImage.classList.add("opacity-100");
    }
  });

  item.addEventListener("mouseleave", () => {
    if (hoverImage && defaultItem) {
      const defaultImage = defaultItem.getAttribute("data-image");
      hoverImage.src = defaultImage;
    }
  });
});

// Close menu when a menu item is clicked
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    isOpen = false;
    overlayMenu.classList.add("hidden");
    menuToggle.textContent = "☰";
    siteTitle.classList.remove("hidden");
    hoverImage.classList.remove("opacity-100");
    hoverImage.classList.add("opacity-0");
    hoverImage.src = "";
  });
});


//  Hover on empty part of menu-right
menuRight.addEventListener("mouseenter", () => {
  if (hoverImage && defaultItem) {
    const imageUrl = defaultItem.getAttribute("data-image");
    hoverImage.src = imageUrl;
    hoverImage.classList.remove("opacity-0");
    hoverImage.classList.add("opacity-100");
  }
});

menuRight.addEventListener("mouseleave", () => {
  if (hoverImage) {
    hoverImage.classList.remove("opacity-100");
    hoverImage.classList.add("opacity-0");
  }
});

// Scroll logic
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollIndicator) {
    scrollIndicator.classList.toggle("opacity-0", currentScroll > 50);
  }

  if (currentScroll > lastScrollTop) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});



// GSAP Scrolling Name Effect
const scrollContent = document.getElementById("scrollContent");

if (scrollContent) {
  gsap.registerPlugin(ScrollTrigger);

  const animation = gsap.to(scrollContent, {
    xPercent: -50,
    ease: "none",
    duration: 10,
    repeat: -1,
  });

  let lastScroll = window.scrollY;

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: () => {
      const currentScroll = window.scrollY;
      const direction = currentScroll > lastScroll ? -1 : 1;
      animation.timeScale(direction);
      lastScroll = currentScroll;
    },
  });
}

// Osun About Page
gsap.from('.aboutImg' ,{
    opacity:0,
    scale:.5,
    duration:1,
    delay:.5
})

// Osun Titles
gsap.utils.toArray('.title').forEach(title=>{
    gsap.fromTo(title,{
        letterSpacing:'10px',
        opacity:0,
        x:300,
        skewX:65
    },{
        letterSpacing:'0',
        opacity:1,
        x:0,
        skewX:0,
        duration:1,
        delay:.5,
        scrollTrigger:title
    })
})

//Osun Paragraph
gsap.utils.toArray('p').forEach(p=>{
    gsap.fromTo(p,{
        opacity:0,
        x:150,
        skewX:30
    },{
        opacity:1,
        x:0,
        skewX:0,
        duration:1,
        delay:.5,
        scrollTrigger:p

    })
})

// Osun  Character Page
// Character data
const characters = {
  char1: {
    image: "char1.jpg",
    name: "Character One",
    description: "This is the description for Character One."
  },
  char2: {
    image: "char2.jpg",
    name: "Character Two",
    description: "This is the description for Character Two."
  },
  char3: {
    image: "char3.jpg",
    name: "Character Three",
    description: "This is the description for Character Three."
  }
};

// DOM elements
const mainImg = document.getElementById("main-character");
const charName = document.getElementById("character-name");
const charDesc = document.getElementById("character-description");

// Event listener for thumbnails
document.querySelectorAll("[data-id]").forEach(thumb => {
  thumb.addEventListener("click", () => {
    const charId = thumb.getAttribute("data-id");
    const charData = characters[charId];

    // Change image & text
    mainImg.src = charData.image;
    charName.textContent = charData.name;
    charDesc.textContent = charData.description;
  });
});

// Function to update and display current time in hero section
function startTime() {
    const today = new Date(); // Get current date and time
    let h = today.getHours(); // Extract hours
    let m = today.getMinutes(); // Extract minutes
    let s = today.getSeconds(); // Extract seconds
    
    // Add leading zero to minutes if less than 10
    m = checkTime(m);
    // Add leading zero to seconds if less than 10
    s = checkTime(s);
    
    // Display the formatted time in the hero section
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.innerHTML = today.toLocaleString(); // Display full date and time
    }
    
    // Call this function again after 1 second to update continuously
    setTimeout(startTime, 1000);
}

// Helper function to add leading zero if number is less than 10
function checkTime(i) {
    if (i < 10) { 
        i = "0" + i; // Add zero in front of numbers < 10
    }
    return i;
}

// Start the time display when page loads
startTime();

// Mobile Navigation Toggle functionality
const navToggle = document.getElementById('navToggle'); // Get hamburger button
const navMenu = document.getElementById('navMenu'); // Get navigation menu

// Add click event listener to hamburger button
if (navToggle) {
    navToggle.addEventListener('click', function() {
        // Toggle 'active' class to show/hide menu
        navMenu.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Add click event to each internal link
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump behavior
        
        const targetId = this.getAttribute('href'); // Get target section ID
        const targetElement = document.querySelector(targetId); // Find target element
        
        if (targetElement) {
            // Scroll smoothly to target element
            targetElement.scrollIntoView({
                behavior: 'smooth', // Enable smooth scrolling
                block: 'start' // Align to top of viewport
            });
            
            // Close mobile menu if open after clicking a link
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Add scroll event listener to change navbar style on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar'); // Get navbar element
    
    // Add shadow class when scrolled down more than 50px
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'; // Add deeper shadow
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)'; // Reset to original shadow
    }
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
};

// Create intersection observer to animate elements as they come into view
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        // If element is intersecting (visible in viewport)
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1'; // Make element visible
            entry.target.style.transform = 'translateY(0)'; // Move to final position
        }
    });
}, observerOptions);

// Select all cards and info cards to observe
const animatedElements = document.querySelectorAll('.card, .info-card, .policy-card, .schedule-item, .lab-card, .exam-card');

// Set initial state and observe each element
animatedElements.forEach(element => {
    element.style.opacity = '0'; // Start invisible
    element.style.transform = 'translateY(20px)'; // Start below final position
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Add smooth transition
    observer.observe(element); // Start observing this element
});

// Add active class to current navigation item based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section'); // Get all sections
    const navLinks = document.querySelectorAll('.nav-menu a'); // Get all navigation links
    
    let currentSection = ''; // Variable to store current section ID
    
    // Loop through each section to find which one is in viewport
    sections.forEach(section => {
        const sectionTop = section.offsetTop; // Get section's top position
        const sectionHeight = section.clientHeight; // Get section's height
        
        // Check if current scroll position is within this section
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id'); // Store current section ID
        }
    });
    
    // Update active class on navigation links
    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove active from all links
        // Add active class to link matching current section
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active'); // Add active class
        }
    });
});

// Add click counter for tracking engagement (optional feature)
let clickCount = 0; // Initialize click counter
document.addEventListener('click', function(e) {
    // Only count clicks on links and buttons
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        clickCount++; // Increment counter
        console.log('Total clicks:', clickCount); // Log to console (for debugging)
    }
});

// Add keyboard navigation support for accessibility
document.addEventListener('keydown', function(e) {
    // If Escape key is pressed and mobile menu is open
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active'); // Close mobile menu
        navToggle.focus(); // Return focus to toggle button
    }
});

// Add loading animation to external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    // Add click event to external links
    link.addEventListener('click', function() {
        // Add visual feedback (optional - you can customize this)
        this.style.opacity = '0.6'; // Reduce opacity temporarily
        setTimeout(() => {
            this.style.opacity = '1'; // Restore opacity
        }, 300);
    });
});

// Function to highlight schedule items based on current date
function highlightCurrentSchedule() {
    const today = new Date(); // Get current date
    const scheduleItems = document.querySelectorAll('.schedule-item'); // Get all schedule items
    
    scheduleItems.forEach(item => {
        const dateText = item.querySelector('.schedule-date'); // Get date element
        if (dateText) {
            const dateString = dateText.textContent; // Get date text
            // You can add date comparison logic here to highlight current/upcoming classes
            // This is a placeholder for date matching functionality
        }
    });
}

// Call the highlight function on page load
highlightCurrentSchedule();

// Add print-friendly styles when user tries to print
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing'); // Add printing class
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing'); // Remove printing class
});

// Lazy loading for images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target; // Get image element
                if (img.dataset.src) {
                    img.src = img.dataset.src; // Load actual image source
                    img.classList.add('loaded'); // Add loaded class
                    imageObserver.unobserve(img); // Stop observing this image
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add search functionality for the page (optional enhancement)
function searchContent(query) {
    const content = document.body.textContent.toLowerCase(); // Get all page text
    const searchQuery = query.toLowerCase(); // Convert query to lowercase
    
    // Simple search - can be enhanced with highlighting
    if (content.includes(searchQuery)) {
        console.log('Found:', searchQuery); // Log if found
        return true;
    }
    return false;
}

// Add back-to-top button functionality
const backToTop = document.createElement('button'); // Create back to top button
backToTop.innerHTML = '↑'; // Add up arrow
backToTop.className = 'back-to-top'; // Add class
backToTop.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: all 0.3s ease;
`; // Add inline styles

document.body.appendChild(backToTop); // Add button to page

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'block'; // Show button
    } else {
        backToTop.style.display = 'none'; // Hide button
    }
});

// Scroll to top when button is clicked
backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0, // Scroll to top
        behavior: 'smooth' // Smooth scrolling
    });
});

// Add hover effect to back to top button
backToTop.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)'; // Enlarge button
});

backToTop.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)'; // Reset size
});

// Console message for developers
console.log('%c🎓 CS6.302 SSD Course Website', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped for IIIT Hyderabad', 'color: #764ba2; font-size: 14px;');
console.log('%cMonsoon 2025', 'color: #667eea; font-size: 12px;');
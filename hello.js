/* ---------------------------
   TRACK ALL USER EVENTS
   Captures clicks and element views
---------------------------*/
document.addEventListener("DOMContentLoaded", () => { // Wait for DOM to load

    /* ---------------------------
       FUNCTION TO FORMAT CURRENT TIMESTAMP
    ---------------------------*/
    function getTimestamp() {
        return new Date().toISOString(); // Returns ISO formatted timestamp
    }

    /* ---------------------------
       FUNCTION TO LOG EVENT DETAILS
       Logs timestamp, event type, and element info
    ---------------------------*/
    function logEvent(eventType, element) {
        let tagName = element.tagName;                  // HTML tag (DIV, BUTTON, IMG etc.)
        let id = element.id ? `#${element.id}` : '';   // Element ID if exists
        let classes = element.className ? `.${element.className}` : ''; // Classes if exist
        let desc = `${tagName}${id}${classes}`;        // Combined description

        // Additional info for specific element types
        if(tagName === 'IMG') desc += ` [src=${element.src}]`;       // Image source
        if(tagName === 'INPUT') desc += ` [type=${element.type}, value=${element.value}]`; // Input type & value
        if(tagName === 'SELECT') desc += ` [selected=${element.value}]`; // Dropdown selected value
        if(tagName === 'TEXTAREA') desc += ` [value=${element.value}]`; // Textarea content

        // Print log to console
        console.log(`[${getTimestamp()}] Event: ${eventType}, Element: ${desc}`);
    }

    /* ---------------------------
       CAPTURE CLICK EVENTS
       Listens for all click events in the document
    ---------------------------*/
    document.addEventListener("click", (e) => {
        logEvent('click', e.target); // Log click on the target element
    });

    /* ---------------------------
       CAPTURE VIEW EVENTS (INTERSECTION OBSERVER)
       Logs when elements become visible on screen
    ---------------------------*/
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) { // Element is visible
                logEvent('view', entry.target); // Log view event
            }
        });
    }, { threshold: 0.5 }); // Consider element "viewed" if 50% visible

    // Observe all relevant elements on the page
    const allElements = document.querySelectorAll("body *"); // Select all elements inside body
    allElements.forEach(el => observer.observe(el)); // Start observing each element

});

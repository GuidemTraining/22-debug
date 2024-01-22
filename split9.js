// Declare isMaximized variable outside of the toggleView function
let isMaximized = true;

function toggleView() {
    const leftColumn = document.getElementById("leftColumn");

    if (isMaximized) {
        // Switch to split view with a smooth transition
        leftColumn.style.width = '50%';
        leftColumn.classList.remove("maximize");
        isMaximized = false;
        console.log('Switched to split view');
    } else {
        // Switch to full screen with a smooth transition
        leftColumn.style.width = '100%';
        leftColumn.classList.add("maximize");
        isMaximized = true;
        console.log('Switched to full screen');
    }
}

function initializeSplitView() {
    const toggleButton = document.getElementById("toggleView");

    if (toggleButton) {
        // Add a click event listener to the toggle button
        toggleButton.addEventListener("click", toggleView);

        // Optionally, you can also trigger the initial state based on CoursePlayerV2 status
        // For example, if CoursePlayerV2 is in a specific mode, you can set the initial state accordingly
        if (CoursePlayerV2.isInSplitViewMode()) {
            toggleView(); // Set to split view
            console.log('Initial state: Split view');
        } else {
            toggleView(); // Set to full screen (change to CoursePlayerV2.isInFullScreenMode() if applicable)
            console.log('Initial state: Full screen');
        }
    } else {
        console.error("Toggle button not found. Retrying in 1 second...");
        // Retry after 1 second
        setTimeout(initializeSplitView, 1000);
    }
}

// Check if CoursePlayerV2 is defined
if (typeof(CoursePlayerV2) !== 'undefined') {
    // Add a delay of 1 second (1000 milliseconds) to ensure DOM is fully loaded
    setTimeout(initializeSplitView, 1000);
} else {
    // CoursePlayerV2 is not defined, you can add fallback behavior here
    console.log("CoursePlayerV2 is not available.");
}

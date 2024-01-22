// Declare isMaximized variable outside of the toggleView function
let isMaximized = true;
let isCoursePlayerV2Available = false;

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
        console.error("Toggle button not found.");
    }
}

// Check if CoursePlayerV2 is defined
if (typeof(CoursePlayerV2) !== 'undefined') {
    isCoursePlayerV2Available = true;
    initializeSplitView();
} else {
    console.log("CoursePlayerV2 is not available. Waiting for hooks:contentDidChange event...");

    // Wait for the hooks:contentDidChange event
    document.addEventListener("hooks:contentDidChange", function() {
        console.log("hooks:contentDidChange event received. Initializing split view...");
        isCoursePlayerV2Available = true;
        initializeSplitView();
    });
}

// You can also handle cases where CoursePlayerV2 is not available at all
// by setting a timeout or adding a fallback behavior.

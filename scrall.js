document.addEventListener('DOMContentLoaded', function() {
    // Function to adjust the height of panes
    function adjustPaneHeight() {
        var leftPane = document.getElementById('left-pane');
        var rightPane = document.getElementById('right-pane');

        // Set the height of the panes based on the scrollable content
        leftPane.style.height = leftPane.scrollHeight + 'px';
        rightPane.style.height = rightPane.scrollHeight + 'px';

        // Enable vertical scrolling
        leftPane.style.overflowY = 'auto';
        rightPane.style.overflowY = 'auto';
    }

    // Function to check if CoursePlayerV2 is defined and set up the listener
    function checkCoursePlayerV2() {
        if (typeof(CoursePlayerV2) !== 'undefined') {
            CoursePlayerV2.on('hooks:contentDidChange', adjustPaneHeight);
            adjustPaneHeight(); // Adjust immediately in case content is already loaded
        } else {
            setTimeout(checkCoursePlayerV2, 1000); // Retry after 1 second if not defined
        }
    }

    // Event listeners for window resize and orientation change
    window.addEventListener('resize', adjustPaneHeight);
    window.addEventListener('orientationchange', adjustPaneHeight);

    // Initial setup
    adjustPaneHeight();
    checkCoursePlayerV2();
});

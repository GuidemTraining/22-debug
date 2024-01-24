$(document).ready(function() {
    // Function to adjust left pane height and scrollbar position
    function adjustLeftPaneHeight() {
        console.log("Adjusting left pane height and scrollbar position...");

        // Get the left pane element
        var leftPane = $('#left-pane');

        if (leftPane.length > 0) {
            // Get the left pane's content element
            var leftPaneContent = $('#left-pane-content');

            if (leftPaneContent.length > 0) {
                // Get the current content height
                var contentHeight = leftPaneContent[0].scrollHeight;

                // Get the container height
                var containerHeight = $('.master-container-guidem').height();

                // Calculate the desired scroll position
                var desiredScrollPosition = contentHeight - containerHeight;

                // Set the left pane's height to match the container height
                leftPane.height(containerHeight);
                console.log("Left Pane Height Adjusted: " + containerHeight);

                // Set the left pane content's height to match the container height
                leftPaneContent.height(containerHeight);
                console.log("Left Pane Content Height Adjusted: " + containerHeight);

                // Set the scroll position
                leftPane.scrollTop(desiredScrollPosition);
                console.log("Scroll Position Set: " + desiredScrollPosition);
            }
        }
    }

    // Call adjustLeftPaneHeight on page load
    adjustLeftPaneHeight();

    // Add an event listener for window resize
    window.addEventListener('resize', function() {
        // Call adjustLeftPaneHeight on window resize
        adjustLeftPaneHeight();
    });
});

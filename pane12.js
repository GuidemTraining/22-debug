$(document).ready(function() {
    // Function to adjust left pane height and scrollbar position
    function adjustLeftPaneHeight() {
        console.log("Adjusting left pane height and scrollbar position...");

        // Get the height of the .master-container-guidem element
        var containerHeight = $('.master-container-guidem').height();
        console.log("Container Height: " + containerHeight);

        // Get the left pane element
        var leftPane = $('#left-pane');

        if (leftPane.length > 0) {
            // Get the left pane's content element
            var leftPaneContent = $('#left-pane-content');

            if (leftPaneContent.length > 0) {
                // Set the left pane content's height to match the .master-container-guidem element's height
                leftPaneContent.height(containerHeight);
                console.log("Left Pane Content Height Adjusted: " + containerHeight);

                // Calculate the desired scroll position (adjust as needed)
                var contentHeight = leftPaneContent[0].scrollHeight;
                var desiredScrollPosition = contentHeight - containerHeight;

                // Ensure the desired scroll position is not negative
                desiredScrollPosition = Math.max(0, desiredScrollPosition);
                console.log("Desired Scroll Position: " + desiredScrollPosition);

                // Set the scroll position
                leftPane.scrollTop(desiredScrollPosition);
                console.log("Scroll Position Set: " + desiredScrollPosition);
            }
        }
    }

    // Call adjustLeftPaneHeight on page load
    adjustLeftPaneHeight();

    // Add an event listener for window resize
    $(window).resize(function() {
        // Call adjustLeftPaneHeight on window resize
        adjustLeftPaneHeight();
    });
});

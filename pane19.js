$(document).ready(function() {
    // Function to adjust left pane height and scrollbar position
    function adjustLayout() {
        console.log("Adjusting layout...");

        // Get the height of the .master-container-guidem element
        var containerHeight = $('.master-container-guidem').height();
        console.log("Container Height: " + containerHeight);

        // Get the height of the notification bar
        var notificationBarHeight = $('.notification-bar').outerHeight(true);
        console.log("Notification Bar Height: " + notificationBarHeight);

        // Calculate the available height for left pane
        var availableHeight = containerHeight - notificationBarHeight;
        console.log("Available Height for Left Pane: " + availableHeight);

        // Get the left pane element
        var leftPane = $('#left-pane');

        if (leftPane.length > 0) {
            // Set the left pane's height to the available height
            leftPane.height(availableHeight);
            console.log("Left Pane Height Adjusted: " + availableHeight);

            // Get the left pane's content element
            var leftPaneContent = $('#left-pane-content');

            if (leftPaneContent.length > 0) {
                // Set the left pane content's height
                leftPaneContent.height(availableHeight);
                console.log("Left Pane Content Height Adjusted: " + availableHeight);

                // Calculate the desired scroll position (adjust as needed)
                var desiredScrollPosition = leftPaneContent[0].scrollHeight - availableHeight;
                console.log("Desired Scroll Position: " + desiredScrollPosition);

                // Set the scroll position
                leftPane.scrollTop(desiredScrollPosition);
                console.log("Scroll Position Set: " + desiredScrollPosition);
            }
        }
    }

    // Call adjustLayout on page load
    adjustLayout();

    // Add an event listener for window resize
    $(window).resize(function() {
        // Call adjustLayout on window resize
        adjustLayout();
    });
});

$(document).ready(function () {
    // Function to adjust left pane height and scrollbar position
    function adjustLeftPaneHeight() {
        console.log("Adjusting left pane height and scrollbar position...");

        // Get the height of the .master-container-guidem element
        var containerHeight = $('.master-container-guidem').height();
        console.log("Container Height: " + containerHeight);

        // Get the left pane element
        var leftPane = $('#left-pane');

        if (leftPane.length > 0) {
            // Get the height of the actual content inside the left pane
            var leftPaneContent = $('#left-pane-content');
            var leftPaneContentHeight = leftPaneContent[0].scrollHeight;
            console.log("Left Pane Content Height: " + leftPaneContentHeight);

            // Set the left pane's height to match the .master-container-guidem element's height
            leftPane.height(containerHeight);
            console.log("Left Pane Height Adjusted: " + containerHeight);

            // Calculate the desired scroll position (adjust as needed)
            var desiredScrollPosition = leftPaneContentHeight - containerHeight;
            console.log("Desired Scroll Position: " + desiredScrollPosition);

            // Set the scroll position
            leftPane.scrollTop(desiredScrollPosition);
            console.log("Scroll Position Set: " + desiredScrollPosition);
        }
        
        // Calculate the height of the content inside the "pane-container" div
        var paneContainer = $('.pane-container');
        var paneContainerHeight = paneContainer[0].scrollHeight;
        console.log("Pane Container Content Height: " + paneContainerHeight);
    }

    // Call adjustLeftPaneHeight on page load
    adjustLeftPaneHeight();

    // Add an event listener for window resize
    $(window).resize(function () {
        // Call adjustLeftPaneHeight on window resize
        adjustLeftPaneHeight();
    });
});

$(document).ready(function() {
    // Function to adjust pane content height and scrollbar position
    function adjustPaneContentHeight() {
        console.log("Adjusting pane content height and scrollbar position...");

        // Get the height of the .pane element
        var paneHeight = $('.pane').height();
        console.log("Pane Height: " + paneHeight);

        // Get the pane content element within the current pane
        var paneContent = $('.pane .pane-content');

        if (paneContent.length > 0) {
            // Set the pane content's height to match the .pane element's height
            paneContent.height(paneHeight);
            console.log("Pane Content Height Adjusted: " + paneHeight);

            // Calculate the desired scroll position (adjust as needed)
            var desiredScrollPosition = paneContent[0].scrollHeight - paneHeight;
            console.log("Desired Scroll Position: " + desiredScrollPosition);

            // Set the scroll position
            paneContent.scrollTop(desiredScrollPosition);
            console.log("Scroll Position Set: " + desiredScrollPosition);
        }
    }

    // Call adjustPaneContentHeight on page load
    adjustPaneContentHeight();

    // Add an event listener for window resize
    $(window).resize(function() {
        // Call adjustPaneContentHeight on window resize
        adjustPaneContentHeight();
    });
});

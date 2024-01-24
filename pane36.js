$(document).ready(function() {
    // Function to adjust pane content height and scrollbar position
    function adjustPaneContentHeight() {
        // Get the height of the .pane element
        var paneHeight = $('.pane').height();
        
        // Get the pane content element within the current pane
        var paneContent = $('.pane .pane-content');

        if (paneContent.length > 0) {
            // Set the pane content's height to match the .pane element's height
            paneContent.height(paneHeight);

            // Calculate the desired scroll position (adjust as needed)
            var desiredScrollPosition = paneContent[0].scrollHeight - paneHeight;

            // Set the scroll position
            paneContent.scrollTop(desiredScrollPosition);
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

$(document).ready(function() {
    // Function to adjust pane content heights
    function adjustPaneContentHeight() {
        $('.pane').each(function() {
            var pane = $(this);
            var contentContainer = pane.find('.pane-content');
            var endOfContent = pane.find('.endofcontent');

            // Calculate the height difference between pane and endOfContent
            var heightDifference = endOfContent.offset().top + endOfContent.outerHeight() - contentContainer.offset().top;

            // Set the height of contentContainer to allow scrolling to endOfContent
            contentContainer.height(contentContainer.height() + heightDifference);
        });
    }

    // Call adjustPaneContentHeight on page load
    adjustPaneContentHeight();

    // Add an event listener for window resize
    $(window).resize(function() {
        // Call adjustPaneContentHeight on window resize
        adjustPaneContentHeight();
    });
});

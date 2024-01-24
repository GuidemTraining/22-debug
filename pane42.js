$(document).ready(function() {
    // Function to adjust pane content scrollbar position
    function adjustPaneContentScrollbar() {
        console.log("Adjusting pane content scrollbar position...");

        // Iterate over each .pane
        $('.pane').each(function(index) {
            var pane = $(this);
            var paneContent = pane.find('.pane-content');
            var endOfContent = pane.find('.endofcontent');

            // Calculate the desired scroll position
            var desiredScrollPosition = endOfContent.position().top - paneContent.position().top;

            console.log("Pane " + index + " Desired Scroll Position: " + desiredScrollPosition);

            // Set the scroll position
            paneContent.scrollTop(desiredScrollPosition);

            console.log("Pane " + index + " Scroll Position Set: " + paneContent.scrollTop());
        });
    }

    // Call adjustPaneContentScrollbar on page load
    adjustPaneContentScrollbar();

    // Add an event listener for window resize
    $(window).resize(function() {
        // Call adjustPaneContentScrollbar on window resize
        adjustPaneContentScrollbar();
    });
});

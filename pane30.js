$(document).ready(function() {
    // Function to adjust pane heights
    function adjustPaneHeights() {
        var notificationBarHeight = $('.notification-bar').outerHeight(true);
        var windowHeight = $(window).height();
        var availableHeight = windowHeight - notificationBarHeight;

        // Set the height of each pane
        $('.pane').height(availableHeight);
    }

    // Initial adjustment when the page loads
    adjustPaneHeights();

    // Adjust the pane heights on window resize
    $(window).resize(adjustPaneHeights);
});

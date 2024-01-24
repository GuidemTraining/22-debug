$(document).ready(function() {
    function adjustPaneHeights() {
        // Get the height of the window and the notification bar
        var windowHeight = $(window).height();
        var notificationBarHeight = $('.notification-bar').outerHeight(true);

        // Calculate the available height for the panes
        var availableHeight = windowHeight - notificationBarHeight;

        // Set the height of the panes
        $('.pane').height(availableHeight);
    }

    // Adjust pane heights on page load
    adjustPaneHeights();

    // Re-adjust pane heights on window resize
    $(window).resize(adjustPaneHeights);
});

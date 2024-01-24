$(document).ready(function() {
    function adjustPaneHeights() {
        // Get the height of the window and the notification bar
        var windowHeight = $(window).height();
        var notificationBarHeight = $('.notification-bar').outerHeight(true);

        // Calculate the available height for the panes
        var availableHeight = windowHeight - notificationBarHeight;

        // Set the height of the panes
        $('.pane').height(availableHeight);

        // Calculate and set the height of the content within each pane
        $('.pane').each(function() {
            var pane = $(this);
            var endOfContent = pane.find('.endofcontent');

            if (endOfContent.length > 0) {
                var contentHeight = endOfContent.position().top + endOfContent.outerHeight();
                pane.find('.pane-content').height(contentHeight);
            }
        });
    }

    // Adjust pane heights on page load
    adjustPaneHeights();

    // Re-adjust pane heights on window resize
    $(window).resize(adjustPaneHeights);
});

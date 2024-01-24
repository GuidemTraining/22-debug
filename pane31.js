$(document).ready(function() {
    function adjustPaneHeights() {
        var notificationBarHeight = $('.notification-bar').outerHeight(true);
        var availableHeight = $(window).height() - notificationBarHeight;

        // Adjust the height of the panes
        $('.pane').css('height', availableHeight + 'px');
    }

    // Adjust the pane heights on page load and window resize
    adjustPaneHeights();
    $(window).resize(adjustPaneHeights);
});

$(document).ready(function() {
    // Function to adjust layout
    function adjustLayout() {
        console.log("Adjusting layout...");

        // Get the height of the notification bar
        var notificationBarHeight = $('.notification-bar').outerHeight(true);
        console.log("Notification Bar Height: " + notificationBarHeight);

        // Calculate the available height for the split-container
        var availableHeight = $(window).height() - notificationBarHeight;
        console.log("Available Height for Split-Container: " + availableHeight);

        // Adjust the height of the split-container
        $('.split-container').height(availableHeight);

        // Adjust the height of the left pane
        $('#left-pane').height(availableHeight);

        // Adjust the height of the left pane content
        $('#left-pane-content').height(availableHeight);

        // Log and adjust scroll position as needed
        // ...
    }

    // Call adjustLayout on page load
    adjustLayout();

    // Add an event listener for window resize
    $(window).resize(function() {
        // Call adjustLayout on window resize
        adjustLayout();
    });
});

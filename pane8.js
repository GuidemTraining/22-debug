$(document).ready(function() {
    var leftPaneContent = $('#left-pane-content');
    
    function adjustLeftPaneHeight() {
        var windowHeight = $(window).height();
        var containerHeight = $('.master-container-guidem').height();
        
        // Calculate the available height for the left pane content
        var availableHeight = windowHeight - containerHeight;
        
        // Set the height of the left pane content
        leftPaneContent.height(availableHeight);
    }

    // Initial adjustment
    adjustLeftPaneHeight();

    // Listen for window resize events
    $(window).resize(function() {
        console.log("Window resized. Adjusting left pane height...");
        adjustLeftPaneHeight();
    });

    // Debugging logs
    console.log("Initial left pane height adjustment...");
    console.log("Window Height: " + $(window).height());
    console.log("Container Height: " + $('.master-container-guidem').height());
    console.log("Left Pane Content Height: " + leftPaneContent.height());
});

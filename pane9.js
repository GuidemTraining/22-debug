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

    // Detect when scrollbar reaches the end
    leftPaneContent.scroll(function() {
        var scrollTop = leftPaneContent.scrollTop();
        var scrollHeight = leftPaneContent[0].scrollHeight;
        var clientHeight = leftPaneContent[0].clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            // Scrollbar reached the end
            console.log("Reached the end of content.");
        }
    });

    // Debugging logs
    console.log("Initial left pane height adjustment...");
    console.log("Window Height: " + $(window).height());
    console.log("Container Height: " + $('.master-container-guidem').height());
    console.log("Left Pane Content Height: " + leftPaneContent.height());
});

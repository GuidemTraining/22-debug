$(document).ready(function() {
    // Function to adjust left pane height
    function adjustLeftPaneHeight() {
        setTimeout(function() {
            console.log("Window resized. Adjusting left pane height...");
            
            // Get the window height
            var windowHeight = $(window).height();
            
            // Check if there is an element with id 'left-pane-content'
            var leftPaneContent = $('#left-pane-content');
            
            if (leftPaneContent.length > 0) {
                // Get the content height
                var contentHeight = leftPaneContent.height();
                
                if (contentHeight < windowHeight) {
                    // Calculate remaining space
                    var remainingSpace = windowHeight - contentHeight;
                    
                    // Add padding to the bottom of the content
                    leftPaneContent.css('padding-bottom', remainingSpace + 'px');
                } else {
                    // Remove padding if content is taller than the window
                    leftPaneContent.css('padding-bottom', '0');
                }
            }
        }, 1000); // Delay for 1 second before adjusting
    }

    // Call adjustLeftPaneHeight on page load
    adjustLeftPaneHeight();

    // Add an event listener for window resize
    $(window).resize(function() {
        // Call adjustLeftPaneHeight on window resize
        adjustLeftPaneHeight();
    });

    // If CoursePlayerV2 is defined, set up an event listener for 'hooks:contentDidChange'
    if (typeof CoursePlayerV2 !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function() {
            console.log("Content changed. Adjusting left pane height...");
            
            // Call adjustLeftPaneHeight with passive option
            adjustLeftPaneHeight();
        });
    }
});

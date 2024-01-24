
    $(document).ready(function() {
        // Function to adjust pane content height and scrollbar position
        function adjustPaneContentHeight() {
            console.log("Adjusting pane content height and scrollbar position...");
            
            // Get the window height
            var windowHeight = $(window).height();
            
            // Iterate over each .pane
            $('.pane').each(function() {
                var pane = $(this);
                var paneContent = pane.find('.pane-content');
                var endOfContent = pane.find('.endofcontent');
                
                // Calculate the desired scroll height based on pane content and endofcontent
                var desiredScrollHeight = endOfContent.position().top + endOfContent.height() - paneContent.position().top;
                
                // Set the pane content's height to match the desired scroll height
                paneContent.height(desiredScrollHeight);
                
                // Check if the calculated height exceeds the window height
                if (desiredScrollHeight > windowHeight) {
                    paneContent.css('overflow-y', 'auto');
                } else {
                    paneContent.css('overflow-y', 'hidden');
                }
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

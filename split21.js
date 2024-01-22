$(document).ready(function() {
    var rightPaneVisible = false;

    $('#toggle-button').click(function() {
        if (!rightPaneVisible) {
            // Show the right pane and adjust flex
            $('#right-pane').show();
            $('#left-pane').css('flex', '1');
            rightPaneVisible = true;
        } else {
            // Hide the right pane and maximize the left pane
            $('#right-pane').hide();
            $('#left-pane').css('flex', '1');
            rightPaneVisible = false;
        }
    });

    // Add a 1-second timeout before initializing Course Player V2
    setTimeout(function() {
        // Your Course Player V2 implementation goes here
        if (typeof(CoursePlayerV2) !== 'undefined') {
            CoursePlayerV2.on('hooks:contentDidChange', function(data) {
                // Handle Course Player V2 content change
                console.log('Content changed:', data);
                // Add your Course Player V2 functionality here
            });
        }
    }, 1000); // 1000 milliseconds (1 second) timeout
});

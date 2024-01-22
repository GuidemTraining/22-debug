$(document).ready(function() {
    // Function to toggle the split view
    function toggleSplitView() {
        console.log('Toggling split view.');

        // Check if rightPane is currently visible
        var isRightPaneVisible = !$('#right-pane').is(':hidden');
        console.log('Is rightPane visible before toggle?', isRightPaneVisible);

        // Toggle visibility of the right pane
        $('#right-pane').toggle();

        // Adjust the width of the left pane
        if (isRightPaneVisible) {
            $('#left-pane').css('flex', '2');
        } else {
            $('#left-pane').css('flex', '1');
        }

        console.log('LeftPane flex after toggle:', $('#left-pane').css('flex'));
    }

    // Event handler for the split-button
    $('.split-button').click(function() {
        toggleSplitView();
    });

    // Modify onContentChange to activate the button for split view
    function onContentChange(data) {
        // Example condition: Activate the button if a specific lesson is loaded
        // Replace 'lessonName' and 'Specific Lesson' with your actual property and value
        if (data.lesson && data.lesson.name === 'Specific Lesson') {
            // Show the split-button and handle the split view
            $('.split-button').show();

            if ($('#right-pane').is(':hidden')) {
                // Adjust the width of the left pane if the right pane is hidden
                $('#left-pane').css('flex', '2');
            } else {
                // The right pane is visible, so keep it as is
                $('#left-pane').css('flex', '1');
            }
        } else {
            // Hide the split-button for other lessons
            $('.split-button').hide();
        }
    }

    // Attach the onContentChange event if CoursePlayerV2 is defined
    if (typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', onContentChange);
    }

    // Add this part to handle initial split view state
    function setInitialSplitViewState() {
        // You can modify this logic to determine the initial state
        // For example, if you want the split view to start in split mode, you can remove the next line
        $('#right-pane').hide();
        $('#left-pane').css('flex', '2');
    }

    // Call the function to set the initial split view state
    setInitialSplitViewState();

    // Always show the split-button
    $('.split-button').show();
});

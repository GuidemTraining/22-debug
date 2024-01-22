$(document).ready(function() {
    var courseData = {};

    // Function to toggle the split view
    function toggleSplitView() {
        console.log('Toggling split view.');

        // Check if rightPane is currently visible
        var isRightPaneVisible = !$('#rightPane').hasClass('d-none');
        console.log('Is rightPane visible before toggle?', isRightPaneVisible);

        // Toggle visibility of the right pane
        $('#rightPane').toggleClass('d-none');

        // Adjust the width of the left pane
        if (isRightPaneVisible) {
            $('#leftPane').removeClass('col-6').addClass('col-12');
        } else {
            $('#leftPane').removeClass('col-12').addClass('col-6');
        }

        console.log('LeftPane class after toggle:', $('#leftPane').attr('class'));
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
            
            if ($('#rightPane').hasClass('d-none')) {
                // Adjust the width of the left pane if the right pane is hidden
                $('#leftPane').removeClass('col-12').addClass('col-6');
            } else {
                // The right pane is visible, so keep it as is
                $('#leftPane').removeClass('col-6').addClass('col-12');
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
        $('#rightPane').addClass('d-none');
        $('#leftPane').addClass('col-12');
    }

    // Call the function to set the initial split view state
    setInitialSplitViewState();

    // Always show the split-button
    $('.split-button').show();
});

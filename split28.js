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

    // Event delegation for the split-button
    $(document).on('click', '.split-button', function() {
        toggleSplitView();
    });

    // Modify onContentChange to activate the button for split view
    function onContentChange(data) {
        // Example condition: Activate the button if a specific lesson is loaded
        // Replace 'lessonName' and 'Specific Lesson' with your actual property and value
        if (data.lesson && data.lesson.name === 'Specific Lesson') {
            $('.split-button').show(); // Show the split-button
        } else {
            $('.split-button').hide(); // Hide the split-button for other lessons
        }
    }

    // Attach the onContentChange event if CoursePlayerV2 is defined
    if (typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', onContentChange);
    }
});

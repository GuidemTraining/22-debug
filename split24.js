$(document).ready(function() {
    var courseData = {};

    // Function to show/activate the toggleSplitView button
    function activateToggleSplitViewButton() {
        $('#toggleView').show();  // Show the button
    }

    // Define the onContentChange function
    function onContentChange(data) {
        console.log('Content changed', data);

        // Example condition: Activate the button if a specific lesson is loaded
        // Replace 'lessonName' and 'Specific Lesson' with your actual property and value
        if (data.lesson && data.lesson.name === 'Specific Lesson') {
            activateToggleSplitViewButton();
        }
    }

    function toggleSplitView() {
        console.log('Toggling split view.');

        // Check if rightColumn is currently visible
        var isRightColumnVisible = !$('#rightColumn').hasClass('d-none');
        console.log('Is rightColumn visible before toggle?', isRightColumnVisible);

        // Toggle visibility of the right column
        $('#rightColumn').toggleClass('d-none');

        // Adjust the width of the left column
        if (isRightColumnVisible) {
            $('#leftColumn').removeClass('col-6').addClass('col-12');
        } else {
            $('#leftColumn').removeClass('col-12').addClass('col-6');
        }

        console.log('LeftColumn class after toggle:', $('#leftColumn').attr('class'));
    }

    // Event handler for the toggle button
    $('#toggleView').click(function() {
        toggleSplitView();
        // Optionally, change the button text or style if needed
        $(this).text($(this).text() === 'Toggle Split View' ? 'Toggle Single View' : 'Toggle Split View');
    });

    // Initially hide the toggle button
    $('#toggleView').hide();

    // Check if CoursePlayerV2 is defined and attach the onContentChange event
    if (typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', onContentChange);
    }
});

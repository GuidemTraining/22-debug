$(document).ready(function() {
    var courseData = {};

    // ... (Your existing code for addClipboardButton, onContentChange, etc.)

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

    $('#toggleView').click(function() {
        toggleSplitView();
        // Optionally, toggle the button text or style if needed
        $(this).text($(this).text() === 'Toggle Split View' ? 'Toggle Single View' : 'Toggle Split View');
    });

    // ... (Rest of your existing code)

    if (typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', onContentChange);
    }

    // Add clipboard buttons on page load
    toggleSplitView();
});

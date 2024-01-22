$(document).ready(function() {
    // Function to toggle split-view classes
    function toggleSplitView() {
        var leftCol = $('#leftColumn');
        var rightCol = $('#rightColumn');

        // Check if the left column is full-width
        if (leftCol.hasClass("col-12")) {
            leftCol.removeClass("col-12").addClass("col-6");
            rightCol.removeClass("d-none").addClass("col-6");
            // In case you are using Bootstrap 4 or 5, you might need to handle 'd-flex' class as well
            rightCol.addClass('d-flex').removeClass('d-none');
        } else {
            leftCol.removeClass("col-6").addClass("col-12");
            rightCol.removeClass("col-6").addClass("d-none");
            // In case you are using Bootstrap 4 or 5, you might need to handle 'd-flex' class as well
            rightCol.addClass('d-none').removeClass('d-flex');
        }
    }

    // Bind the toggle function to the button's click event
    // We check if CoursePlayerV2 is defined and then bind within the contentDidChange hook
    if (typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function(data) {
            console.log("Content did change. Setting up the toggle button...");

            // Set up the toggle button when the content changes
            $('#toggleView').off('click').on('click', toggleSplitView);
        });
    } else {
        // Directly set up the toggle button if CoursePlayerV2 is not defined
        $('#toggleView').on('click', toggleSplitView);
    }
});

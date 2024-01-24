$(document).ready(function() {
    // Function to adjust padding and show "End" element
    function adjustPadding() {
        var windowHeight = $(window).height();
        var contentHeight = $("#left-pane-content").height(); // Adjust the selector as needed

        if (contentHeight < windowHeight) {
            var padding = windowHeight - contentHeight;
            $("#left-pane").css("padding-bottom", padding + "px");
            $("#right-pane").css("padding-bottom", padding + "px");
            $(".endofcontent").show(); // Show the "End" element
        } else {
            $("#left-pane").css("padding-bottom", "0");
            $("#right-pane").css("padding-bottom", "0");
            $(".endofcontent").hide(); // Hide the "End" element
        }
    }

    // Initial adjustment
    adjustPadding();

    // Handle window resize
    $(window).resize(function() {
        adjustPadding();
    });

    // Handle content change event (if using CoursePlayerV2)
    if (typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function() {
            adjustPadding();
        });
    }
});

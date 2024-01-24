$(document).ready(function() {
    // Function to adjust padding and show/hide "End" element
    function adjustPaddingAndEnd() {
        var $leftPane = $("#left-pane");
        var $leftPaneContent = $("#left-pane-content"); // Adjust the selector as needed
        var $endOfContent = $(".endofcontent");

        // Calculate the scroll position and content height
        var scrollTop = $leftPane.scrollTop();
        var contentHeight = $leftPaneContent.height();
        var paneHeight = $leftPane.height();

        if (contentHeight - scrollTop <= paneHeight) {
            // Scrollbar is at the bottom, show "End" element
            $leftPane.css("padding-bottom", "150px"); // Adjust the padding as needed
            $endOfContent.show();
        } else {
            // Scrollbar is not at the bottom, hide "End" element
            $leftPane.css("padding-bottom", "0");
            $endOfContent.hide();
        }
    }

    // Initial adjustment
    adjustPaddingAndEnd();

    // Handle window resize
    $(window).resize(function() {
        adjustPaddingAndEnd();
    });

    // Handle scroll event
    $("#left-pane").scroll(function() {
        adjustPaddingAndEnd();
    });

    // Handle content change event (if using CoursePlayerV2)
    if (typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function() {
            adjustPaddingAndEnd();
        });
    }
});

$(document).ready(function() {
    // Function to adjust padding based on content height
    function adjustPadding() {
        const leftPane = document.getElementById('left-pane');
        const rightPane = document.getElementById('right-pane');
        const windowHeight = window.innerHeight;
        const contentHeight = leftPane.scrollHeight;

        if (contentHeight < windowHeight) {
            const padding = windowHeight - contentHeight;
            leftPane.style.paddingBottom = padding + 'px';
            rightPane.style.paddingBottom = padding + 'px';
        } else {
            leftPane.style.paddingBottom = '0';
            rightPane.style.paddingBottom = '0';
        }
    }

    // Call adjustPadding when the document is ready
    adjustPadding();

    // Call adjustPadding on window resize
    $(window).on('resize', adjustPadding);

    // Check if CoursePlayerV2 is defined and listen for contentDidChange event
    if (typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', function() {
            // Call adjustPadding when content changes
            adjustPadding();
        });
    }
});

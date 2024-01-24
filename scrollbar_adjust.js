
$(document).ready(function() {
    function adjustScrollbarHeight() {
        $(".pane").each(function() {
            var pane = $(this);
            var scrollbarContainer = pane.find(".pane-content");
            var endOfContent = pane.find(".endofcontent");

            // Calculate the height from the top of the pane to the endofcontent
            var heightToContentEnd = endOfContent.position().top;

            // Set the max-height of the scrollbar container
            scrollbarContainer.css("max-height", heightToContentEnd + "px");
        });
    }

    // Call the function on page load and window resize
    adjustScrollbarHeight();
    $(window).resize(adjustScrollbarHeight);
});

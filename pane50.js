<script>
    $(document).ready(function() {
        function adjustPaneContentHeight() {
            $(".pane").each(function() {
                var pane = $(this);
                var paneContent = pane.find(".pane-content");
                var endOfContent = pane.find(".endofcontent");

                // Calculate the height from the top of the pane to the endofcontent
                var heightToContentEnd = endOfContent.position().top;

                // Set the max-height of pane-content
                paneContent.css("max-height", heightToContentEnd + "px");
            });
        }

        // Call the function on page load and window resize
        adjustPaneContentHeight();
        $(window).resize(adjustPaneContentHeight);
    });
</script>

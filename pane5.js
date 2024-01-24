<script>
  $(document).ready(function() {
    function adjustLeftPaneHeight() {
      var windowHeight = $(window).height();
      var leftPaneContent = $('#left-pane-content')[0];

      if (leftPaneContent) {
        var leftPaneRect = leftPaneContent.getBoundingClientRect();
        var leftPaneHeight = leftPaneRect.height;

        if (leftPaneHeight < windowHeight) {
          // Calculate the remaining space
          var remainingSpace = windowHeight - leftPaneHeight;
          leftPaneContent.style.paddingBottom = remainingSpace + 'px';
        } else {
          leftPaneContent.style.paddingBottom = '0';
        }
      }
    }

    // Call the adjustLeftPaneHeight function on page load
    adjustLeftPaneHeight();

    // Call the adjustLeftPaneHeight function on window resize
    $(window).resize(adjustLeftPaneHeight);

    // Trigger adjustLeftPaneHeight when the content changes (if using CoursePlayerV2)
    if (typeof(CoursePlayerV2) !== 'undefined') {
      CoursePlayerV2.on('hooks:contentDidChange', adjustLeftPaneHeight);
    }
  });
</script>

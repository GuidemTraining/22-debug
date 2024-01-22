$(document).ready(function() {
    $('.split-button').click(function() {
        $('#rightPane').toggleClass('d-none');
        var isRightPaneVisible = !$('#rightPane').hasClass('d-none');

        // Adjusting the left pane width
        if (isRightPaneVisible) {
            $('#leftPane').removeClass('col-12').addClass('col-6');
        } else {
            $('#leftPane').removeClass('col-6').addClass('col-12');
        }
    });
});

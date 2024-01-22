<script>
$(document).ready(function() {
    console.log('Document is ready.');

    $('#toggleView').click(function() {
        console.log('Toggle button clicked.');

        // Check if rightColumn is currently visible
        console.log('Is rightColumn visible before toggle?', !$('#rightColumn').hasClass('d-none'));

        // Toggle visibility of the right column
        $('#rightColumn').toggleClass('d-none');

        // Check if rightColumn is now visible after toggle
        console.log('Is rightColumn visible after toggle?', !$('#rightColumn').hasClass('d-none'));

        // Adjust the width of the left column
        if ($('#rightColumn').hasClass('d-none')) {
            $('#leftColumn').removeClass('col-6').addClass('col-12');
            console.log('LeftColumn class after toggle:', $('#leftColumn').attr('class'));
        } else {
            $('#leftColumn').removeClass('col-12').addClass('col-6');
            console.log('LeftColumn class after toggle:', $('#leftColumn').attr('class'));
        }
    });
});
</script>

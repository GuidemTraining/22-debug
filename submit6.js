$(document).ready(function() {
    var completedTasks = 0; // Initialize completed tasks
    var totalTasks = $('.guidem-button').not('.completed-button').length; // Count total tasks that are not completed

    // Function to update the progress bar
    function updateProgressBar() {
        const progressPercentage = completedTasks / totalTasks * 100;
        $('#progress-bar').css('width', progressPercentage + '%'); // Update the width of the progress bar
        $('#progress-text').text(`Your Progress: ${completedTasks}/${totalTasks}`); // Update the text below the progress bar
    }

    // Function to handle showing hints
    function showHintModal(questionId) {
        // This is a placeholder for your hint logic
        var hint = "Hint for question ID " + questionId;
        // ... your hint logic goes here ...

        $('#hintModal').remove(); // Remove any existing modals
        var modalHtml = `
            <div class="modal fade" id="hintModal" tabindex="-1" aria-labelledby="hintModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="hintModalLabel">Hint</h5>
                        </div>
                        <div class="modal-body">${hint}</div>
                    </div>
                </div>
            </div>`;
        $('body').append(modalHtml); // Append the new modal to the body
        $('#hintModal').modal('show'); // Show the modal
    }

    // Event handler for the submit button
    $(document).on('click', '.guidem-button', function() {
        var $button = $(this);
        var $form = $button.closest('.guidem-form');
        var inputValue = $form.find('input[type="text"]').val().trim();
        var questionId = $form.data('question-id');

        if (!inputValue) {
            // Handle empty input
            return;
        }

        // Simulating an AJAX call with a timeout
        // Replace this with your actual AJAX call
        setTimeout(function() {
            // Simulate a correct answer response
            var isCorrect = true; // Replace with actual response data

            if (isCorrect) {
                completedTasks++; // Increment the completed tasks
                $button.addClass('completed-button').prop('disabled', true).text('Completed');
                updateProgressBar(); // Update the progress bar
            } else {
                // Handle incorrect answer
            }
        }, 500);
    });

    // Event handler for the hint button
    $(document).on('click', '.guidem-hint-button', function() {
        var $form = $(this).closest('.guidem-form');
        var questionId = $form.data('question-id');
        showHintModal(questionId); // Show the hint modal
    });

    // Initial call to set the progress bar
    updateProgressBar();
});

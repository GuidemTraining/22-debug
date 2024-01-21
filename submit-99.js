$(document).ready(function() {
    var courseId, courseName, courseSlug, lessonId, lessonName, lessonSlug, chapterName, chapterId, userId, userName, userEmail, userFirstName;
    var incorrectAttempts = 0;
    var banEndTime = 0;
    var completedTasks = 0;
    var totalTasks = $('.guidem-button').length;

    // Function to update the progress bar
    function updateProgressBar() {
        const progressPercentage = (completedTasks / totalTasks) * 100;
        $('#progress-bar').css('width', progressPercentage + '%');
        $('#progress-text').text(`Your Progress: ${completedTasks}/${totalTasks}`);
    }

    // Function to show hint modal
    function showHintModal(questionId, hint) {
        $('#hintModal').remove();
        const modal = `
            <div class="modal fade custom-modal" id="hintModal" tabindex="-1" aria-labelledby="hintModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="hintModalLabel">Hint</h5>
                        </div>
                        <div class="modal-body">
                            ${hint}
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('body').append(modal);
        $('#hintModal').modal('show');
    }

    // Click event handler for submit buttons
    $(document).on('click', '.guidem-button', function() {
        var clickedButton = $(this);
        if (clickedButton.text() === 'Completed' || clickedButton.prop('disabled')) {
            return;
        }

        const form = clickedButton.closest('.guidem-form');
        const inputValue = form.find('input[type="text"]').val().trim();
        const questionId = form.data('question-id');

        if (isBanned()) {
            toastr.error(`Hi ${userFirstName}, you are temporarily banned from submitting answers.`);
            return;
        } else if (inputValue === '') {
            toastr.error(`Hi ${userFirstName}, please enter an answer.`);
            return;
        }

        // AJAX request to submit data
        $.ajax({
            url: 'https://sb1.guidem.ph/submitdata',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                courseId: courseId,
                courseName: courseName,
                courseSlug: courseSlug,
                lessonId: lessonId,
                lessonName: lessonName,
                lessonSlug: lessonSlug,
                chapterId: chapterId,
                chapterName: chapterName,
                userId: userId,
                userEmail: userEmail,
                questionId: questionId,
                answer: inputValue
            }),
            success: function(response) {
                if (response.isCorrect === true) {
                    completedTasks++;
                    form.find('input[type="text"]').prop('disabled', true);
                    clickedButton.text('Completed').css('background-color', 'green').prop('disabled', true);
                    toastr.success(`Hi ${userFirstName}, correct answer`);
                    resetIncorrectAttempts();
                } else {
                    toastr.error(`Hi ${userFirstName}, incorrect answer`);
                    incorrectAttempts++;
                    setTimeout(resetIncorrectAttempts, 5000);
                }
                updateProgressBar();
            },
            error: function(xhr, status, error) {
                toastr.error(`Hi ${userFirstName}, error sending data`);
            }
        });
    });

    // Click event handler for hint buttons
    $(document).on('click', '.guidem-hint-button', function() {
        const form = $(this).closest('.guidem-form');
        const questionId = form.data('question-id');
        let hint = "No hint available for this question.";
        
        // Custom hints for each questionId
        if (questionId === 1) {
            hint = "Hint for Question 1.";
        } else if (questionId === 2) {
            hint = "Hint for Question 2.";
        }

        showHintModal(questionId, hint);
    });

    // Function to check if the user is currently banned
    function isBanned() {
        const currentTime = Date.now();
        return banEndTime > currentTime;
    }

    // Function to reset the incorrect attempts counter and ban end time
    function resetIncorrectAttempts() {
        incorrectAttempts = 0;
        banEndTime = 0;
    }

    // Initialize Toastr notifications
    toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
    };

    // Initial progress bar update
    updateProgressBar();
});

$(document).ready(function() {
    var courseId, courseName, courseSlug, lessonId, lessonName, lessonSlug, chapterName, chapterId, userId, userName, userEmail, userFirstName;
    var incorrectAttempts = 0;
    var banEndTime = 0;
    var completedTasks = 0;
    var totalTasks = $('.guidem-button').length;

    function isBanned() {
        const currentTime = Date.now();
        return banEndTime > currentTime;
    }

    function resetIncorrectAttempts() {
        incorrectAttempts = 0;
        banEndTime = 0;
    }

    function updateProgressBar() {
        const progressPercentage = (completedTasks / totalTasks) * 100;
        $('#progress-bar').css('width', progressPercentage + '%');
        $('#progress-text').text(`Your Progress: ${completedTasks}/${totalTasks}`);
    }

    function showHintModal(questionId) {
        // Define hints for each questionId or fetch from server
        var hints = {
            1: "This is the hint for question 1",
            2: "This is the hint for question 2"
            // Add more hints as needed
        };
        var hint = hints[questionId] || "No hint available for this question.";
        $('#hintModal').remove();
        var modalHtml = `
            <div class="modal fade" id="hintModal" tabindex="-1" role="dialog" aria-labelledby="hintModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="hintModalLabel">Hint for Question ${questionId}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ${hint}
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('body').append(modalHtml);
        $('#hintModal').modal('show');
    }

    // Event listener for submit button click
    $('.guidem-button').click(function() {
        var $this = $(this);
        if ($this.text() === 'Completed' || $this.prop('disabled')) {
            return;
        }

        if (isBanned()) {
            toastr.error(`Hi ${userFirstName}, you are temporarily banned from submitting answers.`);
            return;
        }

        var $form = $this.closest('.guidem-form');
        var answer = $form.find('input[type="text"]').val().trim();
        var questionId = $form.data('question-id');

        if (!answer) {
            toastr.error(`Hi ${userFirstName}, please enter an answer.`);
            return;
        }

        // Replace with your actual submission endpoint and request body
        $.ajax({
            url: 'https://your-endpoint.com/submit-answer',
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
                answer: answer
            }),
            success: function(response) {
                if (response.isCorrect) {
                    completedTasks++;
                    updateProgressBar();
                    $this.text('Completed').css('background-color', 'green').prop('disabled', true);
                    toastr.success(`Hi ${userFirstName}, correct answer!`);
                } else {
                    toastr.error(`Hi ${userFirstName}, incorrect answer. Try again!`);
                    incorrectAttempts++;
                    if (incorrectAttempts >= 3) {
                        banEndTime = Date.now() + 30000; // Ban for 30 seconds after 3 incorrect attempts
                    }
                }
            },
            error: function() {
                toastr.error(`Hi ${userFirstName}, there was an error submitting your answer.`);
            }
        });
    });

    // Event listener for hint button click
    $('.guidem-hint-button').click(function() {
        var $form = $(this).closest('.guidem-form');
        var questionId = $form.data('question-id');
        showHintModal(questionId);
    });

    // Initial call to set the progress bar
    updateProgressBar();
});

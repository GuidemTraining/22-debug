$(document).ready(function() {
    // Initialization of your variables
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
        completedTasks = $('.guidem-button.completed').length;
        totalTasks = $('.guidem-button').length;
        const progressPercentage = (completedTasks / totalTasks) * 100;
        $('#progress-bar').css('width', progressPercentage + '%');
        $('#progress-text').text(`Your Progress: ${completedTasks}/${totalTasks}`);
    }

    // Setup MutationObserver to dynamically update task count and progress bar
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length || mutation.removedNodes.length) {
                updateProgressBar();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Event handler for clicks on task buttons
    $(document).on('click', '.guidem-button', function() {
        var clickedButton = $(this);
        if (clickedButton.text() === 'Completed' || clickedButton.prop('disabled')) {
            return;
        }

        if (isBanned()) {
            toastr.error(`Hi ${userFirstName}, you are temporarily banned from submitting answers.`);
            return;
        }

        const form = clickedButton.closest('.guidem-form');
        const inputValue = form.find('input[type="text"]').val().trim();
        const questionId = form.data('question-id');

        if (!inputValue) {
            toastr.error(`Hi ${userFirstName}, please enter an answer.`);
            return;
        }

        if (incorrectAttempts > 0) {
            toastr.info(`Whoa, not so fast! 5 Second Cooldown!`, null, { "backgroundColor": "#3498db" });
            return;
        }

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
                if (response.isCorrect) {
                    clickedButton.addClass('completed').text('Completed').css('background-color', 'green').prop('disabled', true);
                    form.find('input[type="text"]').prop('disabled', true);
                    toastr.success(`Hi ${userFirstName}, correct answer!`);
                    resetIncorrectAttempts();
                    updateProgressBar();
                } else {
                    toastr.error(`Hi ${userFirstName}, incorrect answer.`);
                    incorrectAttempts++;
                    setTimeout(resetIncorrectAttempts, 5000);
                }
            },
            error: function() {
                toastr.error(`Hi ${userFirstName}, error sending data.`);
            }
        });
    });

    // Initial update of the progress bar
    updateProgressBar();
});

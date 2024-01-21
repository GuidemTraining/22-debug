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

  function updateProgressBar(completedTasks, totalTasks) {
    const progressPercentage = (completedTasks / totalTasks) * 100;
    $('#progressBar').css('width', progressPercentage + '%').attr('aria-valuenow', progressPercentage);
    $('#progressBarLabel').text(`Progress: ${completedTasks} out of ${totalTasks}`);
  }

  function showHintModal(questionId, hint) {
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

  if (typeof(CoursePlayerV2) !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function(data) {
      courseId = data.course.id;
      courseName = data.course.name;
      courseSlug = data.course.slug;
      lessonId = data.lesson.id;
      lessonName = data.lesson.name;
      lessonSlug = data.lesson.slug;
      chapterName = data.chapter.name;
      chapterId = data.chapter.id;
      userId = data.user.id;
      userName = data.user.full_name;
      userEmail = data.user.email;
      userFirstName = data.user.first_name;
    });
  }

  toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-top-right",
  };

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
    if (form.length) {
      const inputValue = String(form.find('input[type="text"]').val());
      const questionId = form.data('question-id');

      if (inputValue.trim() === '') {
        toastr.error(`Hi ${userFirstName}, please enter an answer.`);
        return;
      }

      if (incorrectAttempts > 0) {
        toastr.info(`Whoa not so fast we are hackers too! 5 Second Cooldown!`, null, { "backgroundColor": "#3498db" });
        return;
      }

      var submissionData = {
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
      };

      console.log('Data to be submitted to /submitdata:', submissionData);

      $.ajax({
        url: 'https://sb1.guidem.ph/submitdata',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(submissionData),
        success: function(response) {
          if (response.isCorrect === true) {
            completedTasks++;
            updateProgressBar(completedTasks, totalTasks);
            form.find('input[type="text"]').prop('disabled', true);
            clickedButton.text('Completed').css('background-color', 'green').prop('disabled', true);
            toastr.success(`Hi ${userFirstName}, correct answer`);
            resetIncorrectAttempts();
          } else {
            toastr.error(`Hi ${userFirstName}, incorrect answer`);
            incorrectAttempts++;
            setTimeout(function() {
              resetIncorrectAttempts();
            }, 5000);
          }
          console.log('Response from /submitdata:', response);
        },
        error: function(xhr, status, error) {
          toastr.error(`Hi ${userFirstName}, error sending data`);
        }
      });
    }
  });

  $(document).on('click', '.guidem-hint-button', function() {
    const form = $(this).closest('.guidem-form');
    if (form.length) {
      const questionId = form.data('question-id');
      let hint;

      if (questionId === 1) {
        hint = "Hint 1: This is a hint for question ID 1.";
      } else if (questionId === 2) {
        hint = "Hint 2: This is a hint for question ID 2.";
      } else {
        hint = "No hint available for this question.";
      }

      showHintModal(questionId, hint);
    }
  });
});

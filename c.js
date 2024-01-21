// Variables to hold user and lesson data
var userId, courseId, chapterId, lessonId, questionId;

// Variables to hold data for later use
var courseId, courseName, courseSlug, lessonId, lessonName, lessonSlug, chapterName, chapterId, userId, userName, userEmail, userFirstName;
var incorrectAttempts = 0; // Track incorrect attempts
var banEndTime = 0; // Time when the ban ends (initially set to 0)
var completedTasks = 0; // Track completed tasks
var totalTasks = 0; // Total number of tasks/questions

// Function to get the current submission timestamp
function getSubmissionTimestamp() {
  const currentDate = new Date();
  const timestamp = currentDate.toISOString(); // Convert to ISO string format
  return timestamp;
}

// Function to check if the user is banned
function isBanned() {
  const currentTime = Date.now();
  return banEndTime > currentTime;
}

// Count the number of buttons in the current lesson
function countButtonsInLesson(lessonContent) {
  const buttons = lessonContent.find('.guidem-button'); // Adjust the selector as needed
  return buttons.length;
}

// Update the number of buttons in the current lesson
function updateTotalTasks(lessonContent) {
  const buttons = lessonContent.find('.guidem-button'); // Adjust the selector as needed
  totalTasks = buttons.length; // Update the totalTasks global variable
}
// Function to send user progress data to the server
function sendUserProgressData() {
  // Create an object to hold the data to be sent as JSON
  var requestData = {
    userId: userId,
    courseId: courseId,
    chapterId: chapterId,
    lessonId: lessonId,
    questionId: questionId
  };

  // Log the data that will be sent to the server for testing
  console.log('Data to be sent to the server:', requestData);

  $.ajax({
    url: 'https://sb1.guidem.ph/checkuserprogress',
    type: 'POST', // Use POST request
    contentType: 'application/json', // Set content type to JSON
    data: JSON.stringify(requestData), // Convert the data object to JSON
    success: function(data) {
      // Handle the user progress data received from the server
      console.log('User progress data:', data);
      // You can implement further actions based on the user progress data here
      if (data && data.completedQuestions) {
        // Extract the completed questions from the received data
        var completedQuestions = data.completedQuestions;
        // Handle completed questions here (e.g., update UI)
        console.log('Completed questions:', completedQuestions);
      }
    },
    error: function(xhr, status, error) {
      // Handle error if the request fails
      console.error('Error:', error);
    }
  });
}


// Function to reset incorrect attempts and ban time
function resetIncorrectAttempts() {
  incorrectAttempts = 0;
  banEndTime = 0;
}

// Function to show the hint modal
function showHintModal(questionId, hint) {
  // Check if the modal is already open
  if ($('#hintModal').hasClass('show')) {
    return;
  }

  // Create a Bootstrap modal element
  const modal = `
    <div class="modal fade custom-modal" id="hintModal" tabindex="-1" aria-labelledby="hintModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="hintModalLabel">Hint</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${hint}
          </div>
        </div>
      </div>
    </div>
  `;

  // Append the modal to the body and show it
  $('body').append(modal);
  $('#hintModal').modal('show');
}
// Check if CoursePlayerV2 is defined
if (typeof (CoursePlayerV2) !== 'undefined') {
  // Listen for the content change event
  CoursePlayerV2.on('hooks:contentDidChange', function (data) {
    // Extract and assign course, lesson, chapter, and user details from data
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
    userFirstName = data.user.first_name; // Store user's first name

    // You can assign questionId based on the specific context or logic of your application
    // For example, you can set it based on the current lesson or user interaction
    questionId = determineQuestionId(data); // Modify this to determine the question ID

    // Trigger the user progress check when content changes
    checkUserProgress();
  });
}
// Trigger the user progress check when the document is ready
$(document).ready(function () {
  // You can also set initial values for userId, courseId, chapterId, lessonId, and questionId here if needed
  // userId = ...;
  // courseId = ...;
  // chapterId = ...;
  // lessonId = ...;
  // questionId = ...;

  // Trigger the initial user progress check when the document is ready
  checkUserProgress();
});

// Event delegation for handling button clicks
$(document).on('click', '.guidem-button', function () {
  if (isBanned()) {
    toastr.error(`Hi ${userFirstName}, You are temporarily banned from submitting answers.`);
    return;
  }

  const form = $(this).closest('.guidem-form');
  if (form.length) {
    const inputValue = String(form.find('input[type="text"]').val()); // Always treat input as a string
    const questionId = form.data('question-id');
    const submissionTimestamp = getSubmissionTimestamp(); // Get the submission timestamp

    // Disable the input field if the user is banned
    if (isBanned()) {
      form.find('input[type="text"]').prop('disabled', true);
      return;
    }

    // Show the hint modal
    showHintModal(questionId, hint); // Call the function to show the hint modal
  }
});

// Close the modal when the escape key is pressed or when clicking outside of it
$(document).on('keydown', function (event) {
  if (event.key === "Escape" && $('#hintModal').hasClass('show')) {
    $('#hintModal').modal('hide');
  }
});

$(document).on('click', function (event) {
  if ($(event.target).hasClass('modal')) {
    $('#hintModal').modal('hide');
  }
});

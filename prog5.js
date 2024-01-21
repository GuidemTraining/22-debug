// Variables to hold user and lesson data
var userId, courseId, chapterId, lessonId, questionId;

// Function to check user progress
function checkUserProgress() {
  // Ensure that all required data is defined before making the request
  if (userId && courseId && chapterId && lessonId && questionId) {
    var requestData = {
      userId: userId,
      courseId: courseId,
      chapterId: chapterId,
      lessonId: lessonId,
      questionId: questionId
    };

    console.log('Data to be sent to the server:', requestData);

    $.ajax({
      url: 'https://sb1.guidem.ph/checkuserprogress',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestData),
      success: function(data) {
        console.log('User progress data:', data);
        // Additional logic for handling user progress
      },
      error: function(xhr, status, error) {
        console.error('Error:', error);
      }
    });
  } else {
    console.log('Waiting for user data to be set...');
  }
}

// Check if CoursePlayerV2 is defined and listen for the content change event
if (typeof(CoursePlayerV2) !== 'undefined') {
  CoursePlayerV2.on('hooks:contentDidChange', function(data) {
    // Set the data for the user and lesson
    userId = data.user.id;
    courseId = data.course.id;
    chapterId = data.chapter.id;
    lessonId = data.lesson.id;
    questionId = determineQuestionId(data); // Make sure this function is implemented

    // Call checkUserProgress after setting all the variables
    checkUserProgress();
  });
} else {
  console.error('CoursePlayerV2 is not defined.');
}

// Ensure determineQuestionId function is implemented correctly
function determineQuestionId(data) {
  // Your logic to determine the question ID
  // Placeholder for demonstration
  return data.lesson.currentQuestionId || null;
}

// Remove the checkUserProgress call from $(document).ready() if it's not needed
// Or implement logic to check if the variables can be set from another source
$(document).ready(function() {
  // Initialize any required UI components or perform other document ready tasks
});

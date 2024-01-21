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

    // AJAX request to check user progress
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

// Function to determine the question ID
function determineQuestionId(data) {
  // Your logic to determine the question ID
  // Placeholder for demonstration
  return data.lesson.currentQuestionId || null;
}

// Event listener for CoursePlayerV2 content change
if (typeof(CoursePlayerV2) !== 'undefined') {
  CoursePlayerV2.on('hooks:contentDidChange', function(data) {
    // Assign data for user and lesson
    userId = data.user.id;
    courseId = data.course.id;
    chapterId = data.chapter.id;
    lessonId = data.lesson.id;
    questionId = determineQuestionId(data);

    // After setting all variables, call checkUserProgress
    checkUserProgress();
  });
} else {
  // CoursePlayerV2 is not defined at this point
  console.error('CoursePlayerV2 is not defined.');
}

// Document ready function
$(document).ready(function() {
  // Initialize any required UI components or perform other document ready tasks
  // ...
  
  // If you need to perform user progress check on page load and CoursePlayerV2 is available
  if (typeof(CoursePlayerV2) !== 'undefined' && CoursePlayerV2.initialData) {
    // Use the initial data from CoursePlayerV2 to set variables
    userId = CoursePlayerV2.initialData.user.id;
    courseId = CoursePlayerV2.initialData.course.id;
    chapterId = CoursePlayerV2.initialData.chapter.id;
    lessonId = CoursePlayerV2.initialData.lesson.id;
    questionId = determineQuestionId(CoursePlayerV2.initialData);

    // Then call checkUserProgress
    checkUserProgress();
  }
});

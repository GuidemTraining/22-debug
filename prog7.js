// Variables to hold user and lesson data
var userId, courseId, chapterId, lessonId, questionId;

// Function to check user progress
function checkUserProgress() {
  // Ensure that all required data is defined before making the request
  if (userId && courseId && chapterId && lessonId && questionId) {
    // ... existing AJAX call logic ...
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

// Function to attach event listeners to CoursePlayerV2
function attachCoursePlayerV2Listeners() {
  if (typeof CoursePlayerV2 !== 'undefined') {
    CoursePlayerV2.on('hooks:contentDidChange', function(data) {
      // ... existing logic for setting data ...
    });
  } else {
    // CoursePlayerV2 is not defined at this point
    // The retry logic can go here if needed
    console.error('CoursePlayerV2 is not defined. Retrying in 1 second...');
    setTimeout(attachCoursePlayerV2Listeners, 1000);
  }
}

// Document ready function
$(document).ready(function() {
  // Initialize any required UI components or perform other document ready tasks
  // ...

  // Attempt to attach listeners to CoursePlayerV2
  attachCoursePlayerV2Listeners();
});

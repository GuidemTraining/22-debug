// Variables to hold user and lesson data
var userId, courseId, chapterId, lessonId, questionId;

function checkUserProgress() {
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

// Check if CoursePlayerV2 is defined
if (typeof(CoursePlayerV2) !== 'undefined') {
  // Listen for the content change event
  CoursePlayerV2.on('hooks:contentDidChange', function(data) {
    // Extract and assign course, lesson, chapter, and user details from data
    userId = data.user.id; // Get the user ID
    courseId = data.course.id; // Get the course ID
    chapterId = data.chapter.id; // Get the chapter ID
    lessonId = data.lesson.id; // Get the lesson ID
    // You can assign questionId based on the specific context or logic of your application
    // For example, you can set it based on the current lesson or user interaction
    questionId = determineQuestionId(data); // Modify this to determine the question ID
    // Trigger the user progress check when content changes
    checkUserProgress();
  });
}

// Trigger the user progress check when the document is ready
$(document).ready(function() {
  // You can also set initial values for userId, courseId, chapterId, lessonId, and questionId here if needed
  // userId = ...;
  // courseId = ...;
  // chapterId = ...;
  // lessonId = ...;
  // questionId = ...;

  // Trigger the initial user progress check when the document is ready
  checkUserProgress();
});

// Now, you can add the code you provided here to retrieve user and lesson data

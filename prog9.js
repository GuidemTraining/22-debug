// Variables to hold user and lesson data
var userId, courseId, chapterId, lessonId, questionId;

// Function to check user progress
function checkUserProgress() {
    // Only proceed if all IDs are defined
    if (userId && courseId && chapterId && lessonId && questionId) {
        // ... existing AJAX call logic ...
    } else {
        console.log('User data is not set. Waiting for CoursePlayerV2 data...');
        // Retry the function after a delay
        setTimeout(checkUserProgress, 1000);
    }
}

// Function to determine the question ID
function determineQuestionId(data) {
    // Your logic to determine the question ID
    return data.lesson.currentQuestionId || null;
}

// Function to attach event listeners to CoursePlayerV2
function attachCoursePlayerV2Listeners() {
    if (typeof CoursePlayerV2 !== 'undefined' && CoursePlayerV2.initialData) {
        // Attach event listener only if CoursePlayerV2.initialData is available
        CoursePlayerV2.on('hooks:contentDidChange', function(data) {
            // Assign data for user and lesson
            userId = data.user.id;
            courseId = data.course.id;
            chapterId = data.chapter.id;
            lessonId = data.lesson.id;
            questionId = determineQuestionId(data);

            // Call checkUserProgress after setting all variables
            checkUserProgress();
        });
        console.log('CoursePlayerV2 listeners attached.');
    } else {
        // CoursePlayerV2 is not defined or does not have initialData
        console.error('CoursePlayerV2 is not defined or initialData is missing. Retrying in 1 second...');
        setTimeout(attachCoursePlayerV2Listeners, 1000);
    }
}

// Document ready function
$(document).ready(function() {
    // Attempt to attach listeners to CoursePlayerV2
    attachCoursePlayerV2Listeners();
});

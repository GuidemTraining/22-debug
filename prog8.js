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
        console.log('User data is not set. Waiting for CoursePlayerV2 data...');
    }
}

// Function to determine the question ID
function determineQuestionId(data) {
    // Your logic to determine the question ID
    return data.lesson.currentQuestionId || null;
}

// Function to attach event listeners to CoursePlayerV2
function attachCoursePlayerV2Listeners() {
    if (typeof CoursePlayerV2 !== 'undefined') {
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
        console.log('CoursePlayerV2 listeners attached.');
    } else {
        // CoursePlayerV2 is not defined at this point
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

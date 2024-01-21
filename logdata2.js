$(document).ready(function() {
    var courseData = {};

    function onContentChange(data) {
        var lastActivityDate = new Date().toISOString();

        courseData = {
            courseId: data.course.id,
            courseName: data.course.name,
            courseSlug: data.course.slug,
            lessonId: data.lesson.id,
            lessonName: data.lesson.name,
            lessonSlug: data.lesson.slug,
            chapterName: data.chapter.name,
            chapterId: data.chapter.id,
            userId: data.user.id,
            userName: data.user.full_name,
            userFirstName: data.user.first_name,
            userEmail: data.user.email,
            lastActivityDate: lastActivityDate
        };

        // Log the course data to the console
        console.log('Course Data:', courseData);

        // Now, let's send an AJAX request to check user progress
        var requestData = {
            userId: courseData.userId,
            courseId: courseData.courseId,
            chapterId: courseData.chapterId,
            lessonId: courseData.lessonId
        };

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

    if (typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', onContentChange);
    }
});

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
    }

    if (typeof(CoursePlayerV2) !== 'undefined') {
        CoursePlayerV2.on('hooks:contentDidChange', onContentChange);
    }
});

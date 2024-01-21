$(document).ready(function() {
    var courseData = {};
    var completedTasks = 0;

    // Function to count the total number of tasks
    function countTotalTasks() {
        return $('.guidem-button').length; // Count all elements with class 'guidem-button'
    }

    // Function to update the progress display
    function updateProgressDisplay() {
        var totalTasks = countTotalTasks();
        $('#progress-text').text(`Your Progress: ${completedTasks}/${totalTasks}`);
    }

    // Function to add clipboard buttons to pre elements
    function addClipboardButton() {
        $('pre').each(function(index) {
            var $pre = $(this);
            var preId = 'pre_' + index; // Create a unique ID
            $pre.attr('id', preId); // Assign the ID to the pre element

            var $clipboardButton = $('<button class="btn btn-secondary btn-sm clipboard-button" data-clipboard-target="#' + preId + '">Copy</button>');
            $pre.addClass('position-relative');
            $clipboardButton.appendTo($pre);
        });

        // Initialize Clipboard.js on the new buttons
        new ClipboardJS('.clipboard-button');
    }

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

                    // Loop through all elements with class 'guidem-form'
                    $('.guidem-form').each(function() {
                        var $form = $(this);
                        // Extract the question number from the 'data-question-id' attribute
                        var questionNumber = parseInt($form.attr('data-question-id'));
                        // Check if the question number is in the completed questions array
                        if (completedQuestions.includes(questionNumber.toString())) {
                            // Disable the input field for completed question
                            $form.find('input[type="text"]').prop('disabled', true);
                            // Change the input field placeholder text
                            $form.find('input[type="text"]').attr('placeholder', 'You already completed this. Grit & Grind!');
                            // Change the button text to "Completed" and style to green
                            $form.find('.guidem-button')
                                .text('Completed')
                                .css('background-color', '#218838') // Green color for completed
                                .css('color', 'white') // White text for completed
                                .prop('disabled', true);
                            // Disable the hint button for completed question
                            $form.find('.guidem-hint-button').prop('disabled', true).css('background-color', 'gray');
                        }
                    });
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

    // Initialize clipboard buttons
    addClipboardButton();
});

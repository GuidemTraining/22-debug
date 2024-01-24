// Function to adjust left pane's height dynamically
function adjustLeftPaneHeight() {
    var windowHeight = window.innerHeight;
    var leftPane = document.getElementById('left-pane');

    // Set the height of the left pane to fill the available window space
    leftPane.style.height = windowHeight + 'px';

    console.log('Left pane height adjusted:', windowHeight);
}

// Function to show/hide "End" element based on scroll position
function adjustEndElement() {
    var leftPane = document.getElementById('left-pane');
    var leftPaneContent = document.getElementById('left-pane-content');
    var endOfContent = document.querySelector('.endofcontent');

    if (leftPane.scrollHeight - leftPane.scrollTop === leftPane.clientHeight) {
        // Scrollbar is at the bottom, show "End" element
        endOfContent.style.display = 'block';
        console.log('Scrollbar is at the bottom');
    } else {
        // Scrollbar is not at the bottom, hide "End" element
        endOfContent.style.display = 'none';
        console.log('Scrollbar is not at the bottom');
    }
}

// Initial adjustments
adjustLeftPaneHeight();
adjustEndElement();

// Handle resize event
window.addEventListener('resize', function() {
    adjustLeftPaneHeight();
    adjustEndElement();
    console.log('Window resized');
});

// Handle scroll event
document.getElementById('left-pane').addEventListener('scroll', function() {
    adjustEndElement();
    console.log('Scroll event detected');
});

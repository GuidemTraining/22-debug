// Function to adjust scrollable area of each pane
function adjustScrollableArea() {
    const panes = document.querySelectorAll('.pane');

    panes.forEach((pane) => {
        const content = pane.querySelector('.pane-content');
        const endOfContent = pane.querySelector('.endofcontent');
        const masterContainer = document.querySelector('.master-container-guidem');

        if (content && endOfContent && masterContainer) {
            const contentHeight = content.offsetHeight;
            const endOfContentHeight = endOfContent.offsetTop;
            
            // Calculate the desired scrollable height with padding
            const padding = 20; // Adjust padding as needed
            const scrollableHeight = endOfContentHeight - contentHeight + padding;
            
            // Show the scrollbar only if master container is smaller than scrollable height
            if (masterContainer.offsetHeight < scrollableHeight) {
                pane.style.maxHeight = scrollableHeight + 'px';
            } else {
                pane.style.maxHeight = '0'; // Hide the scrollbar
            }
        }
    });
}

// Call the adjustScrollableArea function when the page loads and on window resize
window.addEventListener('load', adjustScrollableArea);
window.addEventListener('resize', adjustScrollableArea);

$(document).ready(function() {
    console.log("Document ready");

    // Check if CoursePlayerV2 is defined
    if (typeof(CoursePlayerV2) !== 'undefined') {
        // Listen for the content change event
        CoursePlayerV2.on('hooks:contentDidChange', function(data) {
            console.log("Content changed");

            var toggleButton = document.getElementById("toggleView");
            var leftCol = document.getElementById("leftColumn");
            var rightCol = document.getElementById("rightColumn");

            toggleButton.addEventListener("click", function() {
                console.log("Button clicked");
                if (leftCol.classList.contains("col-12")) {
                    leftCol.classList.remove("col-12");
                    leftCol.classList.add("col-6");
                    rightCol.classList.remove("col-0", "d-none");
                    rightCol.classList.add("col-6");
                } else {
                    leftCol.classList.remove("col-6");
                    leftCol.classList.add("col-12");
                    rightCol.classList.remove("col-6");
                    rightCol.classList.add("col-0", "d-none");
                }
            });
        });
    }
});

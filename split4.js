// Function to toggle classes
function setupToggleButton() {
  var toggleButton = document.getElementById("toggleView");
  var leftCol = document.getElementById("leftColumn");
  var rightCol = document.getElementById("rightColumn");

  // Debugging logs
  console.log("ToggleButton:", toggleButton);
  console.log("LeftColumn:", leftCol);
  console.log("RightColumn:", rightCol);

  // Make sure elements are not null
  if (toggleButton && leftCol && rightCol) {
    toggleButton.addEventListener("click", function() {
      // Check if the left column is full-width
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
  } else {
    // If elements are null, log an error
    console.error("One or more elements are not found.");
  }
}

// Wait for the CoursePlayerV2 environment to be ready
if (typeof CoursePlayerV2 !== 'undefined') {
  CoursePlayerV2.on('hooks:contentDidChange', function(data) {
    console.log("Content did change, setting up toggle button...");
    setupToggleButton();
  });
} else {
  console.log("CoursePlayerV2 is not defined. This script may not work as expected in this environment.");
}

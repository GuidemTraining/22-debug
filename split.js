document.getElementById("toggleView").addEventListener("click", function() {
  var leftCol = document.getElementById("leftColumn");
  var rightCol = document.getElementById("rightColumn");

  // Toggle the layout
  if (leftCol.classList.contains("col-12")) {
    leftCol.classList.remove("col-12");
    leftCol.classList.add("col-6");
    rightCol.classList.remove("col-0", "d-none");
    rightCol.classList.add("col-6");
    rightCol.classList.add("show"); // Add class to trigger fade-in
  } else {
    leftCol.classList.remove("col-6");
    leftCol.classList.add("col-12");
    rightCol.classList.remove("col-6", "show");
    rightCol.classList.add("col-0", "d-none");
  }
});

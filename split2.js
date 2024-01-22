<script>
document.addEventListener("DOMContentLoaded", function() {
    var toggleButton = document.getElementById("toggleView");
    var leftCol = document.getElementById("leftColumn");
    var rightCol = document.getElementById("rightColumn");

    toggleButton.addEventListener("click", function() {
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
</script>

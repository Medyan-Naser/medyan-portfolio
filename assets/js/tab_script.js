document.addEventListener("DOMContentLoaded", function () {
    const mainDiv = document.getElementById("main");
    const links = document.querySelectorAll(".links a");

    function loadPage(page) {
        fetch(page)
            .then(response => response.text())
            .then(html => {
                mainDiv.innerHTML = html;
            })
            .catch(error => console.error("Error loading page:", error));
    }

    // Load default home page on first load
    loadPage("main.html");
    // Add event listeners for navigation
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            // Remove active class from all list items
            document.querySelectorAll(".links li").forEach(li => li.classList.remove("active"));
            // Add active class to the clicked item's parent <li>
            this.parentElement.classList.add("active");
            // Load the requested page
            const page = this.getAttribute("data-page");
            loadPage(page);
        });
    });
});

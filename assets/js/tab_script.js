// function changeTab(tabName) {
//     const mainDiv = document.getElementById("main");

//     const content = {
//         "home": `<h2>Welcome to My Portfolio</h2><p>This is the home section.</p>`,
//         "contact": `<h2>Contact Me</h2><p>Email: <a href="mailto:medyan7.naser@gmail.com">medyan7.naser@gmail.com</a></p>`,
//         "certificate": `<h2>Certificates</h2><p>List of my certifications...</p>`
//     };

//     mainDiv.innerHTML = content[tabName] || "<h2>Page not found</h2>";
// }

document.addEventListener("DOMContentLoaded", function () {
    const mainDiv = document.getElementById("main");
    const links = document.querySelectorAll("nav .links a");

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
            const page = this.getAttribute("data-page");
            loadPage(page);
        });
    });
});

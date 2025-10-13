document.addEventListener("DOMContentLoaded", function () {
    const mainDiv = document.getElementById("main");
    const links = document.querySelectorAll(".links a");
    const body = document.body;

    function loadPage(page) {
        fetch(page)
            .then(response => response.text())
            .then(html => {
                mainDiv.innerHTML = html;
                
                // IMPORTANT: If the loaded page is 'certificates.html', initialize listeners
                if (page === "certificates.html") {
                    // This function is globally available from popup_position.js
                    if (typeof initializePopupListeners === 'function') {
                        initializePopupListeners();
                    }
                }
            })
            .catch(error => console.error("Error loading page:", error));
    }

    function closeNavPanel() {
        body.classList.remove("is-navPanel-visible");
    }

    // Load default home page on first load
    loadPage("certificates.html"); 
    
    // Add event listeners for navigation
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            
            document.querySelectorAll(".links li").forEach(li => li.classList.remove("active"));
            this.parentElement.classList.add("active");
            
            const page = this.getAttribute("data-page");
            loadPage(page); // This calls the function above, which handles initialization
            
            closeNavPanel();
        });
    });
});
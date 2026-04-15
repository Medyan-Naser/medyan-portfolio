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
    loadPage("main.html"); 
    
    // Add event listeners for navigation
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            
            const intro = document.getElementById("intro");
            const isIntroVisible = intro && !intro.classList.contains("hidden");
            
            document.querySelectorAll(".links li").forEach(li => li.classList.remove("active"));
            this.parentElement.classList.add("active");
            
            const page = this.getAttribute("data-page");
            
            // If intro is visible (scroll button is active), simulate clicking the scroll button
            if (isIntroVisible) {
                const scrollButton = document.querySelector('#intro .scrolly');
                if (scrollButton) {
                    scrollButton.click();
                }
            }
            
            loadPage(page); // This calls the function above, which handles initialization
            
            closeNavPanel();
        });
    });
});
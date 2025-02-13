document.addEventListener("DOMContentLoaded", function() {
    // Select all links
    document.querySelectorAll("a").forEach(link => {
        if (link.hostname !== window.location.hostname) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
    });
});
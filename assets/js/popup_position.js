/**
 * Adjusts the position of the popup to keep it within the viewport.
 * @param {HTMLElement} certContainer - The parent .certificate-with-popup element.
 * @param {HTMLElement} popupElement - The .sub-certs-popup element.
 */
function adjustPopupPosition(certContainer, popupElement) {
    // Console log for debugging (KEEP THIS until it works)
    // console.log('adjustPopupPosition called for:', certContainer.querySelector('h3').textContent); 
    
    if (!popupElement) return;

    // Get the bounding boxes relative to the viewport
    const certRect = certContainer.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    
    // 1. Calculate the ideal centered position relative to the PARENT certificate.
    const parentCenter = certRect.left + (certRect.width / 2);
    const popupWidth = popupElement.offsetWidth; 
    
    // The desired starting position for the popup's LEFT edge, if centered:
    let desiredLeftEdge = parentCenter - (popupWidth / 2);

    // 2. Initialize the final 'left' CSS value
    let finalLeft = '50%';
    let finalTransform = 'translateX(-50%)'; // Default centering

    // 3. CHECK BOUNDARIES
    const buffer = 10; // 10px buffer from the edge

    // Check if the desired LEFT edge is off-screen 
    if (desiredLeftEdge < buffer) {
        // Calculate the necessary shift to align the popup's left edge at the buffer
        let newRelativeLeft = certRect.left * -1 + buffer;
        
        finalLeft = `${newRelativeLeft}px`;
        finalTransform = 'none';

    } 
    // Check if the desired RIGHT edge is off-screen
    else if ((desiredLeftEdge + popupWidth) > (viewportWidth - buffer)) {
        // Calculate the required position of the popup's LEFT edge:
        let newLeftEdge = viewportWidth - buffer - popupWidth;
        
        // Convert to position relative to the parent certificate's LEFT edge:
        let newRelativeLeft = newLeftEdge - certRect.left;
        
        finalLeft = `${newRelativeLeft}px`;
        finalTransform = 'none';
    }

    // 4. APPLY STYLES
    popupElement.style.left = finalLeft;
    popupElement.style.transform = finalTransform;
    // console.log(`Final Left: ${finalLeft}, Final Transform: ${finalTransform}`);
}

/**
 * Attaches the mouseenter event listeners to all certificate containers.
 * This is the function that needs to be called after new HTML is loaded.
 */
function initializePopupListeners() {
    const certsWithPopup = document.querySelectorAll('.certificate-with-popup');
    // console.log(`Found ${certsWithPopup.length} certificate containers with popups.`);

    certsWithPopup.forEach(certContainer => {
        const popup = certContainer.querySelector('.sub-certs-popup');
        
        // Avoid adding multiple listeners if called more than once
        if (certContainer.dataset.listenerInitialized) return; 

        certContainer.addEventListener('mouseenter', () => {
            console.log('Mouse entered. Triggering position adjustment.');
            requestAnimationFrame(() => {
                adjustPopupPosition(certContainer, popup);
            });
        });
        
        // Mark as initialized
        certContainer.dataset.listenerInitialized = true; 
    });
}
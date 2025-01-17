document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            // Show the loading screen by expanding it
            loadingScreen.classList.add('active');
            loadingScreen.classList.remove('reverse'); // Ensure reverse animation is not active

            // Set a timeout before navigating, to allow the animation to run
            setTimeout(() => {
                // Navigate to the new page
                window.location.href = link.getAttribute('href');
            }, 1000); // Adjust this duration as necessary
        });
    });

    // Once the new page is fully loaded, trigger the reverse animation
    window.addEventListener('load', () => {
        // First, ensure the width is 100% before shrinking
        loadingScreen.classList.add('reverse'); // Set width to 100%

        // After a short delay, start the shrinking animation
        setTimeout(() => {
            loadingScreen.classList.remove('reverse'); // Remove the reverse class
        }, 1000); // Short delay to ensure width is fully reset to 100%
    });
});

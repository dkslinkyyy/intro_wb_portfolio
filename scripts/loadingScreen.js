document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            loadingScreen.classList.add('active');

            setTimeout(() => {
                window.location.href = link.getAttribute('href');
            }, 1500);
        });
    });
});

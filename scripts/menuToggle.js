document.addEventListener('DOMContentLoaded', () => {
    const toggleMenuBtn = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");

    toggleMenuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');

        const icon = toggleMenuBtn.querySelector('i');
        if (menu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars'); 
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loadingScreen';
    loadingScreen.classList.add('loading-screen');
    
    const logo = document.createElement('img');
    logo.src = '/intro_wb_portfolio/assets/initialer.png';  
    logo.alt = 'Logo';

    loadingScreen.appendChild(logo);

    document.body.appendChild(loadingScreen);

    setTimeout(() => {
        loadingScreen.classList.add('active');
    }, 1000); 


    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
    
            loadingScreen.style.transition = 'none';  
            loadingScreen.style.animation = '';       
    
            loadingScreen.style.transform = 'translateY(0)';
    
            setTimeout(() => {
                window.location.href = link.getAttribute('href');
            }, 2000); 
    
            setTimeout(() => {
                loadingScreen.style.transition = '';  
                loadingScreen.style.animation = '';   
                loadingScreen.classList.add('active'); 
            }, 1000); 
        });
    });
    
});

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loadingScreen';
    loadingScreen.classList.add('loading-screen');
    
    const logo = document.createElement('img');
    logo.src = 'assets/initialer.png';  
    logo.alt = 'Logo';

    loadingScreen.appendChild(logo);

    document.body.appendChild(loadingScreen);

    setTimeout(() => {
        loadingScreen.classList.add('active');
    }, 1000); 


    const elements = document.querySelectorAll('.nav-link, #ctaBtn');

    elements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault(); 

            console.log(element)
    
            loadingScreen.style.transition = 'none';  
            loadingScreen.style.animation = '';       
    
            loadingScreen.style.transform = 'translateY(0)';
    
            const href = element.getAttribute('href') || element.getAttribute('data-href');

            setTimeout(() => {
                window.location.href = href;
            }, 2000); 
    
            setTimeout(() => {
                loadingScreen.style.transition = '';  
                loadingScreen.style.animation = '';   
                loadingScreen.classList.add('active'); 
            }, 1000); 
        });
    });
    
});

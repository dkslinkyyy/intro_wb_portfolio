particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: { enable: true, value_area: 800 }
        },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: { enable: true, speed: 2 }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" } }
    },
    retina_detect: true
});

document.addEventListener('DOMContentLoaded', () => {
    const words = ["Utvecklare", "mångsysslare", "raketforskare"]; 
    const typewriter = document.querySelector('.typewriter');
    let wordIndex = 0; 
    let charIndex = 0; 
    let isDeleting = false; 

    const typingSpeed = 100; 
    const deletingSpeed = 100;
    const delayBetweenWords = 2000; 
    const startDelay = (1000)*3; 

    function type() {
        const currentWord = words[wordIndex];
        if (!isDeleting) {
            
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentWord.length) {
                
                isDeleting = true;
                setTimeout(type, delayBetweenWords);
                return;
            }
        } else {
            
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; 
            }
        }

        
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, speed);
    }

    const toggleMenuBtn = document.getElementById("menuToggle");
    const menu = document.getElementById("sidebar");
    const nav_links = document.querySelectorAll(".nav-links > *");
    


    toggleMenuBtn.addEventListener('click', () => {

        menu.classList.toggle('active');
        const icon = toggleMenuBtn.querySelector('i');
        if (menu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars'); 
        }
    });

    window.addEventListener('load', () => {
        // Check if animation class is already applied
        if (!document.body.classList.contains('animated')) {
            // Animation logic
            setTimeout(() => {
                const mainElements = document.querySelectorAll("div:not(#loadingScreen) > *:not(img), div:not(#loadingScreen), article");
    
                console.log(mainElements);
    
                mainElements.forEach((element, index) => {
                    element.style.opacity = 0;
                    element.style.transform = 'translateY(10%)';
    
                    setTimeout(() => {
                        element.style.transition = `all 1.5s ease ${index * 0.2}s`;
                        element.style.opacity = 1;
                        element.style.transform = 'translateY(0)';
                    }, 1000);
                });
    
                document.body.classList.add('animated');
            }, 1000);
        }
    });
    
    

    setTimeout(() => {
        type();
    }, startDelay);
});

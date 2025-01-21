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
        if(!typewriter) {
            return;
        }
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
        if (document.body.classList.contains('animated')) {
            return;
        }
    
        setTimeout(() => {
            const mainElements = document.querySelectorAll("div:not(#loadingScreen) > *:not(img), div:not(#loadingScreen), article");
    
            mainElements.forEach((element, index) => {
                element.style.opacity = 0;
                element.style.transform = 'translateY(10%)';
    
                setTimeout(() => {
                    element.style.transition = `all 1.5s ease ${index * 0.2}s`;
                    element.style.opacity = 1;
                    element.style.transform = 'translateY(0)';
    
                    // Reset transition after animation completes
                    setTimeout(() => {
                        element.style.transition = '';
                    }, 1500 + index * 200); // Matches the animation duration
                }, 1000);
            });
    
            document.body.classList.add('animated');
        }, 1000);
    });
    
    
    

    setTimeout(() => {
        type();
    }, startDelay);
});


const username = "dkslinkyyy";
const apiUrl = `https://api.github.com/users/${username}/repos`;


async function fetchRepositories() {
    const repoList = document.getElementById('projects-content');

    if(!repoList) return;
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const repos = await response.json();
        
        const languageIcons = {
            JavaScript: 'devicon-javascript-plain',
            Python: 'devicon-python-plain',
            Java: 'devicon-java-plain',
            HTML: 'devicon-html5-plain',
            CSS: 'devicon-css3-plain',
        };

        repos.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.classList.add('card');
            repoDiv.classList.add('project');


            const icon = document.createElement('i');
            const iconClass = languageIcons[repo.language] || 'devicon-github-original';
            icon.classList.add(iconClass);

            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.target = '_blank';
            repoLink.textContent = repo.name;

            const description = document.createElement('p');
            description.textContent = repo.description || 'No description';

            const language = document.createElement('p');
            language.textContent = `Language: ${repo.language || 'Not specified'}`;

            repoDiv.appendChild(icon);
            repoDiv.appendChild(repoLink);
            repoDiv.appendChild(description);
            repoDiv.appendChild(language);
            
            repoList.appendChild(repoDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

fetchRepositories();

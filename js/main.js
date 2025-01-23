document.addEventListener("DOMContentLoaded", () => {
    // Particles.js Initialization
    particlesJS("particles-js", {
        particles: {
            number: { value: 90, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 5, random: true },
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

    // Typewriter Effect
    const words = ["Utvecklare", "mångsysslare", "raketforskare"];
    const typewriter = document.querySelector(".typewriter");
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    const speeds = { typing: 100, deleting: 100, wordDelay: 2000, startDelay: 3000 };

    const type = () => {
        if (!typewriter) return; // returnera om ingen typrwriter selector hittqs
    
        const currentWord = words[wordIndex]; // Hämta nuvarande ord
        typewriter.textContent = currentWord.substring(0, charIndex + (isDeleting ? -1 : 1)); // Uppdatera 'typewriter' med delsträng beroende på charIndex och radering

        charIndex += isDeleting ? -1 : 1;
    
        // börja radera om den inte raderar och charIndex är lika med längden på det aktuella ordet, 
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true; 
            setTimeout(type, speeds.wordDelay); // liten delay in funktion call
        } 

        // Nästa ord, charIndex är 0
        else if (isDeleting && charIndex === 0) {
            isDeleting = false; // reset
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, speeds.typing); // Vänta innan vi börjar skriva nästa ord
        } else {
            //skriv om isDeleting, om inte fortsätt radera
            setTimeout(type, isDeleting ? speeds.deleting : speeds.typing);
        }
    };
    
    setTimeout(type, speeds.startDelay);
    

    // Sidebar Toggle
    const toggleMenuBtn = document.getElementById("menuToggle");
    const menu = document.getElementById("sidebar");

    toggleMenuBtn?.addEventListener("click", () => {
        menu?.classList.toggle("active");
        const icon = toggleMenuBtn.querySelector("i");
        icon?.classList.toggle("fa-bars");
        icon?.classList.toggle("fa-xmark");
    });

    const searchInput = document.getElementById("techstack-category");

    searchInput?.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        
        document.querySelectorAll(".card:not(#search)").forEach((card) => {
            let hasMatchingIcons = false;
    
            const icons = card.querySelectorAll(".techstack-row img");
    
            icons.forEach((icon) => {
                const iconTitle = icon.getAttribute("title").toLowerCase();
    
                if (iconTitle.includes(searchTerm)) {
                    icon.style.display = "inline-block"; 
                    hasMatchingIcons = true;
                } else {
                    icon.style.display = "none"; 
                }
            });
    
            card.style.display = hasMatchingIcons ? "flex" : "none";
        });
    });
    

    // Fetch Repositories
    const username = "dkslinkyyy";
    const apiURL = `https://api.github.com/users/${username}/repos`;
    const languageIcons = {
        JavaScript: "devicon-javascript-plain",
        Python: "devicon-python-plain",
        Java: "devicon-java-plain",
        HTML: "devicon-html5-plain",
        CSS: "devicon-css3-plain",
        Go: "devicon-go-original-wordmark"
    };

    const fetchRepositories = async () => {
        const repoList = document.getElementById("projects-content");
        if (!repoList) return;

        try {
            const response = await fetch(apiURL);
            
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const repos = await response.json();

            for (const repo of repos) {
                const languagesResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`);
                const languages = languagesResponse.ok ? await languagesResponse.json() : {};

                const repoDiv = document.createElement("div");
                repoDiv.classList.add("card", "project");

                const icon = document.createElement("i");
                icon.classList.add(languageIcons[repo.language] || "devicon-github-original", "highlight");
                const repoLink = document.createElement("a");
                repoLink.href = repo.html_url;
                repoLink.target = "_blank";
                repoLink.textContent = repo.name;

                const description = document.createElement("p");
                description.textContent = repo.description || "Ingen beskrivning";
                description.classList.add("headline2");

                const language = document.createElement("p");
                language.textContent = `Språk: ${Object.keys(languages).length ? Object.keys(languages).join(", ") : "Inte specifierat"}`;
                language.classList.add("headline2");

                repoDiv.append(icon, repoLink, description, language);
                repoList.appendChild(repoDiv);
            }
        } catch (error) {
            console.error(error);
        }
    };

    fetchRepositories();


        // Add autoplay background music
    const addBackgroundMusic = () => {
        const audio = document.createElement("audio");
        audio.src = "../assets/background-music.mp3"; // Replace with the path to your audio file
        audio.autoplay = true;
        audio.loop = true;
        audio.volume = 0.1; // Set volume to 50%
        document.body.appendChild(audio);
    };

    addBackgroundMusic();

});

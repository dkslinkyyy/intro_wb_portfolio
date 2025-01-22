document.addEventListener("DOMContentLoaded", () => {
    // Particles.js Initialization
    particlesJS("particles-js", {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 4, random: true },
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
        if (!typewriter) return;

        const currentWord = words[wordIndex];
        typewriter.textContent = currentWord.substring(0, charIndex + (isDeleting ? -1 : 1));
        charIndex += isDeleting ? -1 : 1;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, speeds.wordDelay);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, speeds.typing);
        } else {
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

    // Search Functionality
    const searchInput = document.getElementById("techstack-category");
    searchInput?.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        document.querySelectorAll(".card.techstack").forEach((card) => {
            const titleElement = card.querySelector(".headline1");
            const titleText = titleElement ? titleElement.textContent.toLowerCase() : "";
            card.style.display = titleText.includes(searchTerm) ? "flex" : "none";
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
});

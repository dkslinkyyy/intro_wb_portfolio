const username = "dkslinkyyy";
const apiUrl = `https://api.github.com/users/${username}/repos`;

async function fetchRepositories() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const repos = await response.json();
        const repoList = document.getElementById('repo-list');
        const languageIcons = {
            JavaScript: 'devicon-javascript-plain',
            Python: 'devicon-python-plain',
            Java: 'devicon-java-plain',
            HTML: 'devicon-html5-plain',
            CSS: 'devicon-css3-plain',
        };

        repos.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.classList.add('repo');

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

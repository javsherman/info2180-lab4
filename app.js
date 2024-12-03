document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const resultDiv = document.querySelector('.result-content');

    let SUPERHEROES = []; // Array to store fetched data

    // Function to fetch data from PHP and store it in SUPERHEROES array
    function fetchSuperheroes() {
        fetch('superheroes.php')
            .then(response => {
                console.log('Response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);
                SUPERHEROES = data; // Store the data in the array
            })
            .catch(error => {
                console.error('Error fetching superheroes:', error);
                resultDiv.innerHTML = '<p>Error loading superhero data. Please try again later.</p>';
            });
    }

    // Function to search superheroes
    function searchSuperheroes() {
        const query = searchInput.value.trim().toLowerCase();
        console.log('Current superheroes:', SUPERHEROES);

        // If no superheroes are loaded, show an error
        if (SUPERHEROES.length === 0) {
            resultDiv.innerHTML = '<p>Superhero data not loaded. Please refresh the page.</p>';
            return;
        }

        // Filter heroes based on query
        const matchedHeroes = SUPERHEROES.filter(hero =>
            hero.name.toLowerCase().includes(query) || 
            hero.alias.toLowerCase().includes(query)
        );

        // Display results
        if (matchedHeroes.length > 0) {
            const heroesHtml = matchedHeroes.map(hero => `
                <div class="character-result">
                    <h3 class="character-name">${hero.alias}</h3>
                    <h4 class="character-alias">${hero.name}</h4>
                    <p class="character-description">${hero.biography}</p>
                </div>
            `).join('');
            
            resultDiv.innerHTML = heroesHtml;
        } else {
            resultDiv.innerHTML = '<p>No superheroes found matching your search.</p>';
        }
    }

    // Event listeners for search button and Enter key
    searchBtn.addEventListener('click', searchSuperheroes);
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchSuperheroes();
        }
    });

    // Fetch superheroes data when the page loads
    fetchSuperheroes();
});
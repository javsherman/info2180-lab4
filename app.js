document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function() {
        fetch('superheroes.php')
            .then(response => response.text())
            .then(data => {
                const formattedData = '<ul>\n' +
                    data.split(',').map(hero => 
                        `<li>${hero.trim()}</li>`
                    ).join('\n') +
                    '\n</ul>';
                alert(formattedData);
            })
            .catch(error => {
                alert('Error fetching data: ' + error.message);
            });
    });
});
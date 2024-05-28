    // JavaScript to load JSON and generate Events cards
      
document.addEventListener('DOMContentLoaded', function () {
    fetch('data/events.json')
        .then(response => response.json())
        .then(data => {
            // Sort the data by date in descending order
            data.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
            const container = document.getElementById('events-container');
            data.forEach(event => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <section>
                        <div class="icon-container">
                            <img src="${event.imageUrl}" alt="" id ="events-card-img"/>
                        </div>
                        <div class="inner">
                            <header>
                                <h2 id="card-title">${event.title}</h2>
                                <p id="card-date">${event.eventDate}</p>
                            </header>
                            <p id="card-content">${event.content}</p>
                        </div>
                    </section>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});
document.addEventListener('DOMContentLoaded', function () {
    const latestUpdatesContainer = document.getElementById('latest-updates');

    // Fetch all JSON data
    Promise.all([
        fetch('data/documents.json').then(response => response.json()),
        fetch('data/events.json').then(response => response.json()),
        fetch('data/conferences.json').then(response => response.json()),
        fetch('data/publications.json').then(response => response.json())
    ]).then(([documents, events, conferences, publications]) => {

        // Add a type property to each item for identification
        documents.forEach(item => item.type = 'document');
        events.forEach(item => item.type = 'event');
        conferences.forEach(item => item.type = 'conference');
        publications.forEach(item => item.type = 'publication');

        // Combine the arrays
        const allItems = [...documents, ...events, ...conferences, ...publications];

        // Sort combined array by uploadDate descending
        allItems.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

        // Get the four most recent items
        const latestItems = allItems.slice(0, 4);

        // Generate and append HTML for each item
        latestItems.forEach(item => {
            let card;
            if (item.type === 'document') {
                card = createDocumentCard(item);
            } else if (item.type === 'event') {
                card = createEventCard(item);
            } else if (item.type === 'conference') {
                card = createConferenceCard(item);
            } else if (item.type === 'publication') {
                card = createPublicationCard(item);
            }
            latestUpdatesContainer.appendChild(card);
        });
    }).catch(error => console.error('Error loading JSON files:', error));
});

// Function to create a document card
function createDocumentCard(doc) {
    const card = document.createElement('div');
    card.className = 'card';
    var txt;
    //to adjust the size of the image in the card depending on the type (icon or photo)
    if (doc.imageType === "icon") {
        txt = `<img src="${doc.imageUrl}" alt="" width="40%" style="padding-top: 25px;"/>`;
    } else if (doc.imageType === "photo") {
        txt = `<img src="${doc.imageUrl}" alt="" width="100%" style="padding-top: 25px;"/>`;
    }
    // Set the inner HTML of the card
    card.innerHTML = `
    <section>
        <div class="icon-container">
            <a href="${doc.documentUrl}">
                ${txt}
            </a>
        </div>
        <div class="inner">
            <header>
                <h2 id="card-title">${doc.title}</h2>
                <p id="card-date">${doc.eventDate}</p>
            </header>
            <p id="card-content">${doc.description}</p>
        </div>
    </section>
`;
    return card;
}

// Function to create an event card
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'card';
    var txt;
    //to adjust the size of the image in the card depending on the type (icon or photo)
    if (event.imageType === "icon") {
        txt = `<img src="${event.imageUrl}" alt="" width="40%" style="padding-top: 25px;"/>`;
    } else if (event.imageType === "photo") {
        txt = `<img src="${event.imageUrl}" alt="" width="100%" style="transform: translateY(-20px);"/>`;
    }
    // Set the inner HTML of the card
    card.innerHTML = `
        <section>
            <div class="icon-container">
                ${txt}
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
    return card;
}

// Function to create a conference card
function createConferenceCard(conference) {
    const card = document.createElement('div');
    card.className = 'card';
    var txt;
    //to adjust the size of the image in the card depending on the type (icon or photo)
    if (conference.imageType === "icon") {
        txt = `<img src="${conference.imageUrl}" alt="" width="40%" style="padding-top: 25px;"/>`;
    } else if (conference.imageType === "photo") {
        txt = `<img src="${conference.imageUrl}" alt="" width="100%" style="padding-top: 25px;"/>`;
    }
    // Set the inner HTML of the card
    card.innerHTML = `
        <section>
            <div class="icon-container">
                ${txt}
            </div>
            <div class="inner">
                <header>
                    <h2 id="card-title">${conference.title}</h2>
                    <p id="card-date">${conference.eventDate}</p>
                </header>
                <p id="card-content">${conference.content}</p>
            </div>
        </section>
    `;
    return card;
}

// Function to create a publication card
function createPublicationCard(publication) {
    const card = document.createElement('div');
    card.className = 'card';
    var txt;
    //to adjust the size of the image in the card depending on the type (icon or photo)
    if (publication.imageType === "icon") {
        txt = `<img src="${publication.imageUrl}" alt="" width="40%" style="padding-top: 25px;"/>`;
    } else if (publication.imageType === "photo") {
        txt = `<img src="${publication.imageUrl}" alt="" width="100%" style="padding-top: 25px;"/>`;
    }
    // Set the inner HTML of the card
    card.innerHTML = `
        <section>
            <div class="icon-container">
                ${txt}
            </div>
            <div class="inner">
                <header>
                    <h2 id="card-title">${publication.title}</h2>
                    <p id="card-date">${publication.eventDate}</p>
                </header>
                <p id="card-content">${publication.content}</p>
            </div>
        </section>
    `;
    return card;
}

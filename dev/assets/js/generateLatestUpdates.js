document.addEventListener('DOMContentLoaded', function() {
    const latestUpdatesContainer = document.getElementById('latest-updates');

    // Fetch all JSON data
    Promise.all([
        fetch('data/documents.json').then(response => response.json()),
        fetch('data/events.json').then(response => response.json()),
        fetch('data/conferences.json').then(response => response.json())
    ]).then(([documents, events, conferences]) => {
        // Sort each array by uploadDate descending
        documents.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        events.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        conferences.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

        // Get the most recent item from each array
        const latestDocuments = documents[0];
        const latestEvents = events[0];
        const latestConferences = conferences[0];

        // Generate HTML for each type of update
        const documentCard = createDocumentCard(latestDocuments);
        const eventCard = createEventCard(latestEvents);
        const conferenceCard = createConferenceCard(latestConferences);

        // Append the generated cards to the updates container
        latestUpdatesContainer.appendChild(documentCard);
        latestUpdatesContainer.appendChild(eventCard);
        latestUpdatesContainer.appendChild(conferenceCard);
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
    } else if (doc.imageType === "photo"){
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
                <p id="card-date">${doc.uploadDate}</p>
            </header>
            <p id="card-content">Click on the image to access the content of the document.</p>
        </div>
    </section>
`;

    return card;
}

// Function to create an event card
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'card';
    //to adjust the size of the image in the card depending on the type (icon or photo)
    if (event.imageType === "icon") {
        txt = `<img src="${event.imageUrl}" alt="" width="40%" style="padding-top: 25px;"/>`;
    } else if (event.imageType === "photo"){
        txt = `<img src="${event.imageUrl}" alt="" width="100%" style="padding-top: 25px;"/>`;
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
    //to adjust the size of the image in the card depending on the type (icon or photo)
    if (conference.imageType === "icon") {
        txt = `<img src="${conference.imageUrl}" alt="" width="40%" style="padding-top: 25px;"/>`;
    } else if (conference.imageType === "photo"){
        txt = `<img src="${conference.imageUrl}" alt="" width="80%" style="padding-top: 25px;"/>`;
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

 // JavaScript to load JSON and generate Home section cards
 document.addEventListener('DOMContentLoaded', function () {

    // Load documents
    fetch('data/documents.json')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
            const container = document.getElementById('documents-grid');
            data.slice(0, 3).forEach(doc => {
                const card = document.createElement('div');
                card.className = 'card';
                 //to adjust the size of the image in the card depending on the type (icon or photo)
                 if (doc.imageType === "icon") {
                    txt = `<img src="${doc.imageUrl}" alt="" width="40%" style="padding-top: 25px;"/>`;
                } else if (doc.imageType === "photo"){
                    txt = `<img src="${doc.imageUrl}" alt="" width="100%" style="padding-top: 25px;"/>`;
                }
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
                            </header>
                        </div>
                    </section>
                `;
                container.appendChild(card);
            });
        });

    // Load events
    fetch('data/events.json')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
            const container = document.getElementById('events-grid');
            data.slice(0, 3).forEach(event => {
                const card = document.createElement('div');
                card.className = 'card';
                  //to adjust the size of the image in the card depending on the type (icon or photo)
                  if (event.imageType === "icon") {
                    txt = `<img src="${event.imageUrl}" alt="" width="40%" style="padding-top: 25px;"/>`;
                } else if (event.imageType === "photo"){
                    txt = `<img src="${event.imageUrl}" alt="" width="100%" style="margin-top: -20px"/>`;
                }
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
                container.appendChild(card);
            });
        });

    // Load conferences
    fetch('data/conferences.json')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
            const container = document.getElementById('conferences-grid');
            data.slice(0, 3).forEach(conference => {
                const card = document.createElement('div');
                card.className = 'card';
                var txt;
                //to adjust the size of the image in the card depending on the type (icon or photo)
                if (conference.imageType === "icon") {
                    txt = `<img src="${conference.imageUrl}" alt="" width="40%" style="padding-top: 25px;"/>`;
                } else if (conference.imageType === "photo"){
                    txt = `<img src="${conference.imageUrl}" alt="" width="60%" style="padding-top: 25px;"/>`;
                }
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
                container.appendChild(card);
            });
        });
});

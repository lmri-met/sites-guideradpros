
    // JavaScript to load JSON and generate Documents cards
      // Wait for the DOM to be fully loaded before executing the function
    document.addEventListener("DOMContentLoaded", function () {
        fetch('data/documents.json') // Make a request to fetch the JSON file
            .then(response => response.json()) // Convert the response to JSON
            .then(data => {
                // Sort the data by date in descending order
                data.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
                // Select the container where the cards will be appended
                const container = document.getElementById('documents-container');
                // Iterate through each document object in the JSON data
                data.forEach(doc => {
                    // Create a new div element to act as a card
                    const card = document.createElement('div');
                    card.className = 'card'; // Assign the 'card' class to the div
                    var txt;
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
                    // Append the created card to the container
                    container.appendChild(card);
                });
            })
            .catch(error => console.error('Error loading JSON:', error)); // Handle any errors during the fetch
    });
    
    
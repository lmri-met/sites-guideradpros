document.addEventListener('DOMContentLoaded', function () {
    fetch('data/conferences.json')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
            const container = document.getElementById('conferences-grid');
            data.forEach(conference => {
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
                                <h2>${conference.title}</h2>
                                <p>${conference.eventDate}</p>
                            </header>
                            <p>${conference.content}</p>
                        </div>
                    </section>
                `;
                container.appendChild(card);
            });
        });
});
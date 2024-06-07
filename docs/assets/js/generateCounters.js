 // JavaScript to load JSON the number of documents, events and conferences automatically in the Impact section
document.addEventListener('DOMContentLoaded', function() {
        // Fetch all JSON data
        Promise.all([
            fetch('data/documents.json').then(response => response.json()),
            fetch('data/events.json').then(response => response.json()),
            fetch('data/conferences.json').then(response => response.json())
        ])
        .then(([documents, events, conferences]) => {
            // Get the counts
            const documentCount = documents.length;
            const eventCount = events.length;
            const conferenceCount = conferences.length;

            // Update the article content with counts
            document.getElementById('document-count').textContent = documentCount;
            document.getElementById('event-count').textContent = eventCount;
            document.getElementById('conference-count').textContent = conferenceCount;
        })
        .catch(error => console.error('Error loading JSON files:', error));

    });


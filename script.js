let allCitations = []; // To store all the loaded citations

// Load the JSON file
fetch('justice.json')
  .then(response => response.json())
  .then(data => {
    allCitations = data; // Save data for sorting
    renderCitations(allCitations); // Render all citations initially
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });

// Function to render citations
function renderCitations(citations) {
  const container = document.getElementById('citations-container');
  container.innerHTML = ''; // Clear the container

  citations.forEach(entry => {
    const citationDiv = document.createElement('div');
    citationDiv.className = 'citation';

    const title = document.createElement('div');
    title.className = 'citation-title';
    title.textContent = entry.title || 'No Title';

    const details = document.createElement('div');
    details.className = 'citation-details';
    details.innerHTML = `
      <strong>Author:</strong> ${entry.author || 'Unknown'}<br>
      <strong>Published in:</strong> ${entry.isPartOf || 'Unknown'} (${entry.publicationYear || 'N/A'})<br>
      <strong>Date Published:</strong> ${entry.datePublished || 'N/A'}<br>
      <a href="${entry.url || '#'}" target="_blank">Read Article</a>
    `;

    citationDiv.appendChild(title);
    citationDiv.appendChild(details);
    container.appendChild(citationDiv);
  });
}

// Event listeners for sorting
document.getElementById('sort-asc').addEventListener('click', () => {
  const sortedCitations = [...allCitations].sort((a, b) => a.publicationYear - b.publicationYear);
  renderCitations(sortedCitations);
});

document.getElementById('sort-desc').addEventListener('click', () => {
  const sortedCitations = [...allCitations].sort((a, b) => b.publicationYear - a.publicationYear);
  renderCitations(sortedCitations);
});

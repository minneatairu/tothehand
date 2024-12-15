let allCitations = []; // To store all the loaded citations

// Load the JSON file
fetch('justice.json')
  .then(response => response.json())
  .then(data => {
    allCitations = data; // Save data for filtering
    renderCitations(data); // Render all citations initially
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });

// Function to render citations
function renderCitations(citations) {
  const container = document.getElementById('citations-container');
  container.innerHTML = ''; // Clear the container

  // Loop through each citation and render it
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

// Filter functionality
document.getElementById('apply-filter').addEventListener('click', () => {
  const category = document.getElementById('filter-category').value;
  const filterValue = document.getElementById('filter-input').value.toLowerCase();

  let filteredCitations = allCitations;

  // Apply filter
  if (category !== 'all') {
    filteredCitations = allCitations.filter(entry => {
      const field = entry[category]?.toString().toLowerCase() || '';
      return field.includes(filterValue);
    });
  }

  renderCitations(filteredCitations);
});

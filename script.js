let allCitations = []; // To store all the loaded citations
let currentPage = 1;   // Current page number
const itemsPerPage = 12; // Number of items per page

// Load the JSON file
fetch('justice.json')
  .then(response => response.json())
  .then(data => {
    allCitations = data; // Save data for pagination
    renderPage(currentPage); // Render the first page initially
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });

// Function to render a specific page
function renderPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const citationsToDisplay = allCitations.slice(startIndex, endIndex);

  renderCitations(citationsToDisplay);
  updatePaginationControls();
}

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

// Function to update pagination controls
function updatePaginationControls() {
  const totalPages = Math.ceil(allCitations.length / itemsPerPage);
  document.getElementById('current-page').textContent = `Page ${currentPage}`;

  // Enable or disable buttons based on the current page
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === totalPages;
}

// Event listeners for pagination buttons
document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  const totalPages = Math.ceil(allCitations.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage);
  }
});

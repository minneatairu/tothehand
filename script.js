let allCitations = []; // To store all the loaded citations
let currentPage = 1; // Current page number
const itemsPerPage = 25; // Number of citations per page

// Load the JSON file
fetch('justice.json')
  .then(response => response.json())
  .then(data => {
    allCitations = data; // Save data for pagination
    renderPage(currentPage); // Render the first page
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });

// Function to render a specific page
function renderPage(page) {
  const container = document.getElementById('citations-container');
  container.innerHTML = ''; // Clear the container

  // Calculate start and end indices for the current pagex
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, allCitations.length);

  // Render citations for the current page
  for (let i = startIndex; i < endIndex; i++) {
    const entry = allCitations[i];
    const citationDiv = document.createElement('div');
    citationDiv.className = 'citation';

   // Create the title element with a link
   const title = document.createElement('div');
   title.className = 'citation-title';
   title.innerHTML = `<a href="${entry.url || '#'}" target="_blank">${entry.title || 'No Title'}</a>`;


    const details = document.createElement('div');
    details.className = 'citation-details';
    details.innerHTML = `
  ${entry.author || 'Unknown'}<br>
    ${entry.isPartOf || 'Unknown'} (${entry.publicationYear || 'N/A'})<br>
    `;

    citationDiv.appendChild(title);
    citationDiv.appendChild(details);
    container.appendChild(citationDiv);
  }

  // Update pagination controls
  updatePaginationControls(page);
}

// Function to update pagination controls
function updatePaginationControls(page) {
  const totalPages = Math.ceil(allCitations.length / itemsPerPage);
  document.getElementById('page-info').textContent = `Page ${page} of ${totalPages}`;

  // Enable or disable buttons based on current page
  document.getElementById('prev-page').disabled = page === 1;
  document.getElementById('next-page').disabled = page === totalPages;
}

// Event listeners for pagination controls
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

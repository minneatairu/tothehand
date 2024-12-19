let allCitations = []; // To store all the loaded citations
let filteredCitations = []; // To store filtered citations
let currentPage = 1; // Current page number
const itemsPerPage = 25; // Number of citations per page

// Load the JSON file
fetch('justice.json')
  .then(response => response.json())
  .then(data => {
    allCitations = data; // Save data for pagination
    filteredCitations = allCitations; // Initially, show all citations
    renderPage(currentPage); // Render the first page
    populateYearFilter(); // Populate the year filter dropdown
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });

// Function to render a specific page
function renderPage(page) {
  const container = document.getElementById('citations-container');
  container.innerHTML = ''; // Clear the container

  // Calculate start and end indices for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredCitations.length);

  // Render citations for the current page
  for (let i = startIndex; i < endIndex; i++) {
    const entry = filteredCitations[i];
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
  const totalPages = Math.ceil(filteredCitations.length / itemsPerPage);
  document.getElementById('page-info').textContent = `Page ${page} of ${totalPages}`;

  // Enable or disable buttons based on current page
  document.getElementById('prev-page').disabled = page === 1;
  document.getElementById('next-page').disabled = page === totalPages;
}

// Function to populate the year filter dropdown
function populateYearFilter() {
  const years = [...new Set(allCitations.map(entry => entry.publicationYear).filter(Boolean))].sort();
  const yearFilter = document.getElementById('year-filter');

  const allOption = document.createElement('option');
  allOption.value = '';
  allOption.textContent = 'All Years';
  yearFilter.appendChild(allOption);

  years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  });
}

// Event listener for year filter
document.getElementById('year-filter').addEventListener('change', event => {
  const selectedYear = event.target.value;
  if (selectedYear) {
    filteredCitations = allCitations.filter(entry => entry.publicationYear === selectedYear);
  } else {
    filteredCitations = allCitations; // Reset to all citations
  }
  currentPage = 1; // Reset to the first page
  renderPage(currentPage);
});

// Event listeners for pagination controls
document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  const totalPages = Math.ceil(filteredCitations.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage);
  }
});

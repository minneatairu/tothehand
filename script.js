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

  function truncateTitle(title) {
    const wordLimit = 5; // Set the limit of words
    const words = title.split(' '); // Split the title into words
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'; // Join the first five words and add ellipsis
    }
    return title; // Return the original title if it's within the limit
  }
  
// Function to render a specific page
function renderPage(page) {
  const container = document.getElementById('citations-container');
  container.innerHTML = ''; // Clear the container before rendering new content

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, allCitations.length);

  for (let i = startIndex; i < endIndex; i++) {
    const entry = allCitations[i];
    const citationDiv = document.createElement('div');
    citationDiv.className = 'citation';

    // Creating and appending the article title with a link
    const titleDiv = document.createElement('div');
    titleDiv.className = 'title';
    const titleLink = document.createElement('a');
    titleLink.href = entry.url || '#'; // Use the URL from the entry or fallback to '#' if none provided
    titleLink.textContent = truncateTitle(entry.title) || 'No Title Available';
    titleLink.target = "_blank"; // Opens the link in a new tab
    titleLink.rel = "noopener noreferrer"; // Security measure for links opening in a new tab
    titleDiv.appendChild(titleLink);
    citationDiv.appendChild(titleDiv);

    // Creating and appending the journal name
    const journalDiv = document.createElement('div');
    journalDiv.className = 'journal';
    journalDiv.textContent = entry.isPartOf || 'Unknown Journal';
    citationDiv.appendChild(journalDiv);

    // Author's name
    const authorDiv = document.createElement('div');
    authorDiv.className = 'author';
    authorDiv.textContent = entry.author || 'Unknown Author';
    citationDiv.appendChild(authorDiv);

    // Publication year
    const yearDiv = document.createElement('div');
    yearDiv.className = 'year';
    yearDiv.textContent = entry.publicationYear || 'N/A';
    citationDiv.appendChild(yearDiv);

    // Append the complete citation div to the container
    container.appendChild(citationDiv);
  }

  updatePaginationControls(page); // Update pagination controls based on the new page
}






// Function to update pagination controls
function updatePaginationControls(page) {
  const totalPages = Math.ceil(allCitations.length / itemsPerPage);
  document.getElementById('page-info').textContent = `Page ${page} of ${totalPages}`;

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

// Modal functionality
const citationsModal = document.getElementById('citationsModal');
const aboutModal = document.getElementById('aboutModal');
const citationsButton = document.getElementById('citationsButton');
const aboutButton = document.getElementById('aboutButton');
const closeCitations = document.getElementById('closeCitations');
const closeAbout = document.getElementById('closeAbout');

citationsButton.addEventListener('click', () => {
  citationsModal.style.display = 'block';
});

aboutButton.addEventListener('click', () => {
  aboutModal.style.display = 'block';
});

closeCitations.addEventListener('click', () => {
  citationsModal.style.display = 'none';
});

closeAbout.addEventListener('click', () => {
  aboutModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === citationsModal) {
    citationsModal.style.display = 'none';
  } else if (event.target === aboutModal) {
    aboutModal.style.display = 'none';
  }
});

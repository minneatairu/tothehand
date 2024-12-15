// Load the JSON file
fetch('justice.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('citations-container');

    // Loop through each citation and render it
    data.forEach(entry => {
      // Create citation container
      const citationDiv = document.createElement('div');
      citationDiv.className = 'citation';

      // Create citation title
      const title = document.createElement('div');
      title.className = 'citation-title';
      title.textContent = entry.title || 'No Title';

      // Create citation details
      const details = document.createElement('div');
      details.className = 'citation-details';
      details.innerHTML = `
        <strong>Author:</strong> ${entry.creator || 'Unknown'}<br>
        <strong>Published in:</strong> ${entry.isPartOf || 'Unknown'} (${entry.publicationYear || 'N/A'})<br>
        <strong>Publisher:</strong> ${entry.publisher || 'Unknown'}<br>
        <strong>Provider:</strong> ${entry.provider || 'Unknown'}<br>
        <a href="${entry.url || '#'}" target="_blank">Read More</a>
      `;

      // Append title and details to the citation container
      citationDiv.appendChild(title);
      citationDiv.appendChild(details);

      // Append the citation container to the main container
      container.appendChild(citationDiv);
    });
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });

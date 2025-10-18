const baseURL = 'http://localhost:3000/ramens';

// Fetch all ramen and display thumbnails
function displayRamens() {
  fetch(baseURL)
    .then(res => res.json())
    .then(ramens => {
      ramens.forEach(renderRamenThumbnail);

      // Optional: Show first ramen on load
      if (ramens.length > 0) {
        renderRamenDetails(ramens[0]);
      }
    })
    .catch(error => console.error('Error fetching ramens:', error));
}

// Render a single thumbnail to #ramen-menu
function renderRamenThumbnail(ramen) {
  const menu = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;

  img.addEventListener('click', () => handleClick(ramen));

  menu.appendChild(img);
}

// When a ramen is clicked
function handleClick(ramen) {
  renderRamenDetails(ramen);
}

// Update detail section
function renderRamenDetails(ramen) {
  document.querySelector('.detail-image').src = ramen.image;
  document.querySelector('.name').textContent = ramen.name;
  document.querySelector('.restaurant').textContent = ramen.restaurant;
  document.getElementById('rating-display').textContent = `Rating: ${ramen.rating}`;
  document.getElementById('comment-display').textContent = `Comment: ${ramen.comment}`;
}

// Add listener for new ramen form
function addSubmitListener() {
  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newRamen = {
      name: e.target.name.value,
      restaurant: e.target.restaurant.value,
      image: e.target.image.value,
      rating: parseInt(e.target.rating.value),
      comment: e.target.comment.value
    };

    renderRamenThumbnail(newRamen);

    // Reset form
    form.reset();
  });
}

// Main function to run after DOM is loaded
function main() {
  displayRamens();
  addSubmitListener();
}

document.addEventListener('DOMContentLoaded', main);

// Function to create a country card element
function createCountryCard(country) {
    const card = document.createElement('article');
    card.classList.add('country');
  
    // Set the image, title, and other info
    card.innerHTML = `
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
      <div class="country-info">
        <h2 class="card-title">${country.name.common}</h2>
        <ul class="card-info">
          <li><strong>Population:</strong> ${country.population.toLocaleString()}</li>
          <li><strong>Region:</strong> ${country.region}</li>
          <li><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</li>
        </ul>
      </div>
    `;
  
    return card;
  }
  
  // Function to display all countries or filtered countries
  function displayCountries(countries) {
    const countriesContainer = document.querySelector('.countries-container .container');
    countriesContainer.innerHTML = ''; // Clear any existing content
  
    countries.forEach(country => {
      const countryCard = createCountryCard(country);
      countriesContainer.appendChild(countryCard);
    });
  }
  
  // Fetch countries data from API
  async function fetchCountries() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const countries = await response.json();
      console.log('Fetched countries:', countries); // Debugging line
      displayCountries(countries);
      addFilterEvent(countries);
    } catch (error) {
      console.error('Error fetching countries data:', error);
    }
  }
  
  // Filter countries by region
  function filterByRegion(countries, region) {
    if (region === 'Filter by Region') {
      displayCountries(countries);
    } else {
      const filteredCountries = countries.filter(country => country.region === region);
      console.log(`Filtered countries in ${region}:`, filteredCountries); // Debugging line
      displayCountries(filteredCountries);
    }
  }
  
  // Add event listener to the filter dropdown
  function addFilterEvent(countries) {
    const regionSelect = document.querySelector('select'); // Targeting the first <select> element
    regionSelect.addEventListener('change', () => {
      const selectedRegion = regionSelect.value;
      console.log('Selected region:', selectedRegion); // Debugging line
      filterByRegion(countries, selectedRegion);
    });
  }
  
  // Initialize the app
  fetchCountries();
  
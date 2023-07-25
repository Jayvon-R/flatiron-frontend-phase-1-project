// This function fetches data for 807 Pokémon from the PokeAPI and returns an array with information about each Pokémon.
async function fetchPokemonData() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=807`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the response data as JSON, so we can read and use the data.
      const data = await response.json();
      // Extract the list of Pokémon from the data.
      const pokemonList = data.results;
      const pokemonData = [];
      for (const pokemon of pokemonList) {
        const res = await fetch(pokemon.url);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the response data as JSON to get detailed information about each Pok emon.
        const pokemonInfo = await res.json();
        pokemonData.push(pokemonInfo);
      }
      return pokemonData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  // Event listener to fetch data and display Pokemon cards on page load
document.addEventListener('DOMContentLoaded', async () => {
    const pokemonData = await fetchPokemonData();
    displayPokemonCards(pokemonData);
});

// shuffleArray displays pokemon in a random order
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

  
  // Function to display Pokemon cards on the page
function displayPokemonCards(pokemonList) {
    const shuffledPokemonList = shuffleArray(pokemonList);
    const limitedPokemonList = shuffledPokemonList.slice(0, 16);

    const pokemonListContainer = document.querySelector('.pokemon-list');
    pokemonListContainer.innerHTML = '';

    limitedPokemonList.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div class="card-info">
                <h3>${capitalizeFirstLetter(pokemon.name)}</h3>
                <p>Type: ${pokemon.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ')}</p>
            </div>
        `;
        pokemonListContainer.appendChild(card);

        card.addEventListener('click', () => {
            displayModal(pokemon);
        });
    });
}

// Randomize button
function randomizePokemonCards(pokemonList) {
    const shuffledPokemonList = shuffleArray(pokemonList);
    const limitedPokemonList = shuffledPokemonList.slice(0, 16);
    displayPokemonCards(limitedPokemonList);
}
// Event listener for the Randomize button click to display a new set of random Pokémon cards
document.getElementById('randomize-btn').addEventListener('click', async () => {
    const pokemonData = await fetchPokemonData();
    randomizePokemonCards(pokemonData);
});


// Capitalizes first letter of Pokemon names 
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to display the cards with more Pokemon info when clicked
function displayModal(pokemon) {
    const modal = document.getElementById('modal');
    const {
        name,
        sprites: { front_default: image },
        abilities,
        stats,
        weight
    } = pokemon;
    const modalName = document.getElementById('modal-name');
    const modalImage = document.getElementById('modal-image');
    const modalAbilities = document.getElementById('modal-abilities');
    const modalBaseStats = document.getElementById('modal-base-stats');
    const modalWeight = document.getElementById('modal-weight');
    const closeModal = document.getElementById('close-modal');

    displayPokemonName(modalName, name);
    displayPokemonImage(modalImage, image);
    displayPokemonAbilities(modalAbilities, abilities);
    displayPokemonStats(modalBaseStats, stats);
    displayPokemonWeight(modalWeight, weight);

    showModal(modal);

    closeModal.onclick = function () {
        hideModal(modal);
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            hideModal(modal);
        }
    };
}

function displayPokemonName(element, name) {
    element.textContent = capitalizeFirstLetter(name);
}

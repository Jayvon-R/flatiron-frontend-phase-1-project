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
  

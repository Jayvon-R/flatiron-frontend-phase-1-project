// Function to fetch Pokémon data from the PokeAPI
async function fetchPokemonData() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=807`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const pokemonList = data.results;
        
        const pokemonData = [];
        for (const pokemon of pokemonList) {
            const res = await fetch(pokemon.url);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const pokemonInfo = await res.json();
            pokemonData.push(pokemonInfo);
        }
        
        return pokemonData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
}

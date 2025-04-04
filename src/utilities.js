const getPokemonImage = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    
    return {
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default
    };
};

export const getMultiplePokemonImages = async (count) => {
    const maxPokemon = 151;
    const promises = [];

    for (let i = 0; i < count; i++) {
        const randomID = Math.floor(Math.random() * maxPokemon) + 1;
        promises.push(getPokemonImage(randomID));
    }

    const pokemonData = await Promise.all(promises);

    return pokemonData;
};

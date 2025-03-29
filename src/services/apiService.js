export const fetchPokemonByType = async (type) => {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type ? type + '/' : ''}`);
  const data = await res.json();
  return data;
}; 


export const fetchPokemonByName = async (name) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.json();    
  return data;
};

export const fetchPokemons = async (offset = 0, limit = 20) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await res.json();
  return data.results;
};

export const fetchPokemonDetails = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  return data;
};

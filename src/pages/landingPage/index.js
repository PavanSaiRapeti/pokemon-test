import React, { useEffect, useState } from "react";
import PokeList from "../../component/PokeList";
import { fetchPokemonByType, fetchPokemons } from "../../services/ApiService";
import Search from "../../component/Search";

const LandingPage = ({ allPokemons, types }) => {
  const [pokemons, setPokemons] = useState(allPokemons);
  const [type, setType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(20);

  const handleSearch = (type, searchTerm) => {
    setType(type);
    setSearchTerm(searchTerm);
  }; 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let filteredPokemons = allPokemons;

        if (type) {
          const typePokemons = await fetchPokemonByType(type);
          if (typePokemons && typePokemons.pokemon.length > 0) {
            filteredPokemons = typePokemons.pokemon.map(pokemon => pokemon.pokemon);
          }
        }

        if (searchTerm) {
          filteredPokemons = filteredPokemons.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase()));
        }

        setPokemons(filteredPokemons.length > 0 ? filteredPokemons : []);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, allPokemons, searchTerm]);

  useEffect(() => {
    const fetchMorePokemons = async () => {
      const newPokemons = await fetchPokemons(offset, 20);
      setPokemons(prevPokemons => [...prevPokemons, ...newPokemons]);
    };
    fetchMorePokemons();
  }, [offset]);

  return (
    <div className="container mx-auto p-4 overflow-auto h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Pokemon Search</h1>
      <Search types={types} onSearch={handleSearch} />
      {loading ? <div>Loading...</div> : <PokeList pokemons={pokemons} />}
      <button onClick={() => setOffset(prevOffset => prevOffset + 20)}>Load More</button>
    </div>
  );
};

export const getServerSideProps = async () => {
  const types = await fetchPokemonByType();
  const typesArray = types.results.map(type => ({
    name: type.name,
    id: Number(type.url.split('/')[6])
  }));
  const allPokemons = await fetchPokemons(0, 20);
  return { props: { allPokemons, types: typesArray } };
};

export default LandingPage;

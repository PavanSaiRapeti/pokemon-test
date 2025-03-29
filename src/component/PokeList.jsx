
import { useState, useEffect } from 'react';    
import { fetchPokemonDetails } from '../services/ApiService';
import PokeCard from './PokeCard';

const PokeList = ({ pokemons }) => {
    const [pokemonDetails, setPokemonDetails] = useState([]);

    useEffect(() => {
        const fetchAllPokemonDetails = async () => {
            const detailsPromises = pokemons.map(pokemon => fetchPokemonDetails(pokemon.name));
            const details = await Promise.all(detailsPromises);
            setPokemonDetails(details);
        }
        fetchAllPokemonDetails();
        console.log('pokemonDetails', pokemonDetails , 'pokemons', pokemons);
    }, [pokemons]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pokemonDetails.map((details, index) => (
                <PokeCard key={index} id={details.id} pokemon={details} />
            ))}
        </div>
    );
};

export default PokeList; 
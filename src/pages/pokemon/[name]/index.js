import React from 'react'
import { fetchPokemonDetails } from '../../../services/ApiService'
import { useRouter } from 'next/router'

const LandingPage = ({ pokemon }) => {
  const router = useRouter()

  return (
    <div className='container b'>
      <button onClick={() => router.back()} className='text-blue-500 mb-4'>
        &lt; Back
      </button>
      <div className=' flex  justify-center mx-auto p-4 w-screen h-3/4 pt-10 '>
        {pokemon ? (
          <div className='flex flex-col items-center border-2  bg-white rounded-lg w-1/4 '>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className='mb-4  w-[400px]' />
            <div className='bg-[#fdc666] rounded-lg p-6 '>
              <h1 className='text-2xl mb-2'><b>Name:</b> {pokemon.name}</h1>
              <p className='mb-2'><b>Type:</b> {pokemon.types.map((type) => type.type.name).join(', ')}</p>
              <p className='mb-2'><b>Stats:</b> {pokemon.stats.map((stat) => stat.stat.name).join(', ')}</p>
              <p className='mb-2'><b>Abilities:</b> {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
              <p><b>Some Moves:</b> {pokemon.moves.slice(0, 5).map((move) => move.move.name).join(', ')}</p>  
            </div>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const name = context.params?.name || null
  const pokemon = name ? await fetchPokemonDetails(name) : null
  return { props: { pokemon } }
}

export default LandingPage

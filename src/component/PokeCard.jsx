import Link from 'next/link';

const PokeCard = ({ pokemon }) => {
    return (
        <div className=" border-2 rounded-2xl flex flex-col bg-gray-200 ">
            <div className="flex flex-col items-center rounded-t-2xl bg-white">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mb-2 w-1/2 " />
            </div>
            
            <div className="flex flex-col p-5 ">
            <h2 className="text-lg font-bold mb-2 h-[100px]">{pokemon.name}</h2>
            <Link href={`/pokemon/${pokemon.name}`} className="border p-2 rounded bg-blue-500 text-white">
                Details →
            </Link>
            </div>
        </div>
    );
};

export default PokeCard; 
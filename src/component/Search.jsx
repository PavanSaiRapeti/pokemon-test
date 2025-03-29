import React, { useState } from 'react';

const Search = ({ onSearch, types }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [type, setType] = useState('');

    const handleSearch = () => {
        onSearch(type, searchTerm);
    };

    return (
        <div className="flex  flex-col  space-x-2 w-1/3">
            <select 
                value={type} 
                onChange={(e) => setType(e.target.value)} 
                className="border rounded p-2 mb-2 w-1/2"
            >
                <option value="">Select Type</option>
                {types ? types.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                )) : null}
            </select>
            <div className="flex items-center mb-2">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="border rounded p-2 flex-grow"
            />
            <button 
                onClick={handleSearch} 
                className="bg-blue-600 text-white rounded p-2"
            >
                Search
            </button>
            </div>
        </div>
    );
};

export default Search; 
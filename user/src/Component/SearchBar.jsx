import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const SearchBox = () => {
    const [searchWord, setSearchWord] = useState('');

    return (
        <div className="col-sm-4 search-container">
            <div className="search_boxx ">
                <input  
                    type="text" 
                    placeholder="Tìm kiếm sách, tác giả" 
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    className="search-input"
                />
                <Link to="/BookBySearch" 
                    state={{ 
                        searchWord: searchWord 
                    }}>
                <button className="search-button">Tìm kiếm</button>          
                </Link>
                
            </div>
        </div>
    );
};

export default SearchBox;

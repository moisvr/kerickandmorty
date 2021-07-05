import React from 'react';

function SearchFormEpisodes(props) {
    return (
        <form className="search-form" onSubmit={props.onSubmit}>
            <div className="search-form--group">
                <label>Name</label>
                <div className="search-form--input-container">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="name..."
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <div className="search-form--group">
                <label>Episode code</label>
                <small>insert the episode code name (e.g. S03E01 = season 3 episode 1)</small>
                <div className="search-form--input-container">
                    <input 
                        type="text"
                        name="episode" 
                        placeholder="insert code..."
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <button className="search-form--submit">
                Find episode(s)
            </button>
        </form>
    )
}

export default SearchFormEpisodes;
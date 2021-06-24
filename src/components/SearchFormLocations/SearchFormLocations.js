import React from 'react';

function SearchFormLocations(props) {
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
                <label>Type</label>
                <div className="search-form--input-container">
                    <input 
                        type="text" 
                        name="type" 
                        placeholder="type..."
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <div className="search-form--group">
                <label>Dimension</label>
                <div className="search-form--input-container">
                    <input 
                        type="text" 
                        name="dimension" 
                        placeholder="dimension..."
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <button className="search-form--submit">
                Find character(s)
            </button>
        </form>
    )
}

export default SearchFormLocations

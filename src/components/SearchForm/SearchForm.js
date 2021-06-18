import React from 'react';

import './SearchForm.css';

function SearchForm(props) {
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
                <label>Status</label>
                <div className="search-form--input-container">
                    <input 
                        list="status"
                        placeholder="select..."
                        name="status"
                        onChange={props.onChange}
                    />
                </div>
                <datalist id="status">
                    <option value="Alive"></option>
                    <option value="Dead"></option>
                    <option value="Unknown"></option>
                </datalist>
            </div>
            <div className="search-form--group">
                <label>Species</label>
                <div className="search-form--input-container">
                    <input 
                        type="text" 
                        name="species" 
                        placeholder="species...(e.g. human, animal, humanoid)"
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <div className="search-form--group">
                <label>Gender</label>
                <div className="search-form--input-container">
                    <input 
                        list="gender"
                        placeholder="select..."
                        name="gender"
                        onChange={props.onChange}
                    />
                </div>
                <datalist id="gender">
                    <option value="Female"></option>
                    <option value="Male"></option>
                    <option value="Genderless"></option>
                    <option value="Unknown"></option>
                </datalist>
            </div>
            <button className="search-form--submit">
                Find character(s)
            </button>
        </form>
    )
}

export default SearchForm;
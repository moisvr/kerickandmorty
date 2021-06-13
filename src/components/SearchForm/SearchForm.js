import React from 'react';

import './SearchForm.css';

function SearchForm(props) {
    return (
        <form className="search-form" onSubmit={props.onSubmit}>
            <div className="search-form--group">
                <label>Name</label>
                <div className="search-form--input-container">
                    <input type="text" name="name" placeholder="name..." />
                </div>
            </div>
            <div className="search-form--group">
                <label>Origin</label>
                <div className="search-form--input-container">
                    <input list="origin" placeholder="select..." />
                </div>
                <datalist id="origin">
                    <option value="Earth"></option>
                    <option value="Mars"></option>
                    <option value="Pluto"></option>
                </datalist>
            </div>
            <div className="search-form--group">
                <label>Status</label>
                <div className="search-form--input-container">
                    <input list="status" placeholder="select..." />
                </div>
                <datalist id="status">
                    <option value="Alive"></option>
                    <option value="Death"></option>
                    <option value="Unknown"></option>
                </datalist>
            </div>
            <div className="search-form--group">
                <label>Season</label>
                <div className="search-form--input-container">
                    <input list="season" placeholder="select..." />
                </div>
                <datalist id="season">
                    <option value="One"></option>
                    <option value="Two"></option>
                    <option value="Three"></option>
                    <option value="Four"></option>
                </datalist>
            </div>
        </form>
    )
}

export default SearchForm;
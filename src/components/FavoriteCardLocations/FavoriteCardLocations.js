import React from 'react';

import './FavoriteCardLocations.css';
function FavoriteCardLocations(props) {
    let residents = props.residents.slice(0,9);
    let noResidents;

    if(residents.length === 0){
        noResidents = <div className="no-residents-container">
                        <p>No residents in this location...</p>
                    </div>;
    }
    return (
        <article className="favorite-card">
            <div className="favorite-card--title">
                <h2 className="favorite-card--title__locations">{props.name}</h2>
            </div>
            <div className="favorite-card--location-container">
                <p className="favorite-card__description-text">Type:</p>
                <p className="favorite-card__info-text">{props.type}</p>
            </div>
            <div className="favorite-card--info-container">
                <p className="favorite-card__description-text">Dimension:</p>
                <p className="favorite-card__info-text">{props.dimension}</p>
            </div>
            <p className="favorite-card--residents-text">
                Some residents:
            </p>
            {noResidents}
            <div className="favorite-card--residents-container">
                {residents.map((resident, index) => {
                    return(
                        <div key={resident.id} className="resident-container">
                            <img src={resident.image} alt="residents image"/>
                        </div>
                    )
                })}
            </div>
        </article>
    )
}

export default FavoriteCardLocations;
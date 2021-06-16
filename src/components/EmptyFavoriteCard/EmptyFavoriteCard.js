import React from 'react';

import lightHouse from '../../assets/img/Lighthouse-pana.png';

function EmptyFavoriteCard() {
    return (
        <article className="favorite-card">
            <img src={lightHouse} alt="empty card image" />
            <div className="favorite-card--title">
                <h2>No name</h2>
                <p className="favorite-card--status"><span className="favorite-card__status-unknown"></span>No status - No species</p>
            </div>
            <div className="favorite-card--location-container">
                <p className="favorite-card__description-text">Species:</p>
                <p className="favorite-card__info-text">No species</p>
            </div>
            <div className="favorite-card--info-container">
                <p className="favorite-card__description-text">Last known location</p>
                <p className="favorite-card__info-text">No location</p>
            </div>
            <div className="favorite-card--button-container">
                <button className="favorite-card--button">
                    More info
                </button>
            </div>
        </article>
    )
}

export default EmptyFavoriteCard;
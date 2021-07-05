import React from 'react';

function FavoriteCardEpisodes(props) {
    let characters = props.characters.slice(0,9);
    let nSeason = props.episode.slice(1, 3);
    let nEpisode = props.episode.slice(4, 6);
    return (
        <article className="favorite-card">
            <div className="favorite-card--title">
                <h2 className="favorite-card--title__locations">Episode: {props.name}</h2>
            </div>
            <div className="favorite-card--location-container">
                <p className="favorite-card__description-text favorite-card__air-date">Season:</p>
                <p className="favorite-card__info-text favorite-card__air-date">{nSeason}</p>
            </div>
            <div className="favorite-card--location-container">
                <p className="favorite-card__description-text favorite-card__air-date">Episode:</p>
                <p className="favorite-card__info-text favorite-card__air-date">{nEpisode}</p>
            </div>
            <div className="favorite-card--info-container">
                <p className="favorite-card__description-text">Air date:</p>
                <p className="favorite-card__info-text">{props.air_date}</p>
            </div>
            <p className="favorite-card--residents-text">
                Some characters:
            </p>
            <div className="favorite-card--residents-container">
                {characters.map((character) => {
                    return(
                        <div key={character.id} className="resident-container">
                            <img src={character.image} alt={`name: ${character.name}`}/>
                        </div>
                    )
                })}
            </div>
        </article>
    )
}

export default FavoriteCardEpisodes;
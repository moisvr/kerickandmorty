import React from 'react';

import './FavoriteCard.css';

function FavoriteCard(props) {
    // console.log("favorite card rendered!");
    // console.log(props.char_id);
    let status_class;
    if(props.status === "Alive"){
        status_class = "favorite-card__status-alive";
    }else if(props.status === "Dead"){
        status_class = "favorite-card__status-dead";
    }else{
        status_class = "favorite-card__status-unknown";
    }
    return (
        <article onClick={() => props.onOpenModal(props.char_id)} className="favorite-card">
            <img src={props.img} alt="" />
            <div className="favorite-card--title">
                <h2>{props.name}</h2>
                <p className="favorite-card--status"><span className={status_class}></span>{props.status} - {props.species}</p>
            </div>
            <div className="favorite-card--location-container">
                <p className="favorite-card__description-text">Species:</p>
                <p className="favorite-card__info-text">{props.species}</p>
            </div>
            <div className="favorite-card--info-container">
                <p className="favorite-card__description-text">Last known location</p>
                <p className="favorite-card__info-text">{props.location}</p>
            </div>
            <div className="favorite-card--button-container">
                <button className="favorite-card--button">
                    More info
                </button>
            </div>
        </article>
    )
}

export default FavoriteCard;
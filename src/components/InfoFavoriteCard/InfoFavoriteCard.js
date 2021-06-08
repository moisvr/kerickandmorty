import React from 'react';

import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import res2 from '../../assets/img/res2.jpeg';
import './InfoFavoriteCard.css';

function InfoFavoriteCard (props) {
    if(props.modalLoading){
        return (
            <Modal onCloseModal={props.onCloseModal} isModalOpen={props.modalIsOpen} >
                <article className="favorite-card favorite-card__modal favorite-card__loading">
                    <Loader loading={true} />
                </article>
            </Modal>
        )
    }
    let status_class;
    let extraInfo = props.extraInfo;
    if(props.extraInfo.selectedCharacter.status === "Alive"){
        status_class = "favorite-card__status-alive";
    }else if(props.extraInfo.selectedCharacter.status === "Dead"){
        status_class = "favorite-card__status-dead";
    }else{
        status_class = "favorite-card__status-unknown";
    }
    return (
        <Modal onCloseModal={props.onCloseModal} isModalOpen={props.modalIsOpen} >
            <article className="favorite-card favorite-card__modal">
                <img src={extraInfo.selectedCharacter.image} alt="" />
                <div className="favorite-card--title">
                    <h2>{extraInfo.selectedCharacter.name}</h2>
                    <p className="favorite-card--status"><span className={status_class}></span>{extraInfo.selectedCharacter.status} - {extraInfo.selectedCharacter.species}</p>
                </div>
                <div className="favorite-card--location-container">
                    <p className="favorite-card__description-text">Origin:</p>
                    <p className="favorite-card__info-text">{extraInfo.selectedCharacter.origin.name}</p>
                </div>
                <div className="Infofavorite-card--info-container">
                    <p className="favorite-card__description-text">Dimension:</p>
                    <p className="favorite-card__info-text">{extraInfo.dimensionData.dimension}</p>
                </div>
                <div className="favorite-card--seen-container">
                    <p className="favorite-card__description-text">First seen in:</p>
                    <p className="favorite-card__info-text">{extraInfo.episodeData.name}</p>
                </div>
                <div className="favorite-card--airdate-container">
                    <p className="favorite-card__description-text">Air date:</p>
                    <p className="favorite-card__info-text">{extraInfo.episodeData.air_date}</p>
                </div>
                <div className="favorite-card--button-container">
                    <button className="favorite-card--button" onClick={props.onCloseModal}>
                        Close
                    </button>
                </div>
            </article>
        </Modal>
    )
}

export default InfoFavoriteCard;
import React from 'react';
import { Link } from 'react-router-dom';

import wp1 from '../../assets/img/WP-1.png';
import wp2 from '../../assets/img/WP-2.jpg';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard';
import InfoFavoriteCard from '../../components/InfoFavoriteCard/InfoFavoriteCard';
import Loader from '../../components/Loader/Loader';
import './Home.css';

class Home extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            totalCount: 0,
            loading: true,
            modalLoading: false,
            error: null,
            modalIsOpen: false,
            characters: [],
            extraInfo: {}        
        }
    }

    handleOpenModal = (e) => {
        let characters = this.state.characters;
        let char_selected = characters.find((element) => element.id === e);
        let location_url = char_selected.location.url;
        let episode_url = char_selected.episode[0];

        const URL_character = location_url;
        this.fetchData(URL_character, (error2, data2) => {
            this.fetchData(episode_url, (error3, data3) => {
                this.setState({
                    modalLoading: false,
                    extraInfo: {
                        selectedCharacter: char_selected,
                        dimensionData: data2,
                        episodeData: data3
                    }
                });
            });
        });

        this.setState({ 
            modalIsOpen: true, 
            modalLoading: true 
        });
    }

    handleCloseModal = (e) => {
        this.setState({ modalIsOpen: false });
    }

    moveSlider = (e) => {
        let slider_container = document.getElementsByClassName("main-slider--card");
        let slider_item = document.getElementsByClassName("main-slider--item");
        let slider_size = slider_item[0].clientWidth;

        if(e.target.id === "toLeft"){
            slider_container[0].scrollLeft -= slider_size;
        }else
        if(e.target.id === "toRight"){
            slider_container[0].scrollLeft += slider_size;
        }
    }

    fetchData = (URL, callback) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', URL, true);
        xhttp.onreadystatechange = function (event) {
            if(xhttp.readyState === 4){
                if(xhttp.status === 200){
                    return callback(null, JSON.parse(xhttp.responseText));
                }else{
                    const error = new Error(`Hubo un error: ${xhttp.responseText}`);
                    return callback(error, null);
                }
            }
        }
        xhttp.send();
    }
    
    sixRandomNumbers = (e) => {
        let arr = [];
        while(arr.length < 6){
            let r = Math.floor(Math.random() * 19);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        return arr;
    }

    filterFavorites = (rn, data) => {
        let filteredFavorites = [];
        let count = 0;
        rn.forEach((e) => {
            filteredFavorites[count] = data.results[e];
            count++;
        });
        return filteredFavorites;
    }

    componentDidMount(){
        let random_page = Math.floor(Math.random() * 33);
        let rn = this.sixRandomNumbers();
        let filteredCharacters;
        const URL_character = `https://rickandmortyapi.com/api/character?page=${random_page}`;
        this.fetchData(URL_character, (error1, data1) => {
            filteredCharacters = this.filterFavorites(rn, data1);
            this.setState({ 
                totalCount: data1.info.count,
                loading:false,
                characters: filteredCharacters
            });
        });
    }

    render() {
        let totalCount = this.state.totalCount;
        let favorites = this.state.characters;
        let extraInfo;

        if(this.state.modalIsOpen){
            extraInfo = <InfoFavoriteCard 
                            extraInfo={this.state.extraInfo}
                            modalIsOpen={this.state.modalIsOpen}
                            modalLoading={this.state.modalLoading}
                            onCloseModal={this.handleCloseModal} 
                        />
        }
        return (
            <main>
                <section className="main-slider">
                    <section className="main-slider--slides">
                        <article className="main-slider--card">
                            <img className="main-slider--item" src={wp1} alt="imagen del carrusel" />
                            <img className="main-slider--item" src={wp2} alt="imagen del carrusel" />
                        </article>
                    </section>
                    <Link to={'/'} id="toLeft" onClick={this.moveSlider} href="#" className="main-slider--left-arrow">
                        <span className="main-slider--left-arrow-span"></span>
                    </Link>
                    <Link onClick={this.moveSlider} id="toRight" to={'/'} className="main-slider--right-arrow">
                        <span className="main-slider--right-arrow-span"></span>
                    </Link>
                </section>
                <section className="main-favorites">
                    <h1>Characters</h1>
                    <div className="favorite-cards--container">
                        <Loader loading={this.state.loading} />
                        {favorites.map((character) => {
                            return (
                                <FavoriteCard
                                    key={character.id}
                                    char_id={character.id}
                                    img={character.image}
                                    name={character.name}
                                    status={character.status}
                                    species={character.species}
                                    location={character.location.name}
                                    species={character.species}
                                    origin={character.origin}

                                    modalIsOpen={this.state.modalIsOpen}
                                    onOpenModal={this.handleOpenModal} 
                                    onCloseModal={this.handleCloseModal} 
                                />
                            )
                        })}
                    </div>
                    <div className="favorite-cards--total-container">
                        <p>Current total: {totalCount}</p>
                    </div>
                    <div className="favorite-cards--all-characters-container">
                        <button>All characters</button>
                    </div>
                    {extraInfo}
                </section>
            </main>
        )
    }
    
}

export default Home;
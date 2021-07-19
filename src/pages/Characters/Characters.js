import React from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import Loader from '../../components/Loader/Loader';
import SearchForm from '../../components/SearchForm/SearchForm';
import EmptyFavoriteCard from '../../components/EmptyFavoriteCard/EmptyFavoriteCard';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard';
import InfoFavoriteCard from '../../components/InfoFavoriteCard/InfoFavoriteCard';

import NoData from '../../assets/img/No-data-pana.png';
import './Characters.css';

class Characters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            display: false,
            error: false,
            loading: false,
            modalIsOpen: false,
            modalLoading: false,
            data: [],
            form: {
                name: '',
                status: '',
                species: '',
                gender: ''
            },
            extraInfo: {},
            isMobile: true
        }
    }

    handleOpenModal = (e) => {
        let characters = this.state.data;
        let char_selected = characters.find((element) => element.id === e);
        this.setState({
            modalLoading: false,
            extraInfo: {
                selectedCharacter: char_selected,
                dimensionData: char_selected.origin,
                episodeData: char_selected.episode[0]
            }
        });
        this.setState({ 
            modalIsOpen: true, 
        });
    }
    handleCloseModal = (e) => {
        this.setState({ modalIsOpen: false });
    }

    fetchData = (url_api) => {
        return new Promise((resolve, reject) => {
            const xhttp = new XMLHttpRequest();
            xhttp.open('GET', url_api, true);
            xhttp.onreadystatechange = (() => {
                if(xhttp.readyState === 4){
                    (xhttp.status === 200)
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('error: ', url_api));
                }
            });
            xhttp.send();
        });
    }

    handleChange = (e) => {
        this.setState({
            form: {
               ...this.state.form,
               [e.target.name]: e.target.value
            }
         })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: true, error: false});

        let name = this.state.form.name;
        let status = this.state.form.status;
        let species = this.state.form.species;
        let gender = this.state.form.gender;
        const client = new ApolloClient({
            uri: 'https://rickandmortyapi.com/graphql',
            cache: new InMemoryCache()
        });
        client.query({
            query: gql`
                query {
                    characters(
                        filter: { 
                            name: "${name}",
                            status: "${status}",
                            species: "${species}",
                            gender: "${gender}"
                        }
                    ) 
                    {
                        info {
                            count
                        }
                        results {
                            id,
                            name,
                            status,
                            image,
                            species,
                            location {
                                name
                            }
                            origin {
                                name,
                                dimension
                            }
                            episode {
                                name,
                                air_date
                            }
                        }
                    }
                }
            `
        })
        .then((result) => {
            this.setState({ loading: false, data: result.data.characters.results });
        })
        .catch((err) => {
            this.setState({ loading: false, error: true, data: [] });
        });
    }

    handleDropDownForm = () => {
        this.state.display === false 
            ? this.setState({ display: true }) 
            : this.setState({ display: false });
    }

    componentDidMount() {
        window.innerWidth < 885 
                ? this.setState({ isMobile: true }) 
                : this.setState({ isMobile: false });

        window.addEventListener("resize", () => {
            window.innerWidth < 885 
                ? this.setState({ isMobile: true }) 
                : this.setState({ isMobile: false });
        });
    }

    render(){
        let isMobile = this.state.isMobile;
        let searchForm;
        let emptyCard;
        let extraInfo;
        let noInfoYetText;
        let isFormVisible = this.state.display;
        let charactersData = this.state.data;
        let rotate_class = "main-characters--head__rotate-span";
        if(isFormVisible || !isMobile){
            searchForm = <section>
                            <SearchForm 
                                onSubmit={this.handleSubmit} 
                                onChange={this.handleChange}
                            />
                        </section>;
            rotate_class = "main-characters--head__rotate-span";
        }else{
            searchForm = null;
            rotate_class = "";
        }
        if(charactersData.length > 0){
            emptyCard = null;
            noInfoYetText = null;
        }else{
            emptyCard = <EmptyFavoriteCard page={"characters"} />;
            noInfoYetText = <p>No info yet, start searching info using the form above the page!</p>;
        }
        if(this.state.modalIsOpen){
            extraInfo = <InfoFavoriteCard 
                            extraInfo={this.state.extraInfo}
                            modalIsOpen={this.state.modalIsOpen}
                            modalLoading={this.state.modalLoading}
                            onCloseModal={this.handleCloseModal} 
                        />
        }
        if(this.state.error){
            return (
                <main className="main-characters">
                    <h1>Characters Page</h1>
                    <div className="main-characters--head">                        
                        <button onClick={this.handleDropDownForm}>
                            sort by <span className={rotate_class}></span>
                        </button>
                    </div>
                    {searchForm}
                    <div className="main-characters--error-container">
                        <h2>Error: 404: Not Found</h2>
                        <div className="main-characters--img-container">
                            <img src={NoData} alt="no data found image"/>
                        </div>
                        <p>Looks like the data inserted in the form didn't found anything, try again</p>
                    </div>
                </main>
            )
        }
        if(!this.state.isMobile){
            return (
                <main className="main-characters">
                    <h1>Characters Page</h1>
                    <div className="main-characters--head">
                        <div className="main-characters--loader-container">
                            <Loader loading={this.state.loading} />
                        </div>
                    </div>

                    <section className="main-characters--container">
                        <div className="main-characters--form-container">
                            <h2>Sort by</h2>
                            {searchForm}
                        </div>
                        <section className="main-characters--cards-container">
                            {emptyCard}
                            {charactersData.map((characters) => {
                                return (
                                    <FavoriteCard
                                        key={characters.id}
                                        char_id={characters.id}
                                        img={characters.image}
                                        name={characters.name}
                                        status={characters.status}
                                        species={characters.species}
                                        location={characters.location.name}
                                        species={characters.species}
                                        origin={characters.origin.name}

                                        onOpenModal={this.handleOpenModal} 
                                        onCloseModal={this.handleCloseModal} 
                                    />
                                )
                            })}
                        </section>
                    </section>
                    {noInfoYetText}
                    {extraInfo}
                </main>
            )
        }
        return (
            <main className="main-characters">
                <div className="main-characters--head">
                    <h1>Characters Page</h1>
                    <button onClick={this.handleDropDownForm}>
                        sort by <span className={rotate_class}></span>
                    </button>
                </div>
                {searchForm}
                <div className="main-characters--loader-container">
                    <Loader loading={this.state.loading} />
                </div>
                <section className="main-characters--cards-container">
                    {emptyCard}
                    {charactersData.map((characters) => {
                        return (
                            <FavoriteCard
                                key={characters.id}
                                char_id={characters.id}
                                img={characters.image}
                                name={characters.name}
                                status={characters.status}
                                species={characters.species}
                                location={characters.location.name}
                                species={characters.species}
                                origin={characters.origin.name}

                                onOpenModal={this.handleOpenModal} 
                                onCloseModal={this.handleCloseModal} 
                            />
                        )
                    })}
                </section>
                {noInfoYetText}
                {extraInfo}
            </main>
        )
    }
}

export default Characters;
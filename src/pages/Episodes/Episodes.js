import React from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import SearchFormEpisodes from '../../components/SearchFormEpisodes/SearchFormEpisodes';
import EmptyFavoriteCard from '../../components/EmptyFavoriteCard/EmptyFavoriteCard';
import FavoriteCardepisodes from '../../components/FavoriteCardEpisodes/FavoriteCardEpisodes';
import Loader from '../../components/Loader/Loader';

import NoData from '../../assets/img/No-data-cuate.png';
import './Episodes.css';

class Episodes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            display: false,
            loading: false,
            error: false,
            data: [],
            form: {
                name: '',
                episode: '',
                air_date: ''
            }
        }
    }

    handleDropDownForm = () => {
        this.state.display === false 
            ? this.setState({ display: true }) 
            : this.setState({ display: false });
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
        let episode = this.state.form.episode;
        const client = new ApolloClient({
            uri: 'https://rickandmortyapi.com/graphql',
            cache: new InMemoryCache()
        });
        client.query({
            query: gql`
            query {
                episodes(
                    filter:{
                      name: "${name}"
                      episode: "${episode}"
                    }
                  ) {
                    info {
                      count,
                      next
                    }
                    results {
                      name
                      air_date
                      episode
                      characters {
                        id
                        name
                        image
                      }
                    }
                  }
              }
            `
        })
        .then((result) => {
            this.setState({ loading: false, data: result.data.episodes.results });
        })
        .catch((err) => {
            this.setState({ loading: false, error: true, data: [] });
        });
    }

    render(){
        let searchForm;
        let emptyCard;
        let noInfoYetText;
        let rotate_class = "main-characters--head__rotate-span";
        let isFormVisible = this.state.display;
        let episodesData = this.state.data;

        // Form visibility
        if(isFormVisible){
            searchForm = <section>
                            <SearchFormEpisodes 
                                onSubmit={this.handleSubmit} 
                                onChange={this.handleChange}
                            />
                        </section>;
            rotate_class = "main-characters--head__rotate-span";
        }else{
            searchForm = null;
            rotate_class = "";
        }
        //Empty Favorite Card and no info text visivility
        if(episodesData.length > 0){
            emptyCard = null;
            noInfoYetText = null;
        }else{
            emptyCard = <EmptyFavoriteCard page={"episodes"} />;
            noInfoYetText = <p>No info yet, start searching info using the form above the page!</p>;
        }
        if(this.state.error){
            return (
                <main className="main-locations">
                    <div className="main-locations--head">
                        <h1>Locations Page</h1>
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
                        <p>Looks like the data inserted in the form didn't found anything, try again!</p>
                    </div>
                </main>
            )
        }
        return (
            <main className="main-episodes">
                <div className="main-episodes--head">
                    <h1>Episodes Page</h1>
                    <button onClick={this.handleDropDownForm}>
                        sort by <span className={rotate_class}></span>
                    </button>
                </div>
                {searchForm}
                <div className="main-locations--loader-container">
                    <Loader loading={this.state.loading} />
                </div>
                <section className="main-characters--cards-container">
                    {emptyCard}
                    {episodesData.map((episode) => {
                        let num = episode.id;
                        return (
                            <FavoriteCardepisodes 
                                key={episode.id}
                                number={num}
                                name={episode.name}
                                air_date={episode.air_date}
                                episode={episode.episode}
                                characters={episode.characters}
                            />
                        )
                    })}
                </section>
                {noInfoYetText}
            </main>
        )   
    }
}

export default Episodes;
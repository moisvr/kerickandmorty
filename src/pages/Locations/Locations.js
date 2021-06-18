import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import SearchFormLocations from '../../components/SearchFormLocations/SearchFormLocations';
import EmptyFavoriteCard from '../../components/EmptyFavoriteCard/EmptyFavoriteCard';
import Loader from '../../components/Loader/Loader';

import './Locations.css';

class Locations extends Component {
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
            extraInfo: {}
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

    render() {
        let searchForm;
        let emptyCard;
        let noInfoYetText;
        let rotate_class = "main-characters--head__rotate-span";
        let isFormVisible = this.state.display;
        let charactersData = this.state.data;

        //Form visible
        if(isFormVisible){
            searchForm = <section>
                            <SearchFormLocations 
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
            emptyCard = <EmptyFavoriteCard page={"locations"} />;
            noInfoYetText = <p>No info yet! start searching info using the form above the page!</p>;
        }
        return (
            <main className="main-locations">
                <div className="main-locations--head">
                    <h1>Characters Page</h1>
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
                </section>
                {noInfoYetText}
            </main>
        )
    }
}

export default Locations;

// query {
//     locations(page: 1, filter: {name:"XD"}) {
//       info {
//         count
//       }
//       results {
//         id,
//         name,
//         type,
//         dimension,
//         residents {
//           id,
//           name,
//           image
//         }
//       }
//     }
//   }
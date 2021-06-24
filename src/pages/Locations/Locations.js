import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import SearchFormLocations from '../../components/SearchFormLocations/SearchFormLocations';
import FavoriteCardLocations from '../../components/FavoriteCardLocations/FavoriteCardLocations';
import EmptyFavoriteCard from '../../components/EmptyFavoriteCard/EmptyFavoriteCard';
import Loader from '../../components/Loader/Loader';

import NoData from '../../assets/img/No-data-bro.png';
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
                dimension: ''
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
        let dimension = this.state.form.dimension;
        const client = new ApolloClient({
            uri: 'https://rickandmortyapi.com/graphql',
            cache: new InMemoryCache()
        });
        client.query({
            query: gql`
            query {
                locations(
                  filter: {
                    name: "${name}",
                    type: "${status}",
                    dimension: "${dimension}"
                  }
                ) {
                  info {
                    count,
                    next
                  }
                  results {
                    id,
                    name,
                    type,
                    dimension,
                    residents {
                      id,
                      name,
                      image
                    }
                  }
                }
              }
            `
        })
        .then((result) => {
            this.setState({ loading: false, data: result.data.locations.results });
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
        let locationsData = this.state.data;

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
        if(locationsData.length > 0){
            emptyCard = null;
            noInfoYetText = null;
        }else{
            emptyCard = <EmptyFavoriteCard page={"locations"} />;
            noInfoYetText = <p>No info yet! start searching info using the form above the page!</p>;
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
                        <p>Looks like the data inserted in the form didn't found anything, try again</p>
                    </div>
                </main>
            )
        }
        return (
            <main className="main-locations">
                <div className="main-locations--head">
                    <h1>Locations Page</h1>
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
                    {locationsData.map((location) => {
                        return (
                            <FavoriteCardLocations 
                                key={location.id}
                                name={location.name}
                                dimension={location.dimension}
                                type={location.type}
                                residents={location.residents}
                            />
                        )
                    })}
                </section>
                {noInfoYetText}
            </main>
        )
    }
}

export default Locations;
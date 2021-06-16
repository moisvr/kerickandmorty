import React from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import Loader from '../../components/Loader/Loader';
import SearchForm from '../../components/SearchForm/SearchForm';
import EmptyFavoriteCard from '../../components/EmptyFavoriteCard/EmptyFavoriteCard';

import NoData from '../../assets/img/No-data-pana.png';
import './Characters.css';

class Characters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            display: false,
            error: false,
            loading: false,
            data: {},
            form: {
                name: '',
                status: '',
                species: '',
                gender: ''
            }
        }
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
                        results {
                            id,
                            name,
                            image
                        }
                    }
                }
            `
        })
        .then((result) => {
            //!working on result...
            this.setState({ loading: false });
            console.log(result)
        })
        .catch(err => {
            this.setState({ loading: false, error: true });
            console.log("error: "+err);
        });
    }

    handleDropDownForm = () => {
        this.state.display === false 
            ? this.setState({ display: true }) 
            : this.setState({ display: false });
    }

    render(){
        let isFormVisible = this.state.display;
        let searchForm;
        let errorContainer;
        let rotate_class = "main-characters--head__rotate-span";
        if(isFormVisible){
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

        if(this.state.loading){
            return(
            <main className="main-characters">
                <div className="main-characters--head">
                    <h1>Characters Page</h1>
                    <button onClick={this.handleDropDownForm}>
                        sort by <span className={rotate_class}></span>
                    </button>
                </div>
                {searchForm}
                <div className="main-characters--loader-container">
                    <Loader loading={true} />
                </div>
            </main>
            )
        }else
        if(this.state.error){
            return (
                <main className="main-characters">
                    <div className="main-characters--head">
                        <h1>Characters Page</h1>
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
            <main className="main-characters">
                <div className="main-characters--head">
                    <h1>Characters Page</h1>
                    <button onClick={this.handleDropDownForm}>
                        sort by <span className={rotate_class}></span>
                    </button>
                </div>
                {searchForm}
                <EmptyFavoriteCard />
                <p>No info yet! start searching info using the form above the page!</p>
            </main>
        )
    }
}

export default Characters;
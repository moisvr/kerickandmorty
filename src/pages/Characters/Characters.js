import React from 'react';

import SearchForm from '../../components/SearchForm/SearchForm';
import './Characters.css';

class Characters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            display: false
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

    handleSubmit = (e) => {
        console.log(e);
    }

    handleDropDownForm = () => {
        this.state.display === false 
            ? this.setState({ display: true }) 
            : this.setState({ display: false });
    }

    componentDidMount(){
        const URL = 'https://rickandmortyapi.com/api/character';
        // this.fetchData(URL)
        //     .then(data => {
        //         console.log(data);
        //     })
        //     .catch(err => console.log("hijo mío, error "+err));
    }

    render(){
        let isFormVisible = this.state.display;
        let searchForm;
        let rotate_class = "main-characters--head__rotate-span";
        if(isFormVisible){
            searchForm = <section>
                                <SearchForm 
                                    onSubmit={this.handleSubmit}
                                />
                            </section>;
            rotate_class = "main-characters--head__rotate-span";
        }else{
            searchForm = null;
            rotate_class = "";
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
            </main>
        )
    }
}

export default Characters;
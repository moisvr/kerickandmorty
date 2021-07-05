import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/logo.png';
import './Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "none"
        }
    }

    handleDropdownMenu = () => {
        this.state.display === "none" 
            ? this.setState({ display: "block" }) 
            : this.setState({ display: "none" });
    }

    render(){
        return (
            <header>
                <div className="header--menu">
                    <img src={logo} alt="" />
                    <button onClick={this.handleDropdownMenu}></button>
                </div>            
                <section style={{ display: this.state.display }} className="header--dropdown-menu" >
                    <ul>
                        <Link to="/"><li className="header--dropdown-menu__underline">Home</li></Link>
                        <Link to="/about"><li>About</li></Link>
                        <Link to="/characters"><li>Characters</li></Link>
                        <Link to="/locations"><li>Locations</li></Link>
                        <Link to="/episodes"><li>Episodes</li></Link>
                    </ul>
                </section>
            </header>
        );
    }
}

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/logo.png';
import './Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }

    handleDropdownMenu = () => {
        this.state.display === false 
            ? this.setState({ display: true }) 
            : this.setState({ display: false });
    }

    render(){
        let dropDownMenu;
        if(this.state.display === true){
            dropDownMenu = <section className="header--dropdown-menu" >
                                <ul>
                                    <Link to="/"><li className="header--dropdown-menu__underline">Home</li></Link>
                                    <Link to="/about"><li>About</li></Link>
                                    <Link to="/characters"><li>Characters</li></Link>
                                    <Link to="/locations"><li>Locations</li></Link>
                                    <Link to="/episodes"><li>Episodes</li></Link>
                                </ul>
                            </section>;
        }else{
            dropDownMenu = null;
        }
        return (
            <header>
                <div className="header--menu">
                    <Link to="/"><img src={logo} alt="rick and morty logo"/></Link>
                    <button onClick={this.handleDropdownMenu}></button>
                </div>
                {dropDownMenu}
            </header>
        );
    }
}

export default Header;
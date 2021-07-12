import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/logo.png';
import './Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            isMobile: true
        }
    }

    handleDropdownMenu = () => {
        this.state.display === false 
            ? this.setState({ display: true }) 
            : this.setState({ display: false });
    }

    componentDidMount = () => {
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
        let dropDownMenu;
        let menuType;
        if(this.state.display && this.state.isMobile){
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

        if(this.state.isMobile){
            menuType = <button onClick={this.handleDropdownMenu}></button>;
        }else{
            menuType = <ul className="header--extended">
                            <Link to="/"><li>Home</li></Link>
                            <Link to="/about"><li>About</li></Link>
                            <Link to="/characters"><li>Characters</li></Link>
                            <Link to="/locations"><li>Locations</li></Link>
                            <Link to="/episodes"><li>Episodes</li></Link>
                        </ul>;
        }

        return (
            <header>
                <div className="header--menu">
                    <Link to="/"><img src={logo} alt="rick and morty logo"/></Link>
                    {menuType}
                </div>
                {dropDownMenu}
            </header>
        );
    }
}

export default Header;
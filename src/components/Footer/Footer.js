import React from 'react';

import gitlogo from '../../assets/icons/github.svg';
import instalogo from '../../assets/icons/instagram.svg';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <section className="info">
                <div className="material">
                    <h3>Material</h3>
                    <div className="api">
                        <p>Icons by <span className="flatic"><a href="https://flaticon.com" target="_blank">flaticon</a></span></p><span className="flaticon--icon"></span>
                    </div>
                    <div className="api">
                        <p>API by <a href="https://rickandmortyapi.com" target="_blank">rickandmortyapi.com</a></p><span className="api--icon"></span>
                    </div>
                    <div className="api">
                    <p>Some images provided by <a href="https://storyset.com/" target="_blank">storyset</a></p><span className="storyset--icon"></span>
                    </div>
                </div>
                <div className="contact">
                    <h3>Contact</h3>
                    <a href="mailto:moiavr09@gmail.com">moiavr09@gmail.com</a>
                </div>
                <div className="media">
                    <h3>Media</h3>
                    <div className="media--imgs-container">
                        <a href="https://github.com/moisvr" target="_blank"><img src={gitlogo} alt="git logo" className="github-icon" /></a>
                        <a href="https://www.instagram.com/moisvr/" target="_blank"><img src={instalogo} alt="instagram logo" className="instagram-icon" /></a>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer;
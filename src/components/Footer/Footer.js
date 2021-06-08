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
                    <div className="flaticon">
                        <p>Icons by <span className="flatic">flaticon</span></p><span className="flaticon--icon"></span>
                    </div>
                    <div className="api">
                        <p>API by <a href="rickandmortyapi.com">rickandmortyapi.com</a></p><span className="api--icon"></span>
                    </div>
                </div>
                <div className="contact">
                    <h3>Contact</h3>
                    <a href="mailto:moiavr09@gmail.com">moiavr09@gmail.com</a>
                </div>
                <div className="media">
                    <h3>Media</h3>
                    <div className="media--imgs-container">
                        <img src={gitlogo} alt="git logo" className="github-icon" />
                        <img src={instalogo} alt="instagram logo" className="instagram-icon" />
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer;
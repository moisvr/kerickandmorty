import React from 'react';

import './About.css';
import about1 from '../../assets/img/aboutus1.jpg';
import about2 from '../../assets/img/aboutus2.jpg';
import about3 from '../../assets/img/aboutus3.jpg';
import about4 from '../../assets/img/aboutus4.jpg';

function About() {;
    return (
        <main className="main-aboutus">
            <section className="about">
                <section className="about--container">
                    <div className="about--info">
                        <h1>About this page</h1>
                        <p>Portland selfies locavore pabst typewriter thundercats kickstarter artisan subway tile meggings kombucha readymade mustache cloud bread squid. Hexagon tousled retro brooklynFixie health goth celiac, heirloom woke farm-to-table four loko shaman lomo biodiesel polaroid cronut chartreuse.</p>
                    </div>
                    <div className="about--img">
                        <img src={about1} alt="cartoon image (decoration)"/>
                    </div>
                </section>
            </section>
            <section className="about">
                <section className="about--container">
                    <div className="about--info">
                        <h1>About this cartoon</h1>
                        <p>Portland selfies locavore pabst typewriter thundercats kickstarter artisan subway tile meggings kombucha readymade mustache cloud bread squid. Hexagon tousled retro brooklynFixie health goth celiac, heirloom woke farm-to-table four loko shaman lomo biodiesel polaroid cronut chartreuse.</p>
                    </div>
                    <div className="about--img">
                        <img src={about2} alt="cartoon image (decoration)"/>
                    </div>
                </section>
            </section>
            <section className="about">
                <section className="about--container">
                    <div className="about--info">
                        <h1>About the API</h1>
                        <p>Portland selfies locavore pabst typewriter thundercats kickstarter artisan subway tile meggings kombucha readymade mustache cloud bread squid. Hexagon tousled retro brooklynFixie health goth celiac, heirloom woke farm-to-table four loko shaman lomo biodiesel polaroid cronut chartreuse.</p>
                    </div>
                    <div className="about--img">
                        <img src={about3} alt="cartoon image (decoration)"/>
                    </div>
                </section>
            </section>
            <section className="about">
                <section className="about--container">
                    <div className="about--info">
                        <h1>Extra info</h1>
                        <p>Portland selfies locavore pabst typewriter thundercats kickstarter artisan subway tile meggings kombucha readymade mustache cloud bread squid. Hexagon tousled retro brooklynFixie health goth celiac, heirloom woke farm-to-table four loko shaman lomo biodiesel polaroid cronut chartreuse.</p>
                    </div>
                    <div className="about--img about--img__last">
                        <img src={about4} alt="cartoon image (decoration)"/>
                    </div>
                </section>
            </section>
        </main>
    )
}

export default About;

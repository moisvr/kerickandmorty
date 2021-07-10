import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';


import wp1 from '../../assets/img/WP-1.png';
import wp2 from '../../assets/img/WP-2.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './MyCarousel.css';

class MyCarousel extends Component {
    render() {
        return (
            <Carousel 
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                useKeyboardArrows={true}
                infiniteLoop={true}
                autoPlay={true}
                interval={6000}
            >
                <div>
                    <img src={wp1} />
                </div>
                <div>
                    <img src={wp2} />
                </div>
            </Carousel>
        )
    }
}

export default MyCarousel;
import * as React from 'react';
import './ParallaxSec.css';
import Parallax from './Parallax';
import parallaxImg1 from '../../assets/parallax-night-1.png';


const Header = () => (

    <React.Fragment>
        <div className="fake-nav-background fake-nav-background-aboutme"/>

        <Parallax parallaxImg={parallaxImg1}
                  parallaxContainerStyle={"parallax-container parallax__container__top"}
                  parallaxImgStyle={"parallax parallax__top"} parallaxContainerId="">

            <div className="caption parallax-caption center-align">
                <h3>Ivan Shyrai</h3>
                <h6>Full-Stack Web Developer</h6>
            </div>

        </Parallax>
    </React.Fragment>
);

export default Header;
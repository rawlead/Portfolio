import * as React from 'react';

import footer_img from '../assets/ny.png';

import Header from '../components/aboutme/Header';
import ScrollSpy from '../components/aboutme/ScrollSpy';
import Introduction from '../components/aboutme/Introduction';
import Education from '../components/aboutme/Education';
import Skills from '../components/aboutme/Skills';
import FeaturedProjects from '../components/aboutme/FeaturedProjects';
import Facts from '../components/aboutme/Facts';
import Info from '../components/aboutme/Info';
import Footer from '../components/Footer';

// import * as M from "materialize-css";


class AboutMe extends React.Component {

    render() {
        return (
            <div>
                <Header/>

                <ScrollSpy/>

                <Introduction/>

                <Education/>

                <Skills/>

                <FeaturedProjects />

                <Facts/>

                <Info/>

                <Footer>
                    <img src={footer_img} className="img__before__footer" alt="Footer"/>
                </Footer>

            </div>
        )
    }
}

export default AboutMe;
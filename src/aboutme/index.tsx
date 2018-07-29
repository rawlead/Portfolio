import * as React from 'react';

import footer_img from '../assets/ny-t.png';

import Header from './components/Header';
import ScrollSpy from './components/ScrollSpy';
import Introduction from './components/Introduction';
import Education from './components/Education';
import Skills from './components/Skills';
import FeaturedProjects from './components/FeaturedProjects';
import Facts from './components/Facts';
import Info from './components/Info';
import Footer from '../common/Footer';

// import * as M from "materialize-css";


class AboutMe extends React.Component {

    render() {
        return (
            <React.Fragment>
                <main id="aboutme-root">
                    <Header/>

                    <ScrollSpy/>

                    <Introduction/>

                    <Education/>

                    <Skills/>

                    <FeaturedProjects/>

                    <Facts/>

                    <Info/>
                </main>

                <Footer>
                    <img src={footer_img} className="img__before__footer" alt="Footer"/>
                </Footer>
            </React.Fragment>
        )
    }
}

export default AboutMe;
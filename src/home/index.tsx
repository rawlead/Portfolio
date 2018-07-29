import * as React from 'react';
// import {Link} from 'react-router-dom';

// import cloud_1 from '../assets/cloud-1.png';
// import cloud_2 from '../assets/cloud-2.png';
// import cloud_3 from '../../assets/cloud-3.png';
// import cloud_4 from '../assets/cloud-4.png';

import './Home.css'

class Home extends React.Component {


    render() {
        return (
            <main id="home-page-root">
                <div className="home-page-cover"/>

                <div className="hero-text-wrapper">
                    <h1 className="hero-text">Ivan<br/>Shyrai</h1>

                    <h5 className="hero-text-typewrite" style={{color: "#f2f2f2", opacity: .75}}>Java Software Developer</h5>
                </div>
            </main>

        )
    }
}


export default Home;
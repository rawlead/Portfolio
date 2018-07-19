import * as React from 'react';
import {Link} from 'react-router-dom';

// import cloud_1 from '../assets/cloud-1.png';
// import cloud_2 from '../assets/cloud-2.png';
// import cloud_3 from '../../assets/cloud-3.png';
// import cloud_4 from '../assets/cloud-4.png';

import './Home.css'

class Home extends React.Component {
    render() {
        return (
            <div id="home-page">
                {/*<img className="cloud cloud-1 hide-on-small-and-down" src={cloud_1} alt="Cloud 1"/>*/}
                {/*<img className="cloud cloud-2" src={cloud_2} alt="Cloud 2"/>*/}
                {/*<img className="cloud cloud-3" src={cloud_3} alt="Cloud 3"/>*/}
                {/*<img className="cloud cloud-4 hide-on-small-and-down" src={cloud_4} alt="Cloud 4"/>*/}

                <div className="home-page-img center-align"/>
                <div className="row">

                    <div className="col s12 hero-text">
                        <h1 className=" center-align">IVAN <br/> SHYRAI</h1>
                    </div>

                    <div className="home-page-nav col s12">
                        <h3><Link to="/projects" style={{color: "#FFD39B"}}>Projects</Link></h3>
                        {/*<h2><a style={{color: "#FFD39B"}} href="/">Projects</a></h2>*/}
                        <h3><Link to="/aboutMe" style={{color: "#4BBDAC"}}>About Me</Link></h3>
                        <h3><Link to="/resume" style={{color: "#F6B34E"}}>Resume</Link></h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
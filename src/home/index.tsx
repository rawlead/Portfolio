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
            <div id="home-page">


                <div className="home-page-cover"/>

                    {/*<div className="col s12 hero-text">*/}
                    {/*</div>*/}

                    <div className="home-page-nav">
                        <h1 className="hero-text">Ivan Shyrai</h1>
                        <h6  className="hero-text" style={{color: "#f2f2f2", opacity: .75}}>Full-Stack Web Developer</h6>
                        {/*<br/>*/}
                        {/*<br/>*/}
                        {/*<h4><Link to="/projects" className="hero-text" style={{color: "#f2f2f2"}}>Projects</Link></h4>*/}
                        {/*<h4><Link to="/aboutMe"  className="hero-text" style={{color: "#f2f2f2"}}>About Me</Link></h4>*/}
                        {/*<h4><Link to="/resume"  className="hero-text" style={{color: "#f2f2f2"}}>Resume</Link></h4>*/}
                    </div>
                </div>

        )
    }
}


export default Home;
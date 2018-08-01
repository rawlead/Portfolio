import * as React from 'react';
import * as M from 'materialize-css';
import './FeaturedProjects.css';

import featuredImg1 from '../../assets/project-1-blur.jpg';
import featuredImg2 from '../../assets/project-2-blur.jpg';
import featuredImg3 from '../../assets/project-3-blur.jpg';

class FeaturedProjects extends React.Component {
    private slider: any;
    private scrollSpy: any;

    componentDidMount() {
        M.Slider.init(this.slider, {'duration': 0});
        M.ScrollSpy.init(this.scrollSpy);
    }

    render() {
        return (
            <div id="featured_projects_wrapper"
                 className="section scrollspy"
                 ref={(scrollSpy) => {
                     this.scrollSpy = scrollSpy
                 }}>


                <div id="featured_projects" className="section">
                    <div className="slider fullscreen"
                         ref={(slider) => {
                             this.slider = slider
                         }}>

                        <h3 className="featured-section-title">Featured projects</h3>

                        <ul className="slides">
                            <li>
                                <img src={featuredImg1} alt="Portal IS"/>
                                <div className="caption center-align black">
                                    <h3>Portal IS</h3>
                                    <h5>Portal for photographers</h5>
                                    <h5><a className="waves-effect waves-light btn btn-large ">
                                        <i className="material-icons left">info</i> details</a></h5>
                                </div>
                            </li>
                            <li>
                                <img src={featuredImg2} alt="Filter APP"/>
                                <div className="caption center-align">
                                    <h3>Filter APP</h3>
                                    <h5>Photo filters online</h5>
                                    <h5><a className="waves-effect waves-light btn btn-large ">
                                        <i className="material-icons left">info</i> details</a></h5>

                                </div>
                            </li>
                            <li>
                                <img src={featuredImg3} alt="SAN Travels"/>
                                <div className="caption center-align">
                                    <h3>SAN Travels</h3>
                                    <h5>Flight search service</h5>
                                    <h5><a className="waves-effect waves-light btn btn-large ">
                                        <i className="material-icons left">info</i> details</a></h5>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default FeaturedProjects;
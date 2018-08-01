import * as React from 'react';
import * as M from "materialize-css";
import rocketImg from '../../assets/rocket.png';
import rocketSmokeImg from '../../assets/rocket-smoke.png';
import rocketStarsImg from '../../assets/rocket-stars.png';
import facts_edge_img from '../../assets/facts-edge-top.png';
import './Facts.css';

class Facts extends React.Component {
    private scrollSpy: any;

    componentDidMount() {
        M.ScrollSpy.init(this.scrollSpy);
    }

    render() {
        return (
            <div>
                <img src={facts_edge_img} className="facts-top-edge-img" alt="Edge"/>
                <div id="facts" className="section scrollspy"
                     ref={(scrollSpy) => {
                         this.scrollSpy = scrollSpy
                     }}>
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m6">
                                <h3>Random facts</h3>
                                <h6><i className="fas fa-code"/> I love to code</h6>
                                <h6><i className="fas fa-coffee"/> I drink a lot of coffee</h6>
                                <h6><i className="fas fa-utensils"/> I like to cook</h6>
                                <h6><i className="fas fa-plane "/> I like to travel</h6>
                                <h6><i className="fas fa-walking "/> I like to walk</h6>
                                <h6><i className="fas fa-user-ninja"/> I like to try new things</h6>
                            </div>
                            <div className="col s12 m6 ">
                                <img src={rocketStarsImg} className="facts-img-background" alt="Stars"
                                     data-aos="fade-down"
                                     data-aos-duration="3000"/>

                                <img src={rocketSmokeImg} data-aos="zoom-in-up"
                                     data-aos-duration="3000" className="facts-img-bottom" alt="Smoke"/>

                                <img src={rocketImg} className="facts-img" data-aos="fade-up"
                                     data-aos-duration="3000" alt="Rocket"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Facts;

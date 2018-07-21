import * as React from 'react';
import * as M from "materialize-css";
import './Education.css';

import Parallax from './Parallax';

import parallaxImg from '../../assets/parallax-night-2.png';
import parallaxImg__balloon from '../..//assets/balloon.png';
import parallaxImg__bottom from '../../assets/night-bottom.png';

class Education extends React.Component {
    private scrollSpy: any;

    componentDidMount() {
        M.ScrollSpy.init(this.scrollSpy);
    }

    render() {
        return (
            <Parallax parallaxContainerId="education"
                      parallaxContainerStyle={"section scrollspy parallax-container parallax__container__bottom"}
                      parallaxImgStyle={"parallax parallax__bottom"}
                      parallaxImg={parallaxImg}
                      ref={(scrollSpy) => {this.scrollSpy = scrollSpy}}
            >

                {/*Children*/}
                <div className="container">
                    <div className="row">
                        <div className="col s12 l5 hide-on-med-and-down">
                            <img src={parallaxImg__balloon} className="education-img" alt="Balloon"/>
                        </div>

                        <div className="col s12 l5 offset-l1 caption parallax-caption">
                            <h3>Education</h3>
                            <blockquote>2014 - 2018</blockquote>
                            <h6 className="bold">University of Social Sciences</h6>
                            <h6>Warsaw, Poland</h6>
                            <p>Bachelor of science in Computer Science</p>
                            <br/>
                            <div className="divider"/>
                            <br/>
                            <blockquote>2010 - 2014</blockquote>
                            <h6 className="bold">Machine Building College</h6>
                            <h6>Sumy, Ukraine</h6>
                            <p>Associate of Science in Chemical and Oil Engineering</p>
                        </div>

                    </div>
                </div>
                <img src={parallaxImg__bottom} className="night-bottom" alt=""/>
            </Parallax>
        )
    }
}

export default Education;
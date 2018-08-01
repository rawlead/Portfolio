import * as React from 'react';
import './Introduction.css';
import * as M from "materialize-css";

class Introduction extends React.Component {
    private scrollSpy: any;

    componentDidMount() {
        M.ScrollSpy.init(this.scrollSpy);
    }

    render() {
        return (
            <div id="introduction" className="section scrollspy"
                 ref={(scrollSpy => {
                     this.scrollSpy = scrollSpy
                 })}>
                <div className="container">
                    <div className="row ">
                        <div className="col s12 m5">
                            <h3>hi.</h3>
                            <h5>my name is Ivan.
                                I am specialised in both front-end and back-end web development.</h5>
                            <p>this is my website, where you can find my projects, information about me and more.</p>
                            <p>I am available for hire and open to any ideas of cooperation.</p>
                        </div>
                        <div className="main-img  z-depth-4"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Introduction;
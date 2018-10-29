import * as React from 'react';
import * as M from "materialize-css";
import './Info.css';

class Info extends React.Component {
    private scrollSpy: any;

    componentDidMount() {
        M.ScrollSpy.init(this.scrollSpy);
    }

    render() {
        return (
            <div id="info" className="section scrollspy"
                 ref={(scrollSpy) => {
                     this.scrollSpy = scrollSpy
                 }}>
                <div className="container">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h3>More info</h3>
                            <h6>junior | intern.</h6>
                            <div className="divider"/>

                            <h6>recent graduate.</h6>
                            <div className="divider"/>

                            <h6>from Poland.</h6>
                            <div className="divider"/>
                            <h6>excited to learn new technologies and try on new responsibilities and roles.</h6>
                            <div className="divider"/>
                            <h6>able to thrive in a fast-paced and schedule-driven environment.</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Info;

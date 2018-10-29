import * as React from 'react';
import * as M from "materialize-css";
import './Footer.css';


const socialColors = {
    "facebook": {backgroundColor: '#3b5999'},
    "github": {backgroundColor: '#000'},
    "instagram": {backgroundColor: '#e4405f'},
    "linkedin": {backgroundColor: '#0077B5'},
    "email": {backgroundColor: '#000'},
};

class Footer extends React.Component {
    private scrollSpy: any;

    componentDidMount() {
        M.ScrollSpy.init(this.scrollSpy);
    }

    render() {
        return (
            <footer className="page-footer section scrollspy"
                    id="contact"
                    ref={(scrollSpy) => {
                        this.scrollSpy = scrollSpy
                    }}>

                {this.props.children}

                <div className="container">
                    <div className="row">
                        <div className="col s12 m10">
                            <h3>get in touch</h3>
                            <ul>
                                <li className="social-link">
                                    <a style={socialColors.facebook}
                                       className="waves-effect btn"
                                       href="https://www.facebook.com/ivanshyrai"
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        <i className="fab fa-facebook"/> facebook
                                    </a>
                                </li>
                                <li className="social-link">
                                    <a style={socialColors.github}
                                       className="waves-effect btn black"
                                       href="https://github.com/rawlead"
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        <i className="fab fa-github-square"/> github
                                    </a>
                                </li>
                                <li className="social-link">
                                    <a style={socialColors.linkedin}
                                       className="waves-effect btn"
                                       href="https://www.linkedin.com/in/ivan-shyrai/"
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        <i className="fab fa-linkedin"/> linkedin
                                    </a>
                                </li>
                                <li className="social-link">
                                    <a style={socialColors.email}
                                       className="waves-effect black btn"
                                       href="mailto:ivan.shyrai@yahoo.com"
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        <i className="fas fa-envelope"/> email
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col s12">
                            <div>
                                <i className="material-icons">copyright</i> 2018 Warsaw
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}


export default Footer;

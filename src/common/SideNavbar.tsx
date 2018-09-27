import * as React from 'react';
// import {NavLink} from 'react-router-dom';
import './Navbar.css';
import {Link, NavLink} from "react-router-dom";
// import sidenav_img from '../assets/vegas.jpg'
// import user_img from '../assets/main.jpg'

const socialColors = {
    facebook: {color: '#3b5999'},
    github: {color: '#000'},
    instagram: {color: '#e4405f'},
    linkedin: {color: '#0077B5'},
    email: {color: '#000'},
};

interface NavbarSideProps {
    isAuthenticated: boolean,
    currentUser: any,
    onLogout: any
}

class SideNavbar extends React.Component<NavbarSideProps, any> {
    private sidenav: any;
    private dropdown: any;

    constructor(props: NavbarSideProps) {
        super(props);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }

    componentDidMount() {
        M.Sidenav.init(this.sidenav, {
                // @ts-ignore
                preventScrolling: false,
                onOpenStart: this.openNav,
                onCloseStart: this.closeNav
            }
        );

        M.Dropdown.init(this.dropdown, {constrainWidth: false, coverTrigger: false});

        document.addEventListener('DOMContentLoaded', () => {
            const elems = document.querySelectorAll('.modal');
            M.Modal.init(elems, {inDuration: 0, outDuration: 0});
        });
    }

    openNav() {
        const main = document.getElementById("main");
        if (main !== null) {
            main.style.marginLeft = "200px";
        }
    }

    closeNav() {
        const main = document.getElementById("main");
        if (main !== null) {
            main.style.marginLeft = "0";
        }
    }

    render() {
        return (
            <React.Fragment>
                <ul id="slide-out" className="sidenav" ref={(sidenav) => this.sidenav = sidenav}>
                    <li>
                        <a href="javascript:void(0)" className="sidenav-close-btn sidenav-close"
                           onClick={this.closeNav}><i
                            className="fas fa-times fa-2x"/></a>
                    </li>
                    <li>
                        <div className="user-view">
                            {this.props.isAuthenticated ?

                                <Link to={"/user/" + this.props.currentUser.username}><i
                                    className="fas fa-users-cog fa-2x left"/>
                                </Link>
                                :
                                <Link to="#"><i
                                    className="fas fa-users-cog fa-2x left"/>
                                </Link>
                            }


                            <br/>

                            <button className='name btn-flat ' ref={(dropdown) => this.dropdown = dropdown}
                                    data-target='sidenav-dropdown'>

                                {!this.props.isAuthenticated ?
                                    <i className="fas fa-user-circle fa-2x left"/>
                                    :
                                    this.props.currentUser.username} <i
                                className="fas fa-caret-down fa-2x"/></button>


                            <ul id='sidenav-dropdown' className='dropdown-content sidenav-dropdown-content'>
                                {this.props.isAuthenticated ?
                                    <React.Fragment>
                                        <li><Link className="btn-profile"
                                                  to={"/user/" + this.props.currentUser.username}><i
                                            className="fas fa-user-circle fa-lg"/>My profile</Link></li>


                                        <li>
                                            <a href="#" className="btn-logout" onClick={this.props.onLogout}><i
                                                className="fas fa-sign-out-alt fa-lg"/>Log out
                                            </a>
                                        </li>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <li>
                                            <button data-target="form-modal-login"
                                                    className="sidenav-close btn-flat modal-trigger ">Log
                                                in / Sign up
                                            </button>
                                        </li>

                                    </React.Fragment>
                                }
                            </ul>

                        </div>
                    </li>


                    <li><NavLink exact={true} to="/" className="waves-effect" activeClassName="active">Home</NavLink></li>
                    {/*<li><NavLink to="/projects" className="waves-effect" activeClassName="active">Projects</NavLink></li>*/}
                    <li><NavLink to="/aboutMe" className="waves-effect" activeClassName="active">About Me</NavLink></li>
                    {/*<li><NavLink to="/resume" className="waves-effect" activeClassName="active">Resume</NavLink></li>*/}

                    {!this.props.isAuthenticated
                    &&
                    <React.Fragment>
                        <li className="sidenav-bottom">
                            <button data-target="form-modal-login"
                                    className="btn-flat btn-login sidenav-close modal-trigger">Log
                                in
                            </button>
                            <button
                                data-target="form-modal-signup"
                                className="btn btn-small btn-signup sidenav-close modal-trigger">Sign
                                up
                            </button>
                        </li>
                    </React.Fragment>}

                    <li className="sidenav-social-links">

                        <a className=""
                           href="https://www.facebook.com/q0h44" target="_blank" rel="noopener noreferrer">
                            <i style={socialColors.facebook}  className="fab fa-facebook center-align"/></a>

                        <a  className="" href="https://github.com/rawlead"
                           target="_blank" rel="noopener noreferrer">
                            <i style={socialColors.github} className="fab fa-github-square fa-lg"/></a>


                        <a className=" "
                           href="https://www.linkedin.com/in/ivan-shyrai/" target="_blank" rel="noopener noreferrer">
                            <i style={socialColors.linkedin}  className="fab fa-linkedin"/></a>

                        <a  className="" href="mailto:ivanshyrai@mail.com"
                           target="_blank" rel="noopener noreferrer">
                            <i style={socialColors.email} className="fas fa-envelope"/></a>
                    </li>

                </ul>
                <a href="#" data-target="slide-out" className="sidenav-trigger sidenav-open-btn"><i
                    className="fas fa-bars fa-lg"/></a>


            </React.Fragment>
    )
    }
    }

    export default SideNavbar;

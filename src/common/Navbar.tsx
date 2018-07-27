import * as React from 'react';
import './Navbar.css';
import {NavLink, Link} from 'react-router-dom';
import NavbarSide from './SideNavbar';

interface NavbarTopProps {
    isAuthenticated: boolean,
    currentUser: any,
    onLogout: any,
    onLogin: any
}

class NavbarTop extends React.Component<NavbarTopProps, any> {
    constructor(props: NavbarTopProps) {
        super(props);
    }

    componentDidMount() {
        this.styleTopnavOnScroll();

        document.addEventListener('DOMContentLoaded', () => {
            const elems = document.querySelectorAll('.modal');
            M.Modal.init(elems, {inDuration: 0, outDuration: 0});
        });
    }
    styleTopnavOnScroll() {
        window.onscroll = () => {
            const currentScrollPos = window.pageYOffset;
            const nav = document.getElementById("nav");
            if (nav === null) {
                return;
            }
            if (currentScrollPos > nav.clientHeight + 220) {
                nav.classList.add("scrolled")
            } else {
                nav.classList.remove("scrolled");
            }
        }
    }
    render() {
        return (
            <div>
                <div className="navbar-fixed">
                    <nav id="nav">
                        <div className="nav-wrapper">
                            <a href="#" data-target="sidenav-mobile" className="sidenav-trigger left"><i
                                className="material-icons">menu</i></a>

                            <Link to="/" className="brand-logo center">IS</Link>
                            <ul className="left hide-on-med-and-down">
                                <li><NavLink exact={true} to="/" activeClassName="active">Home</NavLink></li>
                                <li><NavLink to="/projects" activeClassName="active">Projects</NavLink></li>
                                <li><NavLink to="/aboutMe" activeClassName="active">About Me</NavLink></li>
                                <li><NavLink to="/resume" activeClassName="active">Resume</NavLink></li>
                            </ul>

                            <ul className="right">

                                {!this.props.isAuthenticated

                                &&

                                <React.Fragment>
                                    <li>
                                        <button data-target="form-modal-login"
                                                className="waves-effect btn-flat modal-trigger">Log
                                            in
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            data-target="form-modal-signup"
                                            className="btn waves-effect btn-small modal-trigger">Sign
                                            up
                                        </button>
                                    </li>
                                </React.Fragment>

                                }

                                <li className="nav-dropdown">
                                    <Link to="#"
                                          className="nav-dropdown-btn">
                                        {!this.props.isAuthenticated ?
                                            (<i className="material-icons left">account_circle</i>)
                                            :
                                            (
                                                this.props.currentUser.username)
                                        }
                                        <i className="material-icons right">arrow_drop_down</i>
                                    </Link>

                                    <div className="nav-dropdown-content">

                                        {this.props.isAuthenticated ? (
                                            <React.Fragment>
                                                <Link to="/profile">My Profile</Link>
                                                <Link onClick={this.props.onLogout} to="#"><i
                                                    className="fas fa-sign-out-alt"/> Log out</Link>
                                            </React.Fragment>
                                        ) : (
                                            <button data-target="form-modal-login"
                                                    className="waves-effect btn hide-on-med-and-down modal-trigger">Log
                                                in / Sign up
                                            </button>
                                        )}
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </nav>
                </div>

                <NavbarSide
                    isAuthenticated={this.props.isAuthenticated}
                    currentUser={this.props.currentUser}
                    onLogout={this.props.onLogout}
                />
            </div>
        );
    }
}

export default NavbarTop;
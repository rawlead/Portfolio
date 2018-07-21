import * as React from 'react';
import './Navbar.css';
import {NavLink, Link} from 'react-router-dom';
// import * as M from "materialize-css";
import NavbarSide from './SideNavbar';

interface NavbarTopProps {
    isAuthenticated: boolean,
    currentUser: any,
    onLogout: any
}

interface NavbarTopState {

}


class NavbarTop extends React.Component<NavbarTopProps, NavbarTopState> {
    private dropdown: any;

    componentDidMount() {
        this.styleTopnavOnScroll();
        M.Dropdown.init(this.dropdown)
    }

    styleTopnavOnScroll() {
        window.onscroll = () => {
            const currentScrollPos = window.pageYOffset;
            const nav = document.getElementById("nav");

            if (nav === null) {
                return;
            }

            if (currentScrollPos > nav.clientHeight + 120) {
                nav.classList.add("scrolled")
            } else {
                nav.classList.remove("scrolled");
            }
        }
    }

// <li><Link to="/login" className="btn" onClick={this.props.onLogout}>Logout</Link></li>

    render() {
        return (
            <div>
                <div className="navbar-fixed">
                    <nav id="nav">
                        <div className="nav-wrapper">
                            <a href="#" data-target="sidenav-mobile" className="sidenav-trigger right"><i
                                className="material-icons">menu</i></a>
                            <Link to="/" className="brand-logo center">IS</Link>
                            <ul className="left hide-on-med-and-down">
                                <li><NavLink exact={true} to="/" activeClassName="active">Home</NavLink></li>
                                <li><NavLink to="/projects" activeClassName="active">Projects</NavLink></li>
                                <li><NavLink to="/aboutMe" activeClassName="active">About Me</NavLink></li>
                                <li><NavLink to="/resume" activeClassName="active">Resume</NavLink></li>
                            </ul>

                            {this.props.isAuthenticated
                                ?
                                (<ul className="right hide-on-med-and-down">
                                    <li><Link to="/login" onClick={this.props.onLogout}
                                              className="btn waves-effect">{this.props.currentUser.username}<i
                                        className="material-icons left">account_circle</i></Link></li>
                                </ul>)
                                :
                                (
                                    <ul className="right">
                                        <li>
                                            <NavLink to="/login"
                                                     activeClassName="active-hide"
                                                     className="btn waves-effect hide-on-med-and-down">Login</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/signup" activeClassName="active-hide"
                                                     className="btn waves-effect hide-on-med-and-down">Signup</NavLink>
                                        </li>
                                    </ul>)
                            }
                        </div>
                    </nav>
                </div>
                <NavbarSide
                    isAuthenticated={this.props.isAuthenticated}
                    currentUser={this.props.currentUser}
                    onLogout={this.props.onLogout}/>
            </div>
        );
    }
}

export default NavbarTop;
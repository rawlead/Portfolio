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

    constructor(props: NavbarTopProps) {
        super(props)
    }

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


    render() {
        return (
            <div>

                <ul id="dropdown1" className="dropdown-content">
                    <li><a href="#!" onClick={this.props.onLogout}>Logout</a></li>
                    <li><a href="#!" onClick={this.props.onLogout}>Logout</a></li>

                </ul>


                <div className="navbar-fixed">
                    <nav id="nav">
                        <div className="nav-wrapper">
                            <a href="#" data-target="sidenav-mobile" className="sidenav-trigger"><i
                                className="material-icons">menu</i></a>
                            <Link to="/" className="brand-logo center">IS</Link>
                            <ul className="left hide-on-med-and-down">
                                <li><NavLink exact={true} to="/" activeClassName="active">Home</NavLink></li>
                                <li><NavLink to="/projects" activeClassName="active">Projects</NavLink></li>
                                <li><NavLink to="/aboutMe" activeClassName="active">About
                                    Me</NavLink></li>
                                <li><NavLink to="/resume" activeClassName="active">Resume</NavLink></li>


                            </ul>


                            {!this.props.isAuthenticated ?
                                (<React.Fragment>
                                    <ul className="right black-text hide-on-med-and-down">
                                        <li><NavLink to="/login" className="btn" style={{backgroundColor: "#143056"}}
                                                     activeClassName="active">Login</NavLink></li>
                                        <li className="divider"/>
                                        {/*<li><NavLink to="/signup" className="btn grey darken-3" activeClassName="active">Signup</NavLink></li>*/}
                                    </ul>
                                </React.Fragment>) :

                                (<ul className="right ">
                                    {/*<li className="orange-text"><a href="#!"></a></li>*/}
                                    <li><a className="dropdown-trigger right"
                                           href="#!"
                                           data-target="dropdown1"
                                           ref={(dropdown) => {
                                               this.dropdown = dropdown
                                           }}>
                                        <i className="fas fa-user"/>
                                    </a> {this.props.currentUser.name}
                                    </li>

                                </ul>)}
                        </div>
                    </nav>
                </div>
                <NavbarSide/>
            </div>
        );
    }
}

export default NavbarTop;
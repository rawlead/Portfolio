import * as React from 'react';
import './Navbar.css';
import {NavLink, Link} from 'react-router-dom';
// import * as M from "materialize-css";
import NavbarSide from './SideNavbar';


class NavbarTop extends React.Component {
    componentDidMount() {
        this.styleTopnavOnScroll();
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
                <div className="navbar-fixed">
                    <nav id="nav">
                        <div className="nav-wrapper">
                            <a href="#" data-target="sidenav-mobile" className="sidenav-trigger"><i
                                className="material-icons">menu</i></a>
                            <Link to="/" className="brand-logo center">Ivan Shyrai</Link>
                            <ul className="left hide-on-med-and-down">
                                <li><NavLink exact={true} to="/" activeClassName="active">Home</NavLink></li>
                                <li><NavLink to="/projects" activeClassName="active">Projects</NavLink></li>
                                <li><NavLink to="/aboutMe" activeClassName="active">About
                                    Me</NavLink></li>
                                <li><NavLink to="/resume" activeClassName="active">Resume</NavLink></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <NavbarSide/>
            </div>
        );
    }
}

export default NavbarTop;
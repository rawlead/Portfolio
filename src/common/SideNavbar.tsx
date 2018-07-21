import * as React from 'react';
import {NavLink} from 'react-router-dom';
import * as M from "materialize-css";

interface NavbarSideProps {
}

interface NavbarSideState {
}

class SideNavbar extends React.Component<NavbarSideState, NavbarSideProps> {
    componentDidMount() {
        document.addEventListener('DOMContentLoaded', () => {
            const elems = document.querySelectorAll('.sidenav');
             M.Sidenav.init(elems);
        });
    }

    render() {
        return (
            <ul className="sidenav"
                id="sidenav-mobile">
                <li><NavLink exact={true} to="/" className="sidenav-close" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/projects" className="sidenav-close" activeClassName="active">Projects</NavLink></li>
                <li><NavLink to="/aboutMe" className="sidenav-close" activeClassName="active">About Me</NavLink></li>
                <li><NavLink to="/resume" className="sidenav-close" activeClassName="active">Resume</NavLink></li>
                <li><NavLink to="/login" className="sidenav-close" activeClassName="active">Login</NavLink></li>
                <li><NavLink to="/signup" className="sidenav-close" activeClassName="active">Signup</NavLink></li>
            </ul>
        )
    }
}

export default SideNavbar;
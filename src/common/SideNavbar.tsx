import * as React from 'react';
import {NavLink} from 'react-router-dom';
import * as M from "materialize-css";

interface NavbarSideProps {
    isAuthenticated: boolean,
    currentUser: any,
    onLogout: any
}

interface NavbarSideState {
}

class SideNavbar extends React.Component<NavbarSideProps, NavbarSideState> {


    componentDidMount() {
        document.addEventListener('DOMContentLoaded', () => {
            const elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems, {edge: 'left'});
        });
    }

    render() {
        return (
            <ul className="sidenav"
                id="sidenav-mobile">

                {/*<br/>*/}
                {/*{this.props.isAuthenticated &&*/}

                {/*<li><button onClick={this.props.onLogout}*/}
                          {/*className="btn waves-effect">{this.props.currentUser.username}*/}
                {/*</button>*/}
                {/*</li>*/}
                {/*}*/}

                <br/>
                <li><NavLink exact={true} to="/" className="sidenav-close" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/projects" className="sidenav-close" activeClassName="active">Projects</NavLink></li>
                <li><NavLink to="/aboutMe" className="sidenav-close" activeClassName="active">About Me</NavLink></li>
                <li><NavLink to="/resume" className="sidenav-close" activeClassName="active">Resume</NavLink></li>
                <br/>
                <li>
                    <button className="sidenav-close sidenav-close-btn    "><i
                        className="material-icons">close</i></button>
                </li>
                <br/>

            </ul>
        )
    }
}

export default SideNavbar;
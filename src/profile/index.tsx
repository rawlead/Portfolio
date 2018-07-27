import * as React from 'react';
import UserList from "./components/UserList";
import './Profile.css';
import Footer from "../common/Footer";

class Profile extends React.Component {
    private tabs : any;

    componentDidMount() {
        M.Tabs.init(this.tabs);
    }

    render() {
        return (
            <React.Fragment>
                <div id="profile-root">
                    <div className="fake-nav-background"/>

                    <ul className="tabs" id="profile-tabs" ref={(tabs) => this.tabs = tabs}>
                        <li className="tab col s3"><a className="active" href="#users-tab">Users</a></li>
                        <li className="tab col s3"><a href="#test2">Tab 2</a></li>
                        <li className="tab col s3 disabled"><a href="#test3">Disabled Tab 3</a></li>
                        <li className="tab col s3"><a href="#test4">Tab 4</a></li>
                    </ul>

                    <div id="users-tab" className="col s12">
                        <h3 className="container">UserList</h3>
                        <UserList/>
                    </div>
                    <div id="test2" className="col s12">
                        <h3>Tab 2</h3>
                        <br/>
                    </div>
                    <div id="test3" className="col s12">
                        <h3>Tab 3</h3>
                        <br/>
                    </div>
                    <div id="test4" className="col s12">
                        <h3>Tab 4</h3>
                        <br/>
                    </div>



                </div>

                <Footer/>
            </React.Fragment>
        )
    }
}

export default Profile;
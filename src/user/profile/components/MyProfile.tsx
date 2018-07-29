import * as React from 'react';
import UserList from "./UserList";
import UserProfile from "./UserProfile";

interface MyProfileProps {
    currentUser: any,
    isAuthenticated: boolean
}

class MyProfile extends React.Component<MyProfileProps, any> {
    private tabs: any;

    componentDidMount() {
        M.Tabs.init(this.tabs);
    }

    render() {
        return (
            <React.Fragment>

                <ul className="tabs" id="profile-tabs" ref={(tabs) => this.tabs = tabs}>
                    <li className="tab col s3"><a className="" href="#users-tab">Users</a></li>
                    <li className="tab col s3"><a className="active" href="#user-profile">Profile</a></li>
                    <li className="tab col s3 disabled"><a href="#test3">Disabled Tab 3</a></li>
                    <li className="tab col s3"><a href="#test4">Tab 4</a></li>
                </ul>

                <div id="users-tab" className="tab-container">
                    {/*{this.state.profileUsername}*/}
                    <UserList/>
                </div>
                <div id="user-profile" className="col s12 tab-container">
                    <UserProfile  username={this.props.currentUser.username}/>
                </div>
                <div id="test3" className="col s12 tab-container">
                    <h3>Tab 3</h3>
                    <br/>
                </div>
                <div id="test4" className="col s12 tab-container">
                    <h3>Tab 4</h3>
                    <br/>
                </div>
            </React.Fragment>
        )
    }
}

export default MyProfile;
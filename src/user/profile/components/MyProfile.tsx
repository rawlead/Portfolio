import * as React from 'react';
import UserList from "./UserList";
import UserProfile from "./UserProfile";
import ProjectForm from "./ProjectForm";

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
                    <li className="tab col s3"><a  href="#user-profile-tab">Profile</a></li>
                    <li className="tab col s3"><a className="active" href="#project-upload-tab">Upload project</a></li>
                    <li className="tab col s3"><a href="#test4">Tab 4</a></li>
                </ul>

                <div id="users-tab" className="tab-container">
                    <UserList/>
                </div>
                <div id="user-profile-tab" className="col s12 tab-container">
                    <UserProfile username={this.props.currentUser.username}/>
                </div>
                <div id="project-upload-tab" className="col s12 tab-container">
                    <ProjectForm/>
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
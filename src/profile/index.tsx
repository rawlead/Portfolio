import * as React from 'react';
import UserList from "./components/UserList";
import './Profile.css';

class Profile extends React.Component {
    render() {
        return (
            <div id="profile-root">
                <h1>Profile</h1>
                <UserList/>
            </div>
        )
    }
}

export default Profile;
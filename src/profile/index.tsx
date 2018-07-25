import * as React from 'react';
import UserList from "./components/UserList";

class Profile extends React.Component {
    render() {
        return (
            <div>
                <h1>Profile</h1>
                <UserList/>
            </div>
        )
    }
}

export default Profile;
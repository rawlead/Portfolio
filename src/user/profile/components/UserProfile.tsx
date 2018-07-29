import * as React from 'react';
// import Footer from "../../../common/Footer";
import './UserProfile.css';

interface UserProfileProps {
    user: any,
}

class UserProfile extends React.Component<UserProfileProps, any> {

    constructor(props : UserProfileProps) {
        super(props);


    }

    render() {
        return (
                <main id="user-profile-root">
                    <br/>
                    <br/>
                    <br/>
                    <h1>User profile</h1>
                    <h3>Current: {this.props.user.username}</h3>
                </main>
        )
    }

}

export default UserProfile;
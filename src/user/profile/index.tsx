import * as React from 'react';
import './Profile.css';
import Footer from "../../common/Footer";
import UserProfile from "./components/UserProfile";
import MyProfile from "./components/MyProfile";

interface ProfileState {
    profileUsername: string,
    // isAuthenticated: boolean,
    currentUser: any
}

class Profile extends React.Component<any, ProfileState> {
    private tabs: any;

    constructor(props: any) {
        super(props);

        this.getUsernameFromPath = this.getUsernameFromPath.bind(this);
        this.isCurrentUserProfile = this.isCurrentUserProfile.bind(this);
        this.state = {
            profileUsername: this.getUsernameFromPath(),
            // isAuthenticated: props.isAuthenticated,
            currentUser: props.currentUser
        };
    }

    componentDidMount() {
        M.Tabs.init(this.tabs);
    }

    componentWillReceiveProps(nextProps: any) {
        if (this.props.match.params.username !== nextProps.match.params.username) {
            this.setState({profileUsername: this.getUsernameFromPath()})
        }
        M.Tabs.init(this.tabs);
    }

    getUsernameFromPath() {
        const splitted = window.location.href.split('/');
        return splitted[splitted.length - 1];
    }

    isCurrentUserProfile() {
        return this.props.isAuthenticated && this.props.currentUser.username === this.state.profileUsername;
    }

    render() {
        let profileView = <UserProfile user={this.props.currentUser}/>;

        if (this.isCurrentUserProfile()) {
            profileView = <MyProfile currentUser={this.props.currentUser} isAuthenticated={this.props.isAuthenticated}/>;
        }
        return (
            <React.Fragment>
                <main id="profile-root">
                    <div className="fake-nav-background"/>
                    {profileView}
                </main>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default Profile;
import * as React from 'react';
import './UserProfile.css';
import {getUserProfile} from "../../../util/APIUtils";
import LoadingIndicator from "../../../common/LoadingIndicator";
import NotFound from "../../../common/NotFound";

interface UserProfileProps {
    username: any
}

interface UserProfileState {
    isLoading: boolean;
    user: any
}

class UserProfile extends React.Component<UserProfileProps, UserProfileState> {
    constructor(props: UserProfileProps) {
        super(props);
        this.state = {
            user: [],
            isLoading:false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    componentDidMount() {
        this.loadUserProfile(this.props.username);
    }

    loadUserProfile(username: string) {
        this.setState({isLoading: true});
        getUserProfile(username)
            .then(response => {
                this.setState({user: response, isLoading: false})
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        })
    }

    render() {
        if (!this.state.isLoading && this.state.user.length === 0) {
            return <NotFound/>
        }

        return (
            <main id="user-profile-root">

                <div className="tab-container-header valign-wrapper">
                    <p>Registration date: n/a | Projects: 0 | Likes: 0</p>
                </div>

                {this.state.isLoading ? <LoadingIndicator/> :
                    (<React.Fragment>
                        <h1>User profile</h1>
                        <p>Current: {this.state.user.username}</p>
                        <p>joinedAt: {this.state.user.joinedAt}</p>
                    </React.Fragment>)

                }
            </main>
        )
    }

}

export default UserProfile;
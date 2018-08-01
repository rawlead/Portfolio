import * as React from 'react';
import './UserProfile.css';
import {getUserProfile} from "../../../util/APIUtils";
import LoadingIndicator from "../../../common/LoadingIndicator";
import NotFound from "../../../common/NotFound";
import {formatDate, formatDateTime} from "../../../util/Helpers";

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
            isLoading: false
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
            <div id="user-profile-root">

                <div className="tab-container-header valign-wrapper">
                    <p>ID: {this.state.user.id} | Joined:{formatDate(this.state.user.joinedAt)} | Projects: 0 | Likes: 0</p>
                </div>

                <div className="tab-container-body">
                    {this.state.isLoading ? <LoadingIndicator/> :
                        (<React.Fragment>
                            <h5>{this.state.user.username}</h5>
                            <div className="divider"/>
                            <p>{this.state.user.name}</p>
                            <p>Joined (full date): {formatDateTime(this.state.user.joinedAt)}</p>
                        </React.Fragment>)

                    }
                </div>
            </div>
        )
    }

}

export default UserProfile;
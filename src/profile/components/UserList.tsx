import * as React from 'react';
import {USER_LIST_SIZE} from '../../constants'
import {getAllUsers} from "../../util/APIUtils";
import User from "./User";
import LoadingIndicator from "../../common/LoadingIndicator";

interface UserListState {
    users: any,
    page: number,
    size: number,
    totalElements: number,
    totalPages: number,
    last: boolean,
    currentUsers: any,
    isLoading: boolean
}

class UserList extends React.Component<any, UserListState> {

    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            currentUsers: [],
            isLoading: false
        };
        this.loadUserList = this.loadUserList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentWillMount() {
        this.loadUserList();
    }

    loadUserList(page = 0, size = USER_LIST_SIZE) {
        let promise;
        // if(this.props.username) {
        //     if(this.props.type === 'USER_CREATED_POLLS') {
        //         promise = getUserCreatedPolls(this.props.username, page, size);
        //     } else if (this.props.type === 'USER_VOTED_POLLS') {
        //         promise = getUserVotedPolls(this.props.username, page, size);
        //     }
        // } else {
        promise = getAllUsers(page, size);
        // }

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                const users = this.state.users.slice();
                const currentVotes = this.state.currentUsers.slice();

                this.setState({
                    users: users.concat(response.content),
                    page: response.page,
                    size: response.size,
                    totalElements: response.totalElements,
                    totalPages: response.totalPages,
                    last: response.last,
                    currentUsers: currentVotes.concat(Array(response.content.length).fill(null)),
                    isLoading: false
                })
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
    }

    handleLoadMore() {
        this.loadUserList(this.state.page + 1);
    }

    render() {
        const userViews: any = [];
        this.state.users.forEach((user: any, userIndex: number) => {
            userViews.push(<User
                key={user.id}
                user={user}
            />)
        });
        return (

            <React.Fragment>
                <div className="user-list container">
                    {userViews}

                    {
                        this.state.isLoading ?
                            <LoadingIndicator />: null
                    }
                </div>

                {!this.state.isLoading && !this.state.last ?

                    (<div className="load-more-polls container">
                        <button className="btn black" type="dashed" onClick={this.handleLoadMore}
                                disabled={this.state.isLoading}>
                            Load more
                        </button>
                    </div>) : null
                }


            </React.Fragment>
        )
    }

}

export default UserList;
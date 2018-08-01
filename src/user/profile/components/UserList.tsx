import * as React from 'react';
import {USER_LIST_SIZE} from '../../../constants/index'
import {getAllUsers} from "../../../util/APIUtils";
import UserListItem from "./UserListItem";
import LoadingIndicator from "../../../common/LoadingIndicator";
import './UserList.css';

// @ts-ignore
import {CSSTransitionGroup} from 'react-transition-group'

interface UserListState {
    users: any,
    page: number,
    size: number,
    totalElements: number,
    totalPages: number,
    last: boolean,
    currentUsers: any,
    isLoading: boolean,

    [key: string]: any
}

class UserList extends React.Component<any, UserListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userSearch: {
                value: ''
            },
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
        this.handleChange = this.handleChange.bind(this);
        this.filteredUsers = this.filteredUsers.bind(this);
    }

    componentWillMount() {
        this.loadUserList();
    }

    handleChange(event: any) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue
            }
        });
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

    filteredUsers(username: string) {
        return this.state.users.filter((user: any) => {
            return username !== '' && user.username.toLowerCase().includes(username.toLowerCase())
        })
    }

    render() {
        const userViews: any = [];
        let users: any = [];
        if (this.state.userSearch.value !== '') {
            users = this.filteredUsers(this.state.userSearch.value);
        } else {
            users = this.state.users;
        }
        users.forEach((user: any) => {
            userViews.push(<UserListItem
                show={true}
                key={user.id}
                user={user}
            />)
        });
        return (
            <div id="user-list-root">
                <div className="tab-container-header valign-wrapper">
                    <p>Total users: {this.state.totalElements} | Pages: {this.state.totalPages} | Max users per
                        page: {USER_LIST_SIZE}</p>
                </div>


                <div className="tab-container-body">

                    <div className="input-field">
                        <i className="material-icons prefix">search</i>
                        <input id="user-search-input"
                               name="userSearch"
                               type="text"
                               onChange={this.handleChange}
                               value={this.state.userSearch.value}/>
                        <label htmlFor="user-search-input">Filter by username</label>
                    </div>

                    {this.state.userSearch.value !== '' && <p>Showing results for: {this.state.userSearch.value}</p>}
                    {users.length === 0 && <p>No users found</p>}


                    {!this.state.isLoading && users.length !== 0 && !this.state.last ?
                        (<div className="load-more-polls">
                            <button className="btn black" type="dashed" onClick={this.handleLoadMore}
                                    disabled={this.state.isLoading}>
                                Load more
                            </button>
                        </div>) : null
                    }

                    <div className="user-list">
                        {/*Fade in effect*/}
                        <CSSTransitionGroup transitionName="user-list-transition-group" transitionEnterTimeout={1000}
                                            transitionLeaveTimeout={1000}>
                            {userViews}
                        </CSSTransitionGroup>
                    </div>
                    {
                        this.state.isLoading ?
                            <LoadingIndicator/> : null
                    }


                    {!this.state.isLoading && users.length !== 0 && !this.state.last ?
                        (<div className="load-more-polls">
                            <button className="btn black" type="dashed" onClick={this.handleLoadMore}
                                    disabled={this.state.isLoading}>
                                Load more
                            </button>
                        </div>) : null
                    }
                </div>
            </div>
        )
    }

}

export default UserList;
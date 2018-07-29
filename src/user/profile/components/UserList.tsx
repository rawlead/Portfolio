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
    isLoading: boolean
}

class UserList extends React.Component<any, UserListState> {
    private userViews: any = [];
    private autocomplete: any;

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

    componentDidMount() {
        M.Autocomplete.init(this.autocomplete, {
            data: {
                "Apple": null,
                "Microsoft": null,
                "Google": 'https://placehold.it/250x250'
            }
        })

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
        this.state.users.forEach((user: any, userIndex: number) => {
            this.userViews.push(<UserListItem
                show={true}
                key={user.id}
                user={user}
            />)
        });
        return (

            <React.Fragment>
                <h6>UserList</h6>

                <div className="input-field">
                    <i className="material-icons prefix">search</i>
                    <input type="text" id="autocomplete-input" className="autocomplete" ref={(autocomplete) => this.autocomplete = autocomplete}/>
                    <label htmlFor="autocomplete-input">Search box</label>
                </div>


                <div className="user-list">
                    {/*Fade in effect*/}
                    <CSSTransitionGroup transitionName="user-list-transition-group" transitionEnterTimeout={1000}
                                        transitionLeaveTimeout={1000}>
                        {this.userViews}
                    </CSSTransitionGroup>
                </div>

                {
                    this.state.isLoading ?
                        <LoadingIndicator/> : null
                }

                {!this.state.isLoading && !this.state.last ?

                    (<div className="load-more-polls">
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
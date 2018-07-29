import * as React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css'
import {Route, Switch, withRouter} from 'react-router-dom';

import Home from '../home';
import Projects from '../projects';
import AboutMe from '../aboutme';

import Navbar from '../common/Navbar';
import FloatingActionButton from '../common//FloatingActionButton';
import {getCurrentUser, login} from "../util/APIUtils";
import * as M from "materialize-css";
import {ACCESS_TOKEN} from "../constants";
import {FullScreenPreloader} from "../common/FullScreenPreloader";
import Resume from "../resume";
import LoginForm from "../user/login/LoginForm";
import SignupForm from "../user/signup/SignupForm";
// import PrivateRoute from "../common/PrivateRoute";
import Profile from "../user/profile";
import NotFound from "../common/NotFound";
// import PrivateRoute from "../common/PrivateRoute";
// import UserProfile from "../user/profile/components/UserProfile";

interface AppState {
    currentUser: any,
    isAuthenticated: boolean,
    isLoading: boolean,
    history: any,
    modalWindow: any;
}

class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.renderProfile = this.renderProfile.bind(this);

        this.state = {
            currentUser: {},
            isAuthenticated: false,
            isLoading: false,
            history: History,
            modalWindow: null
        }
    }

    componentWillMount() {
        this.loadCurrentUser();
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    handleLogin(username: any) {
        this.loadCurrentUser();

        // Close login modal window after successful login
        const elem: any = document.getElementById('form-modal-login');
        const instance = M.Modal.getInstance(elem);
        instance.close();

        this.props.history.push('/user/' + username);
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            currentUser: {},
            isAuthenticated: false
        });
        // this.props.history.push('/');
        M.toast({html: "You're successfully logged out."});
    }

    handleSignup(username: string, password: string) {
        // Close login modal window after successful login
        const elem: any = document.getElementById('form-modal-signup');
        const instance = M.Modal.getInstance(elem);
        instance.close();

        const loginRequest = {
            usernameOrEmail : username,
            password
        };

        this.setState({isLoading: true});
        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.handleLogin(username);
            });
    }

    renderProfile = (props: any) => (
        <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}
        />);


    render() {
        return (
            <React.Fragment>
                {/*Show spinner if current user is not loaded*/}
                {this.state.isLoading && <FullScreenPreloader/>}

                <LoginForm onLogin={this.handleLogin}/>
                <SignupForm onSignup={this.handleSignup}/>

                <Navbar isAuthenticated={this.state.isAuthenticated}
                        currentUser={this.state.currentUser}
                        onLogout={this.handleLogout}
                        onLogin={this.handleLogin}/>

                <Switch>
                    <Route exact={true} path="/" component={Home}/>
                    <Route path="/projects" component={Projects}/>
                    <Route path='/aboutMe' component={AboutMe}/>

                    <Route path="/resume" component={Resume}/>

                    {!this.state.isLoading &&
                    <Route path="/user/:username"
                           render={this.renderProfile}/>
                    }

                    {/*<Route path="/users/:username"*/}
                    {/*render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>*/}
                    {/*</Route>*/}

                    {/*To make sure that user is loaded*/}
                    {/*{!this.state.isLoading*/}
                    {/*&&*/}
                    {/*<PrivateRoute path="/profile" authenticated={this.state.isAuthenticated} */}
                    {/*component={Profile}*/}
                    {/*handleLogout={this.handleLogout}/>}*/}

                    <Route component={NotFound}/>
                </Switch>
                <FloatingActionButton/>
            </React.Fragment>

        )

    }
}

export default withRouter(App);

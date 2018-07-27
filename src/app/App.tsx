import * as React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css'
import {Route, withRouter} from 'react-router-dom';

import Home from '../home';
import Projects from '../projects';
import AboutMe from '../aboutme';

import Navbar from '../common/Navbar';
import FloatingActionButton from '../common//FloatingActionButton';
import {getCurrentUser, login} from "../util/APIUtils";
// import LoginForm from "../user/login/LoginForm";
import * as M from "materialize-css";
import {ACCESS_TOKEN} from "../constants";
// import SignupForm from "../user/signup/SignupForm";
import {FullScreenPreloader} from "../common/FullScreenPreloader";
import Resume from "../resume";
import Profile from "../profile";
import LoginForm from "../user/login/LoginForm";
import SignupForm from "../user/signup/SignupForm";

interface AppState {
    currentUser: any,
    isAuthenticated: boolean,
    isLoading: boolean,
    history: any,
    modalWindow : any;
}

class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

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

    handleLogin() {
        this.loadCurrentUser();

        // Close login modal window after successful login
        const elem : any = document.getElementById('form-modal-login');
        const instance = M.Modal.getInstance(elem);
        instance.close();
    }

    handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            currentUser: {},
            isAuthenticated: false
        });
        // this.props.history.push(redirectTo);
        M.toast({html: description});
    }

    handleSignup(usernameOrEmail: string, password: string) {

        // Close login modal window after successful login
        const elem : any = document.getElementById('form-modal-signup');
        const instance = M.Modal.getInstance(elem);
        instance.close();

        const loginRequest = {
            usernameOrEmail,
            password
        };

        this.setState({isLoading: true})
        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.handleLogin();
        });

    }

    render() {
        return (
            <div style={{minHeight: '100vh'}}>

                <LoginForm onLogin={this.handleLogin}/>
                <SignupForm onSignup={this.handleSignup}/>

                {this.state.isLoading && <FullScreenPreloader/>}

                <Navbar isAuthenticated={this.state.isAuthenticated}
                        currentUser={this.state.currentUser}
                        onLogout={this.handleLogout}
                        onLogin={this.handleLogin}/>

                <Route exact={true} path="/" component={Home}/>
                <Route path="/projects" component={Projects}/>
                <Route path='/aboutMe' component={AboutMe}/>

                <Route path="/resume" component={Resume}/>

                <Route path="/profile" component={Profile}/>
                <FloatingActionButton/>
            </div>

        )

    }
}

export default withRouter(App);

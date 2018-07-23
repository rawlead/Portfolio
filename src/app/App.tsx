import * as React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css'
import {Route, withRouter} from 'react-router-dom';

import Home from '../home';
import Projects from '../projects';
import AboutMe from '../aboutme';

import Navbar from '../common/Navbar';
import FloatingActionButton from '../common//FloatingActionButton';
import {getCurrentUser} from "../util/APIUtils";
import LoginForm from "../user/login/LoginForm";
import * as M from "materialize-css";
// import LoadingIndicator from "../common/LoadingIndicator";
import {ACCESS_TOKEN} from "../constants";
import SignupForm from "../user/signup/SignupForm";
import {FullScreenPreloader} from "../common/FullScreenPreloader";
import Resume from "../resume";

interface AppState {
    currentUser: any,
    isAuthenticated: boolean,
    isLoading: boolean,
    history: any
}

class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.renderLoginForm = this.renderLoginForm.bind(this);
        this.renderSignupForm = this.renderSignupForm.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            currentUser: {},
            isAuthenticated: false,
            isLoading: false,
            history: History
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
            // M.toast({html: 'Not logged in'});

            this.setState({
                isLoading: false
            });
        });
    }

    handleLogin() {
        this.loadCurrentUser();
        this.props.history.push("/");
    }

    handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: {},
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);
        M.toast({html: description});
    }

    handleSignup() {
        this.props.history.push("/login")
    }

    renderLoginForm() {
        return <LoginForm onLogin={this.handleLogin}/>;
    }

    renderSignupForm() {
        return <SignupForm onSignup={this.handleSignup}/>;
    }

    render() {

        // if (!this.state.isLoading) {
        // return <LoadingIndicator/>
        return (

            <div style={{minHeight: '100vh'}}>

                {this.state.isLoading && <FullScreenPreloader/>}


                <Navbar isAuthenticated={this.state.isAuthenticated}
                        currentUser={this.state.currentUser}
                        onLogout={this.handleLogout}/>

                <Route exact={true} path="/" component={Home}/>
                <Route path="/projects" component={Projects}/>
                <Route path='/aboutMe' component={AboutMe}/>

                <Route path="/login" render={this.renderLoginForm}/>

                <Route path="/signup" render={this.renderSignupForm}/>

                <Route path="/resume" component={Resume}/>
                <FloatingActionButton/>
            </div>

        )

    }
}

export default withRouter(App);

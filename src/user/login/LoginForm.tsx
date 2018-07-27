import * as React from 'react';
import {login} from "../../util/APIUtils";
import {
    ACCESS_TOKEN, EMAIL_MAX_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    USERNAME_MIN_LENGTH
} from "../../constants";
import * as M from "materialize-css";
import LoadingIndicator from "../../common/LoadingIndicator";
import '../UserForms.css';

interface LoginFormState {
    [key: string]: any,

    isLoading: boolean,
    isWrongCredentials: boolean,
}

class LoginForm extends React.Component<any, LoginFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            usernameOrEmail: {
                value: ''
            },
            password: {
                value: ''
            },
            isLoading: false,
            isWrongCredentials: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fieldsAreNotEmpty = this.fieldsAreNotEmpty.bind(this);
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

    handleSubmit(event: any) {
        event.preventDefault();

        const {usernameOrEmail, password} = this.state;

        if (this.state.isLoading) {
            return;
        }
        if (usernameOrEmail.value === '' || password.value === '') {
            M.toast({html: 'Empty field(s)!'});
            return;
        }

        this.setState({
            isLoading: true
        });

        const loginRequest = {
            usernameOrEmail: usernameOrEmail.value,
            password: password.value
        };

        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.props.onLogin();
                this.setState({isLoading: false, isWrongCredentials: false});
                M.toast({html: `Welcome back, ${usernameOrEmail.value}`});
            }).catch(error => {

            this.setState({isLoading: false});

            if (error.status === 401) {
                this.setState({isWrongCredentials: true})
            } else {
                M.toast({html: 'SOMETHING WRONG (OTHER THAN 401)'});
                alert(error);
            }
        });
    }

    render() {
        return (
            <div id="form-modal-login" className="modal form-modal open">
                <button className="user-form-modal-close btn-flat modal-close"><i
                    className="fas fa-times"/>
                </button>

                <div id="login-root">
                    <div className="user-form-col-img user-form-col-img__login"/>

                    <div className="user-form-col user-form-col__login">

                        <form onSubmit={this.handleSubmit}>
                            <h5 className="center-align">Log in</h5>

                            <div className="input-field">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="usernameOrEmail"
                                       type="text"
                                       name="usernameOrEmail"
                                       value={this.state.usernameOrEmail.value}
                                       onChange={this.handleChange}
                                />
                                <label htmlFor="usernameOrEmail">Username or Email</label>
                            </div>
                            <div className="input-field">
                                <i className="material-icons prefix">lock</i>
                                <input id="password"
                                       className="input-field-text"
                                       type="password"
                                       name="password"
                                       value={this.state.password.value}
                                       onChange={this.handleChange}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                            {this.state.isWrongCredentials &&
                            <p className="red-text">Wrong username, email or password</p>}
                            {this.state.isLoading ?
                                (<LoadingIndicator/>) :
                                (<button type="submit"
                                         disabled={!this.fieldsAreNotEmpty()}
                                         className="btn waves-effect center-align">Submit
                                    <i className="material-icons right">send</i>
                                </button>)}
                            <button
                                data-target="form-modal-signup"
                                className="modal-close right form-switch-btn modal-trigger">Or sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    fieldsAreNotEmpty() {
        return this.state.usernameOrEmail.value.length >= USERNAME_MIN_LENGTH &&
            this.state.usernameOrEmail.value.length <= EMAIL_MAX_LENGTH &&
            this.state.password.value.length >= PASSWORD_MIN_LENGTH &&
            this.state.password.value.length <= PASSWORD_MAX_LENGTH;
    }
}

export default LoginForm;
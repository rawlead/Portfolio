    import * as React from 'react';
    import {login} from "../../util/APIUtils";
    import {
    ACCESS_TOKEN, EMAIL_MAX_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, RECAPTCHA_SITE_KEY,
    USERNAME_MIN_LENGTH
} from "../../constants";
    import * as M from "materialize-css";
    // import Recaptcha from 'react-recaptcha';
    import LoadingIndicator from "../../common/LoadingIndicator";
    import '../UserForms.css';
    import {Link} from "react-router-dom";
    import * as Recaptcha from "react-recaptcha";

    interface LoginFormState {
        [key: string]: any,

        isLoading: boolean,
        isWrongCredentials: boolean,
        isRecaptchaVerified: any
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
                isWrongCredentials : false,
                isRecaptchaVerified : null
            };
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.fieldsAreNotEmpty = this.fieldsAreNotEmpty.bind(this);
            this.recaptchaVerifyCallback = this.recaptchaVerifyCallback.bind(this);
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

        recaptchaVerifyCallback(response : any) {
            if (response) {
                this.setState({isRecaptchaVerified : true})
            }
        }

        handleSubmit(event: any) {
            event.preventDefault();

            if (!this.state.isRecaptchaVerified) {
                M.toast({html: 'Please verify that you are not a robot!'});
                return;
            }

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
                    // M.toast({html: 'Wrong Email/Username or Password'});
                    this.setState({isWrongCredentials: true})
                } else {

                    M.toast({html: 'SOMETHING WRONG (OTHER THAN 401)'});
                    alert(error);
                }
            });
        }

        render() {
            return (
                <div style={{minHeight: '100vh'}} className="login-root">
                        <div className="user-form-col user-form-col-left-cover"/>

                        <div className="hide-on-med-and-down  user-form-col user-form-col-left__login">

                            <div className="user-form-col-left-text">
                                <h2>Welcome!</h2>
                                <h4>Please Login</h4>
                                <p><Link className="amber-text" to="/signup">Or create new account</Link></p>
                            </div>

                        </div>

                        <div className="user-form-col user-form-col-right user-form-col-right__login">


                            <form onSubmit={this.handleSubmit}>
                                <h2>Login</h2>
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

                                <Recaptcha
                                    sitekey={RECAPTCHA_SITE_KEY}
                                    render="explicit"
                                    verifyCallback={this.recaptchaVerifyCallback}
                                />

                                {this.state.isWrongCredentials &&
                                <p className="red-text">Wrong username, email or password</p>}
                                {this.state.isLoading ?
                                    (<LoadingIndicator/>) :
                                    (<button type="submit"
                                             disabled={!this.fieldsAreNotEmpty()}
                                             className="btn waves-effect">Submit
                                        <i className="material-icons right">send</i>
                                    </button>)}
                            </form>
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
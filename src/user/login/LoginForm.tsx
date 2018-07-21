    import * as React from 'react';
    import {login} from "../../util/APIUtils";
    import {
        ACCESS_TOKEN,
        PASSWORD_MAX_LENGTH,
        PASSWORD_MIN_LENGTH,
        USERNAME_MAX_LENGTH,
        USERNAME_MIN_LENGTH
    } from "../../constants";
    import * as M from "materialize-css";
    import LoadingIndicator from "../../common/LoadingIndicator";
    import '../UserForms.css';
    import {Link} from "react-router-dom";

    interface LoginFormState {
        [key: string]: any,

        isLoading: boolean,
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
                isLoading: false
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
                    this.setState({isLoading: false});
                    M.toast({html: `Welcome back, ${usernameOrEmail.value}`});
                }).catch(error => {

                this.setState({isLoading: false});

                if (error.status === 401) {
                    M.toast({html: 'Wrong Email/Username or Password'});

                } else {

                    M.toast({html: 'SOMETHING WRONG (OTHER THAN 401)'});
                    alert(error);
                }
            });
        }

        render() {
            return (
                <div style={{minHeight: '100vh'}} className="login-root">

                    <div style={{marginBottom: 0}}>


                        <div className="hide-on-med-and-down  user-form-col user-form-col-left-cover"/>

                        <div className="hide-on-med-and-down  user-form-col user-form-col-left">

                            <div className="user-form-col-left-text">
                                <h1>Welcome!</h1>
                                <h3>Please Login</h3>
                                <p><Link className="amber-text" to="/signup">Or create new account</Link></p>
                            </div>

                        </div>

                        <div className="user-form-col user-form-col-right">


                            <form onSubmit={this.handleSubmit}>
                                <h1>Login</h1>
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
                                           type="password"
                                           name="password"
                                           value={this.state.password.value}
                                           onChange={this.handleChange}
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                                {this.state.isLoading ?
                                    (<LoadingIndicator/>) :
                                    (<button type="submit"
                                             disabled={!this.fieldsAreNotEmpty()}
                                             className="btn ">Submit</button>)}
                            </form>
                        </div>
                    </div>
                </div>
            )
        }

        fieldsAreNotEmpty() {
            return this.state.usernameOrEmail.value.length >= USERNAME_MIN_LENGTH &&
                this.state.usernameOrEmail.value.length <= USERNAME_MAX_LENGTH &&
                this.state.password.value.length >= PASSWORD_MIN_LENGTH &&
                this.state.password.value.length <= PASSWORD_MAX_LENGTH;
        }
    }

    export default LoginForm;
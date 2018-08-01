import * as React from 'react';
import * as M from 'materialize-css';
import LoadingIndicator from "../../common/LoadingIndicator";
import {checkEmailAvailability, checkUsernameAvailability, signup} from "../../util/APIUtils";
import {
    EMAIL_MAX_LENGTH,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH, PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, RECAPTCHA_SITE_KEY,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH
} from "../../constants";
// import {Link} from "react-router-dom";
import * as Recaptcha from "react-recaptcha";

interface SignupFormState {
    [inputName: string]: any,

    isLoading: boolean,
    isRecaptchaVerified: boolean
}

class SignupForm extends React.Component<any, SignupFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: {
                value: '',
                validateStatus: '',
                validateMsg: ''
            },
            username: {
                value: '',
                validateStatus: '',
                validateMsg: null
            },
            email: {
                value: '',
                validateStatus: '',
                validateMsg: null
            },
            password: {
                value: '',
                validateStatus: '',
                validateMsg: null
            },
            isLoading: false,
            isRecaptchaVerified: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateMsgStyle = this.validateMsgStyle.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.recaptchaVerifyCallback = this.recaptchaVerifyCallback.bind(this);
        this.recaptchaOnloadCallback = this.recaptchaOnloadCallback.bind(this);
    }

    handleInputChange(event: any) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        let validation = {};

        switch (inputName) {
            case "name":
                validation = this.validateName(inputValue);
                break;
            case "username":
                validation = this.validateUsername(inputValue);
                break;
            case "email":
                validation = this.validateEmail(inputValue);
                break;
            case "password":
                validation = this.validatePassword(inputValue);
                break;
        }

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validation
            }
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if (!this.state.isRecaptchaVerified) {
            M.toast({html: 'Please verify that you are not a robot!'});
            return;
        }

        const {name, username, email, password} = this.state;

        if (this.state.isLoading) {
            return;
        }

        if (name.value === '' || username.value === '' || email.value === '' || password.value === '') {
            M.toast({html: 'Empty field(s)!'});
            return;
        }

        this.setState({isLoading: true});

        const signupRequest = {
            name: this.state.name.value,
            username: this.state.username.value,
            email: this.state.email.value,
            password: this.state.password.value
        };

        signup(signupRequest)
            .then(response => {
                M.toast({html: `Thank you, ${username.value} ! You\'re successfully registered.`});
                this.props.onSignup(this.state.username.value, this.state.password.value);
                this.setState({isLoading: false})
            }).catch(error => {
            M.toast({html: error.message});
            this.setState({isLoading: false})
        });

    }

    validateMsgStyle(validateStatus: string) {
        let styling = "helper-text ";
        if (validateStatus === "success") {
            styling += "green-text"
        } else if (validateStatus === "error") {
            styling += "red-text lighten-1"
        } else if (validateStatus === "validating") {
            styling += "yellow-text"
        }
        return styling;
    }


    recaptchaVerifyCallback(response: any) {
        if (response) {
            this.setState({isRecaptchaVerified: true})
        }
    }

    recaptchaOnloadCallback() {
        return;
    }

    render() {
        const {name, username, email, password} = this.state;
        return (

            <div id="form-modal-signup" className="modal form-modal ">
                <button className="user-form-modal-close btn-flat modal-close"><i
                    className="fas fa-times fa-2x"/>
                </button>
                <div id="signup-root">
                    <div className="user-form-col-img user-form-col-img__signup"/>

                    <div className="user-form-col user-form-col__signup">

                        <form onSubmit={this.handleSubmit}>
                            <h5 className="center-align">Sign up</h5>

                            <div className="input-field">
                                <i className="material-icons prefix">account_box</i>
                                <input id="name"
                                       name="name"
                                       type="text"
                                       autoComplete="off"
                                       onChange={this.handleInputChange}
                                       value={name.value}
                                />
                                <label htmlFor="name">Full Name</label>

                                <span className={this.validateMsgStyle(name.validateStatus)}>{name.validateMsg}</span>
                            </div>

                            <div className="input-field">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="username"
                                       name="username"
                                       type="text"
                                       autoComplete="off"
                                       onChange={this.handleInputChange}
                                       value={username.value}
                                       onBlur={this.validateUsernameAvailability}
                                />
                                <label htmlFor="username">Username</label>

                                <span
                                    className={this.validateMsgStyle(username.validateStatus)}>{username.validateMsg}</span>
                            </div>

                            <div className="input-field">
                                <i className="material-icons prefix">email</i>
                                <input id="email"
                                       name="email"
                                       type="email"
                                       autoComplete="off"
                                       onChange={this.handleInputChange}
                                       value={email.value}
                                       onBlur={this.validateEmailAvailability}
                                       data-length="10"
                                />
                                <label htmlFor="email">Email</label>

                                <span className={this.validateMsgStyle(email.validateStatus)}>{email.validateMsg}</span>

                            </div>

                            <div className="input-field">
                                <i className="material-icons prefix">lock</i>
                                <input id="password-signup"
                                       name="password"
                                       type="password"
                                       autoComplete="off"
                                       onChange={this.handleInputChange}
                                       value={password.value}
                                />
                                <label htmlFor="password-signup">Password</label>

                                <span
                                    className={this.validateMsgStyle(password.validateStatus)}>{password.validateMsg}</span>
                            </div>

                            <Recaptcha
                                sitekey={RECAPTCHA_SITE_KEY}
                                render="explicit"
                                verifyCallback={this.recaptchaVerifyCallback}
                                onloadCallback={this.recaptchaOnloadCallback}
                            />

                            {this.state.isLoading ?
                                (<LoadingIndicator/>) :
                                (<button type="submit"
                                         className="btn waves-effect center-align"
                                         disabled={this.isFormInvalid()}>
                                    <i className="material-icons right">send</i>
                                    Submit
                                </button>)}

                            <button data-target="form-modal-login"
                                    className="modal-close right form-switch-btn modal-trigger">Or Log in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    validateName = (name: string) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                validateMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                validateMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                validateMsg: 'OK',
            };
        }
    };

    validateUsername = (username: string) => {
        if (username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                validateMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                validateMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                validateMsg: 'OK'
            }
        }
    };

    validateEmail = (email: string) => {
        if (!email) {
            return {
                validateStatus: 'error',
                validateMsg: 'Email may not be empty'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                validateMsg: 'Email not valid'
            }
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                validateMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: 'success',
            validateMsg: 'OK'
        }
    };

    validatePassword = (password: string) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                validateMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                validateMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                validateMsg: 'OK',
            };
        }
    };

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if (usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                validateMsg: 'Checking username availability...'
            }
        });

        checkUsernameAvailability(usernameValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'success',
                            validateMsg: 'This username is available'
                        }
                    });
                } else {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'error',
                            validateMsg: 'This username is already taken'
                        }
                    });
                }
            }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    validateMsg: null
                }
            });
        });
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if (emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                validateMsg: 'Checking email availability...'
            }
        });

        checkEmailAvailability(emailValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            validateMsg: 'This Email is available'
                        }
                    });
                } else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'error',
                            validateMsg: 'This Email is already registered'
                        }
                    });
                }
            }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    validateMsg: 'This Email is available'
                }
            });
        });
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }
}

export default SignupForm;
import React, {Component} from "react";
import { connect } from "react-redux";

import * as navActions from '../actions/NavActions';
import { bindActionCreators } from "redux";

import Button from "react-bootstrap/Button";

const mapStateToProps = state => {
    return state;
}

class LandingDemo extends Component{
    constructor(props){
        super(props);
        this.doLogin = this.doLogin.bind(this);
        this.getRegistrationForm = this.getRegistrationForm.bind(this);
    }

    doLogin(){
        const { login } = this.props;
        login();
    }

    getRegistrationForm(){
        const { register } = this.props;
        register();
    }

    render(){
        return(
            <>
                <style>
                    {`
                        .login{
                            padding-left: 4%;
                            padding-top: 2%
                        }
                        .lBody{
                            margin-top: 4%;
                            padding-left: 2%;
                        }
                        .lForm{
                            display: flex;
                            flex-direction: column; 
                        }
                        input{
                            width: 340px;
                            margin-top: 10px;
                        }
                        .loginButton{
                            width: 340px;
                            background-color: #004282;
                            color: #ffffff;
                            border-radius: 20px;
                            border: none;
                        }
                        .loginButton:hover{
                            background-color: #00a0aa;
                        }
                        .registrationButton{
                            color: #ea3b07;
                            border: none;
                            background: none;
                            margin-bottom: 10px;
                            margin-top: 5px;
                        }
                        .registrationButton:hover{
                            color: #fa4b17;
                        }
                    `}
                </style>
                <div className="login">
                    <h1>Willkommen bei kimbaa!</h1>
                    <p>Melde dich an, um deine Sitzung fortzusetzen.</p>
                    <div className="lBody">
                        <h2>Login:</h2>
                        <div className="lForm">
                            <input type="text" id="input1" name="input1" placeholder="Matrikelnr." />
                            <input type="password" id="input2" name="input2" placeholder="Passwort" />
                            <div>
                                <button onClick={this.getRegistrationForm} className="registrationButton"><u>Registrieren</u></button>
                            </div>
                            <Button onClick={this.doLogin} className="loginButton">Anmelden</Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    login: navActions.getNavLandingAction,
    register: navActions.getNavRegistrationPageAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LandingDemo);
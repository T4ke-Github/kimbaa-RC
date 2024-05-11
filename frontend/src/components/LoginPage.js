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
                            display: flex;
                            flex-direction: row;
                            align-items: flex-start;
                            height: 100vh;
                            padding-left: 100px;
                            padding-top: 2%
                        }
                        .login img {
                            width: auto;
                            max-height: 80%;
                            max-width: 50%;
                        }
                        .loginAlignmentHelp{
                            display: flex;
                            flex-direction: column;
                            flex: 1;
                        }
                        .lBody{
                            margin-top: 2%;
                            padding-left: 50px;
                            padding-top: 10px;
                            padding-bottom: 40px;
                            width: 400px;
                            background-color: #ffc900;
                            border-radius: 30px;
                        }
                        .lForm{
                            display: flex;
                            flex-direction: column; 
                        }
                        input{
                            width: 340px;
                            height: 26px;
                            border-radius: 10px;
                            border: 0;
                            margin-top: 10px;
                        }
                        .loginButton{
                            width: 340px;
                            height: 40px;
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
                            margin-top: 10px;
                        }
                        .registrationButton:hover{
                            color: #fa4b17;
                        }
                    `}
                </style>
                <div className="login">
                    <div className="loginAlignmentHelp">
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
                    <img alt="kimbaa_login_logo" src="kimbaa_high_login.png"/>
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
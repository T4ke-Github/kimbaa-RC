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
                <div className="formPage">
                    <div className="fAlignmentHelp">
                        <h1>Willkommen bei kimbaa!</h1>
                        <p>Melde dich an, um deine Sitzung fortzusetzen.</p>
                        <div className="fBody">
                            <h2>Login:</h2>
                                <input type="text" id="input1" name="input1" placeholder="Matrikelnr." />
                                <input type="password" id="input2" name="input2" placeholder="Passwort" />
                                <div>
                                    <button onClick={this.getRegistrationForm} className="linkStyleButton"><u>Registrieren</u></button>
                                </div>
                                <Button onClick={this.doLogin} className="standardButton">Anmelden</Button>
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
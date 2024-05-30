import React, {Component} from "react";
import { connect } from "react-redux";

import * as navActions from '../actions/NavActions';
import * as authActions from '../actions/AuthActions';
import { bindActionCreators } from "redux";

import Button from "react-bootstrap/Button";

const mapStateToProps = state => {
    return state;
}

class LandingDemo extends Component{
    constructor(props){
        super(props);

        this.state = {
            matrikel: "",
            password: ""
        }

        this.doLogin = this.doLogin.bind(this);
        this.getRegistrationForm = this.getRegistrationForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    doLogin(){
        const { matrikel, password } = this.state;
        const { loginAction } = this.props;
        loginAction(matrikel, password);
    }

    handleInputChange(e){
        const { name, value } = e.target;
        this.setState({[name]: value});
    }

    getRegistrationForm(){
        const { moveToRegister } = this.props;
        moveToRegister();
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.doLogin();
        }
    }

    render(){
        return(
            <>
                <div className="formPage" onKeyDown={this.handleKeyPress}>
                    <div className="fAlignmentHelp">
                        <h1>Willkommen bei kimbaa!</h1>
                        <p>Melde dich an, um deine Sitzung fortzusetzen.</p>
                        <div className="fBody">
                            <h2>Login:</h2>
                                <input type="number" name="matrikel" value={this.state.matrikel} placeholder="Matrikelnr." onChange={this.handleInputChange}/>
                                <input type="password" name="password"value={this.state.password} placeholder="Passwort" onChange={this.handleInputChange}/>
                                <div>
                                    <button onClick={this.getRegistrationForm} className="linkStyleButton"><u>Registrieren</u></button>
                                </div>
                                <Button type="submit" onClick={this.doLogin} className="standardButton">Anmelden</Button>
                        </div>
                    </div>
                    <img alt="kimbaa_login_logo" src="kimbaa_high_login.png"/>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    moveToRegister: navActions.getNavRegistrationPageAction,
    loginAction: authActions.loginAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LandingDemo);
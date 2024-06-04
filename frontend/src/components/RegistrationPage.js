import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import * as navActions from '../actions/NavActions';
import * as authActions from '../actions/AuthActions';

const mapStateToProps = state => {
    return state;
}

class RegistrationPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            regMatrikel: "",
            regName: "",
            regEmail: "",
            regAdmin: false,
            regPassword: "",
            regPasswordRe: "",
            noMatch: false,
            incorrectEmailFormat: false,
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleRegistration(e);
        }
    }

    handleCancel(e){
        const { close } = this.props;
        close();
    }

    handleCheck(e){
        const { name, checked } = e.target;
        this.setState({[name]: checked});
    }

    handleInputChange(e){
        const { name, value } = e.target;
        if(name === "regPassword" || name === "regPasswordRe"){
            this.setState(prevState => ({
                [name]: value,
                noMatch: false
            }));
        }else if(name === "regEmail"){
            this.setState(prevState => ({
                [name]: value,
                incorrectEmailFormat: false,
            }));
        }else{
            this.setState({[name]: value});
        }
    }

    checkEmail(email){
        const suffix = '@bht-berlin.de';
        return email.endsWith(suffix);
    }

    handleRegistration(e){
        e.preventDefault();
        const { regMatrikel, regName, regEmail, regAdmin, regPassword, regPasswordRe } = this.state;
        const { register } = this.props;
        if(regPassword !== regPasswordRe){
            this.setState({
                noMatch: true,
                regPassword: "",
                regPasswordRe: ""
            });
            if(!this.checkEmail(regEmail)){
                this.setState({
                    incorrectEmailFormat: true,
                    regEmail: ""
                });
                return;
            }
            return;
        }
        if(!this.checkEmail(regEmail)){
            this.setState({
                incorrectEmailFormat: true,
                regEmail: ""
            });
            return;
        }
        console.log("Time to doxx the new user! Matrikel: "+regMatrikel+", Name: "+regName+", Email: "+regEmail+", Admin: "+regAdmin+", Password: "+regPassword);
        register(regMatrikel, regName, regEmail, regPassword);
    }

    render(){
        let warning;
        if(this.state.noMatch && !this.state.incorrectEmailFormat){
            warning = <div className="fMessage white"><p>Beide Passwörter müssen übereinstimmen!</p></div>
        }else if(!this.state.noMatch && this.state.incorrectEmailFormat){
            warning = <div className="fMessage white"><p>Falsches Emailformat (muss auf @bht-berlin.de enden)!</p></div>
        }else if(this.state.noMatch && this.state.incorrectEmailFormat){
            warning = <div className="fMessage white"><p>Beide Passwörter müssen übereinstimmen!</p><p>Falsches Emailformat (muss auf @bht-berlin.de enden)!</p></div>
        }else{
            warning=<p></p>
        }
        return(
            <>
                <style>
                    {`
                        .fBody{
                            background-color: #ea3b07;
                        }
                        .rCancel{
                            background-color: #ffffff;
                            color: #ea3b07;
                            width: 15vw;
                            margin-right: 5vw;
                        }
                        .rCancel:hover{
                            background-color: #ea3b07;
                            color: #ffffff;
                        }
                        .regButtonAlign{
                            display: flex;
                            flex-direction: row;
                        }
                        .submit{
                            width: 15vw;
                        }
                        .submit:hover{
                            background-color: #60a2d2;
                            color: #004282;
                        }
                        .white{
                            color: #ffffff;
                            border-color: #ffffff;
                            margin-top: 20px;
                        }
                        .adminCheck{
                            color: #ffffff;
                            margin-top: 20px;
                            margin-bottom: 10px
                        }
                        .regIn{
                            width: 35vw;
                            height: 26px;
                            border-radius: 10px;
                            border: none;
                            margin-top: 10px;
                        }
                        .firstItem{
                            margin-top: 30px;
                        }
                    `}
                </style>
                <div className="formPage" onKeyDown={this.handleKeyPress}>
                    <div className="fAlignmentHelp">
                        <h1>Ist die Zeit für deine Bachelorarbeit gekommen?</h1>
                        <h2>Kein Problem - registriere dich hier!</h2>
                        <Form className="fBody">
                            <input className="regIn firstItem" type="number" id="matrikel" name="regMatrikel" value={this.state.regMatrikel} placeholder="Matrikelnr." onChange={this.handleInputChange}/>
                            <input className="regIn" type="text" id="name" name="regName" value={this.state.regName} placeholder="Name" onChange={this.handleInputChange}/>
                            <input className="regIn" type="email" id="email" name="regEmail" value={this.state.regEmail}placeholder="Email (muss auf '@bht-berlin.de' enden)" onChange={this.handleInputChange}/>
                            <div className="adminCheck">
                                <Form.Check label="Ich bin ein Admin" checked={this.regAdmin} onChange={this.handleCheck} />
                            </div>
                            <input className="regIn" type="password" id="password" name="regPassword" value={this.state.regPassword} placeholder="Passwort" onChange={this.handleInputChange}/>
                            <input className="regIn" type="password" id="passwordRe" name="regPasswordRe" value={this.state.regPasswordRe} placeholder="Passwort widerholen" onChange={this.handleInputChange}/>
                            { warning }
                            <div className="regButtonAlign">
                                <Button onClick={this.handleCancel} className="standardButton rCancel spaceTop">Abbrechen</Button>
                                <Button onClick={this.handleRegistration} className="standardButton submit spaceTop">Registrieren</Button>
                            </div>
                        </Form>
                    </div>
                    <img alt="kimbaa_login_logo" src="kimbaa_high_login.png"/>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    close: navActions.getNavLoginAction,
    register: authActions.registerUserAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
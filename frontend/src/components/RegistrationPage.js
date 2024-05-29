import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "react-bootstrap/Button";

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
            regDepartment: "",
            regCreditPoints: "",
            regPassword: "",
            regPasswordRe: "",
            noMatch: false,
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
    }

    handleCancel(e){
        const { close } = this.props;
        close();
    }

    handleInputChange(e){
        const { name, value } = e.target;
        if(name === "regPassword" || name === "regPasswordRe"){
            this.setState(prevState => ({
                [name]: value,
                noMatch: false
            }));
        }else{
            this.setState({[name]: value});
        }
    }

    handleRegistration(e){
        e.preventDefault();
        const { regMatrikel, regName, regEmail, regPassword, regPasswordRe } = this.state;
        const { register } = this.props;
        if(regPassword !== regPasswordRe){
            console.log("Time to doxx the new user! Matrikel: "+regMatrikel+", Name: "+regName+", Email: "+regEmail+", Admin: "+regAdmin+", CreditPoints: "+regCreditPoints+", Department: "+regDepartment);
            this.setState({noMatch: true});
            this.setState({regPassword: ""});
            this.setState({regPasswordRe: ""});
            return;
        }
        console.log(regPassword+", "+regPasswordRe);
        register(regMatrikel, regName, regEmail, regPassword);
    }

    render(){
        let warning;
        if(this.state.noMatch){
            warning = <p className="warn">Passwords didn't match!</p>
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
                            margin-right: 20px
                        }
                        .rCancel:hover{
                            background-color: #ea3b07;
                            color: #ffffff;
                        }
                        .regButtonAlign{
                            display: flex;
                            flex-direction: row;
                            padding-right: 50px
                        }
                        .submit:hover{
                            background-color: #60a2d2;
                            color: #004282;
                        }
                        .warn{
                            color: #ffffff;
                        }
                        .adminCheck{
                            color: #ffffff;
                            display: flex;
                            align-items: flex-end;
                        }
                    `}
                </style>
                <div className="formPage">
                    <div className="fAlignmentHelp">
                        <h1>Ist die Zeit für deine Bachelorarbeit gekommen?</h1>
                        <h2>Kein Problem - registriere dich hier!</h2>
                        <form className="fBody">
                            <input type="number" id="matrikel" name="regMatrikel" value={this.state.regMatrikel} placeholder="Matrikelnr." className="spaceTop" onChange={this.handleInputChange}/>
                            <input type="text" id="name" name="regName" value={this.state.regName} placeholder="Name" onChange={this.handleInputChange}/>
                            <input type="email" id="email" name="regEmail" value={this.state.regEmail}placeholder="Email" onChange={this.handleInputChange}/>
                            <input type="number" id="department" name="regDepartment" value={this.state.regDepartment} placeholder="Fachbereich" onChange={this.handleInputChange}/>
                            <input type="number" id="creditPoints" name="regCreditPoints" value={this.state.regCreditPoints} placeholder="Credit Points" onChange={this.handleInputChange}/>
                            <div className="adminCheck">
                                <p>Bist du ein Admin? Sei ehrlich!</p>
                                <input type="checkbox" className="box" id="admin" name="regAdmin" checked={this.state.regAdmin} onChange={this.handleInputChange} />
                            </div>
                            <input type="password" id="password" name="regPassword" value={this.state.regPassword} placeholder="Passwort" className="spaceTop" onChange={this.handleInputChange}/>
                            <input type="password" id="passwordRe" name="regPasswordRe" value={this.state.regPasswordRe} placeholder="Passwort widerholen" className="spaceBottom" onChange={this.handleInputChange}/>
                            { warning }
                            <div className="regButtonAlign">
                                <Button onClick={this.handleCancel} className="standardButton rCancel ">Abbrechen</Button>
                                <Button onClick={this.handleRegistration} className="standardButton submit">Registrieren</Button>
                            </div>
                        </form>
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
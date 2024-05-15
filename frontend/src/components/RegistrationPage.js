import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "react-bootstrap/Button";

import * as navActions from '../actions/NavActions'

const mapStateToProps = state => {
    return state;
}

class RegistrationPage extends Component{

    constructor(props){
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel(e){
        const { cancel } = this.props;
        cancel();
    }

    render(){
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
                    `}
                </style>
                <div className="formPage">
                    <div className="fAlignmentHelp">
                        <h1>Registriere dich hier als neuen Nutzer: </h1>
                        <form className="fBody">
                            <input type="text" id="matrikel" name="matrikel" placeholder="Matrikelnr." className="spaceTop"/>
                            <input type="text" id="name" name="name" placeholder="Name" />
                            <input type="text" id="surname" name="surname" placeholder="Vorname" />
                            <input type="password" id="password" name="password" placeholder="Passwort" className="spaceTop"/>
                            <input type="passwordRe" id="passwordRe" name="passwordRe" placeholder="Passwort widerholen" className="spaceBottom"/>
                            <div className="regButtonAlign">
                                <Button onClick={this.handleCancel} className="standardButton rCancel ">Abbrechen</Button>
                                <Button onClick={this.handleCancel} className="standardButton submit">Registrieren</Button>
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
    cancel: navActions.getNavLoginAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
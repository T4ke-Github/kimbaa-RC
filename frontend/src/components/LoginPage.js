import React, {Component} from "react";
import { connect } from "react-redux";
import { getNavLoginAction } from "../actions/NavActions";

class LandingDemo extends Component{
    constructor(props){
        super(props);
        this.getLoginAction = this.getLoginAction.bind(this);
    }

    getLoginAction(){
        const dispatch = this.props.dispatch;
        dispatch(getNavLoginAction());
    }

    render(){
        return(
            <>
                <style>
                    {`
                        .landing{
                            padding-left: 2%;
                            padding-top: 2%
                        }
                    `}
                </style>
                <div className="landing">
                    <h1>Willkommen bei kimbaa!</h1>
                    <p>Login:</p>
                    <input type="text" id="input1" name="input1" placeholder="Matrikelnr." />
                    <input type="password" id="input2" name="input2" placeholder="Passwort" />
                    <button onClick={this.getLoginAction}>Anmelden</button>
                </div>
            </>
        )
    }
}

export default connect()(LandingDemo);
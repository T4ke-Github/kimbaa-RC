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
    }

    handleCancel(e){
        const { cancel } = this.props;
        cancel();
    }

    render(){
        return(
            <div>
                <h1>Registriere dich als neuen Nutzer: </h1>
                <Button onClick={this.handleCancel} >Abbrechen</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    cancel: navActions.getNavLandingAction,
}, dispatch);

const RegistrationPage = connect(mapStateToProps, mapDispatchToProps)(RegistrationPage)

export default RegistrationPage;
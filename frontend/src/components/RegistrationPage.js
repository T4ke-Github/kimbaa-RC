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
            <div>
                <h1>Registriere dich als neuen Nutzer: </h1>
                <Button onClick={this.handleCancel} >Abbrechen</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    cancel: navActions.getNavLoginAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as navActions from '../actions/NavActions'

const mapStateToProps = state => {
    return state;
}

class RegistrationPage extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>Hello!</h1>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    cancel: navActions
})

export default connect()(RegistrationPage)
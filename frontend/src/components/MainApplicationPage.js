import React, {Component} from "react";
import { connect } from "react-redux";

import * as navActions from '../actions/NavActions';
import * as authActions from '../actions/AuthActions';
import { bindActionCreators } from "redux";

import Button from "react-bootstrap/Button";

const mapStateToProps = state => {
    return{
        userResource: state.auth.userResource
    }
}

class MainApplicationPage extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            appSemSummer: false,
            appSemWinter: false,
            appMatrikel: "",
            appDepartment: "",
            appName: "",
            appEmail: "",
            appPhone: "",
            appAddress: "",
            appCourse: "",
            appBachelor: false,
            appMaster: false,
            appModuleRequirementsMet: false,
            appAttachment1: false,
            appAttachment2: false,
            appNoTopicProposition: false,
            appPracticalSemesterDone: false,
            appPracticalSemesterAcknoledgement: false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        const { name, value } = e.target;
        this.setState({[name]: value});
    }


    render(){

    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    moveToLanding: navActions.getNavLandingAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MainApplicationPage);
import React, {Component} from "react";
import { connect } from "react-redux";

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

export default connect()(RegistrationPage)
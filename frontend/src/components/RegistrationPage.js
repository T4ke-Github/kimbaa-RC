import React, {Component} from "react";
import { connect } from "react-redux";

class RegistrationPage extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <p>Placeholder</p>
            </div>
        )
    }
}

export default connect()(RegistrationPage)
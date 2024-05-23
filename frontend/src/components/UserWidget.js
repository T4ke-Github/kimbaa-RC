import React, {Component} from "react";
import Cookies from 'js-cookie';
import Dropdown from 'react-bootstrap/Dropdown';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as navActions from '../actions/NavActions';

const mapStateToProps = state => {
    return state;
}

class UserWidget extends Component{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e){
        const { logout } = this.props;
        logout();
        Cookies.set('loggedIn', false);
    }

    render(){
        return(
            <>
            <style></style>
            <Dropdown>
                <Dropdown.Toggle>User</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    logout: navActions.getNavLoginAction,
}, dispatch);

const ConnectedUserWidget = connect(mapStateToProps, mapDispatchToProps)(UserWidget);

export default ConnectedUserWidget;
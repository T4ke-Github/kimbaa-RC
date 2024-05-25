import React, {Component} from "react";
import Cookies from 'js-cookie';

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
            <style>
                {`
                    .logoutButton{
                        font-family: BHTTitle;
                        font-size: 17px;
                        color: #ffc900;
                        background-color: #004282;
                        border: none;
                        border-radius: 4px;
                        padding-left: 8px;
                        padding-right: 8px;
                        padding-top: 4px;
                        padding-bottom: 4px;
                        margin-left: 80vw;
                    }
                `}
            </style>
            <button onClick={this.handleLogout} className="logoutButton">
                Logout
            </button>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    logout: navActions.getNavLoginAction,
}, dispatch);

const ConnectedUserWidget = connect(mapStateToProps, mapDispatchToProps)(UserWidget);

export default ConnectedUserWidget;
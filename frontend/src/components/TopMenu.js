import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as navActions from '../actions/NavActions';

const mapStateToProps = state => {
    return state;
}

class TopMenu extends Component{

    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e){
        const { logout } = this.props;
        logout();
    }

    render(){
        return(
            <>
            <style>
                {`
                    .topMenu {
                        background-color: #555555;
                        color: #ffc900;
                        display: flex;
                        align-items: center;
                    }
                    .logo img{
                        margin-right: 10px;
                        margin-left: 15px;
                    }
                `}
            </style>
            <Navbar className="topMenu">
                <Navbar.Brand onClick={this.handleLogout} className="logo">
                    <img alt="" src="kimbaa_logo_256.png" width="52" height="52" className="d-inline-block align-top"/>
                </Navbar.Brand>
                <Nav>
                    <h2 onClick={this.handleLogout}>kimbaa</h2>
                </Nav>
            </Navbar>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    logout: navActions.getNavLoginAction,
}, dispatch);

const ConnectedTopMenu = connect(mapStateToProps, mapDispatchToProps)(TopMenu);

export default ConnectedTopMenu;
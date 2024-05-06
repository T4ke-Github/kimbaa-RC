import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as demoActions from '../actions/DemoActions';

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
            <Navbar>
                <Container>
                <Navbar.Brand onClick={this.handleLogout}>
                    <img alt="" src="kimbaa_logo_clean.png" width="30" height="30" className="d-inline-block align-top look"/>
                    {' '} kimbaa
                </Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    logout: demoActions.getLogoutAction,
}, dispatch);

const ConnectedTopMenu = connect(mapStateToProps, mapDispatchToProps)(TopMenu);

export default ConnectedTopMenu;
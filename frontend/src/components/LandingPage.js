import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { connect } from "react-redux";
import logger from "../logging/logger";

import { bindActionCreators } from "redux";
import * as navActions from '../actions/NavActions';
import * as appActions from '../actions/ApplicationActions';

const mapStateToProps = state => {
    return {
        userResource: state.auth.userResource,
        application: state.app.application,
        userToken: state.auth.userToken,
    }
}

class LandingPage extends Component {
    constructor(props) {
        super(props);

        let userResource = this.props.userResource;
        let application = this.props.application;
        
        this.state = {
            appMatrikel: userResource.studentId ? userResource.studentId : "",
            appDetails: application.antragZulassungDetails ? application.antragZulassungDetails : "empty"
        }
        this.makeApplication = this.makeApplication.bind(this);
        this.moveEditApplication = this.moveEditApplication.bind(this);
        this.moveDeleteApplication = this.moveDeleteApplication.bind(this);
        this.getApplicationDef = this.getApplicationDef.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    // Tries to fetch existing application on page load
    componentDidMount(){
        const { appMatrikel } = this.state;
        this.props.getApplication(appMatrikel);
        logger.info("LandingPage.js mounted!");
    }
    // Debugging Tool, will execute a get request for the application to the backend manually instead of on page load. Only componentDidMount() should be used on release
    getApplicationDef(){
        const { appMatrikel } = this.state;
        this.props.getApplication(appMatrikel);
        logger.info("Loaded Application Manually (Debug)");
    }

    // Opens application creation page (MainApplicationPage.js)
    makeApplication(){
        const { application } = this.props;
        application();
    }
    // opens page for application editing (MainApplicationEditPage.js)
    moveEditApplication(){ 
        const { editApplication} = this.props;
        editApplication();
    }
    // deletes the saved application
    moveDeleteApplication(){ 
        const { deleteApplication } = this.props;
        deleteApplication(); 
    }

    render(){
        let name = this.props.userResource && this.props.userResource.name ? this.props.userResource.name : "John Default";
        let yourApplication;
        let jwt = this.props.userToken ? "Token present [DEBUG]" : "Token not present [DEBUG]"; //
//        if(this.state.appDetails === "empty"){
//            yourApplication = <></>;
//        }else{
            console.log("Look: " + this.props.application);
            yourApplication =   <Card style={{ width: '18rem' }} className="card">
                                    <Card.Img variant="top" src="kimbaa_logo_256.png" />
                                    <Card.Body>
                                        <Card.Title>
                                            {this.props.application.department}
                                        </Card.Title>
                                        <Card.Text >
                                            <Button className="cardButton" onClick={this.moveEditApplication} > Antrag bearbeiten</Button> 
                                            <Button className="cardButton" onClick={this.moveDeleteApplication} > Antrag löschen</Button>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
//        }

        return (
            <>
                <Container className="fLanding">
                    <h1>Willkommen bei kimbaa!</h1>
                    <p> Schön, dich zu sehen, {name}! {jwt}</p>
                    <button className="cardButton" onClick={this.getApplicationDef}>Get Application [DEBUG]</button>
                </Container>
                <Container className="fGrid">
                    <Card style={{ width: '18rem' }} className="card">
                        <Card.Body>
                            <Card.Title>
                                <Button className="cardButton" onClick={this.makeApplication}> Neuen Antrag Anlegen</Button>
                            </Card.Title>
                            <Card.Text>Hier kannst du einen neuen Bachelorantrag erstellen!</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }} className="card">
                        <Card.Body>
                            <Card.Title>Module hochladen</Card.Title>
                            <input type="file" onChange={this.handleFileUpload} accept=".pdf" />
                            <Card.Text>
                                Hier kannst du Module sowie Creditpoints importieren
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }} className="card">
                        <Card.Body>
                            <Card.Title><Button className="cardButton" onClick={this.props.userUpdate}>Nutzerdaten bearbeiten</Button> </Card.Title>
                            <Card.Text>
                                Hier kannst du Details deines Accounts bearbeiten.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    {yourApplication}
                </Container>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    application: navActions.getNavApplicationPageAction,
    userUpdate: navActions.getNavUserEditPageAction,
    deleteApplication: appActions.deleteApplicationAction,
    editApplication: navActions.getNavApplicationEditPageAction,
    getApplication: appActions.getApplicationAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

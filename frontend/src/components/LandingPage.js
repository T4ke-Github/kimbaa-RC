import React, {Component} from "react";
import { Button, Card} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { connect } from "react-redux";
import logger from "../logging/logger";

import { bindActionCreators } from "redux";
import * as navActions from '../actions/NavActions';
import * as appActions from '../actions/ApplicationActions';

const mapStateToProps = state => {
    return {
        userResource: state.auth.userResource,
        application: state.app.application
    }
}

class LandingPage extends Component{
    constructor(props){
        super(props);

        // let userResource = this.props.userResource;
        let application = this.props.application;
        
        this.state = {
            appMatrikel: "",
            appDetails: application.antragZulassungDetails ? application.antragZulassungDetails : "empty"
        }
        this.makeApplication = this.makeApplication.bind(this);
        this.moveEditApplication = this.moveEditApplication.bind(this);
        this.moveDeleteApplication = this.moveDeleteApplication.bind(this);
    }

    makeApplication(){
        const { application } = this.props;
        application();
    }

    componentDidMount(){
        logger.info("LandingPage.js mounted!");
    }


    moveEditApplication(){ 
        const { editApplication, getApplication} = this.props;
        const {appMatrikel} = this.state;
        getApplication(appMatrikel);
        editApplication();
    }

    moveDeleteApplication(){ 
        const { deleteApplication } = this.props;
        deleteApplication(); 
    }


    render(){
        let name = this.props.userResource && this.props.userResource.name ? this.props.userResource.name : "John Default";

        let yourApplication;
        if(this.state.appDetails === "empty"){
            yourApplication = <></>;
        }else{
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
        }

        return (
            <>
                <Container className="fLanding" >
                    <h1>Willkommen bei kimbaa!</h1>
                    <p> Schön, dich zu sehen, {name}!</p>
                </Container>
                <Container className="fGrid">
                    <Card style={{ width: '18rem' }} className="card">
                        <Card.Body>
                            <Card.Title>
                                <Button className="cardButton" onClick={this.makeApplication}> Neuen Antrag Anlegen</Button>
                            </Card.Title>
                            <Card.Text >Hier kannst du einen neuen Bachelorantrag erstellen!</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }} className="card">
                        <Card.Body>
                            <Card.Title><Button className="cardButton"> Module/Creditpoints importieren</Button> </Card.Title>
                                <Card.Text >
                                    Hier kannst du Module sowie Creditpoints importieren
                                </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }} className="card">
                        <Card.Body>
                            <Card.Title><Button className="cardButton" onClick={this.props.userUpdate}>Nutzerdaten bearbeiten</Button> </Card.Title>
                                <Card.Text >
                                    Hier kannst du Details deines Accounts bearbeiten.
                                </Card.Text>
                        </Card.Body>
                    </Card>
                    {yourApplication}
                </Container>
            </>
        )
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



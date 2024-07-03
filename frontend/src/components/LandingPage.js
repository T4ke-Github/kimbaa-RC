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
        playTestApplication: state.app.playTestApplication.antragZulassungDetails,
    }
}

class LandingPage extends Component{
    constructor(props){
        super(props);
        //this.props.
        this.getAntrag = this.getAntrag.bind(this);
        this.showApplication = this.showApplication.bind(this);
        this.editApplication = this.editApplication.bind(this);
        this.deleteApplication = this.deleteApplication.bind(this);
    }

    componentDidMount(){
        logger.info("LandingPage.js mounted!");
    }

    getAntrag(){
        const { antrag } = this.props;
        antrag();
    }

    showApplication(e){
        const { getPTAPage } = this.props;
        getPTAPage();
    }

    editAntrag(antrag){ 
        /* const { editAntragAction } = this.props; 
        editAntragAction("id", antrag); */
        console.log("editAntrag has yet to be implemented");
    }
    deleteAntrag(antrag){ 
        const { deleteAntragAction } = this.props; 
        deleteAntragAction("id", antrag); 
    }


    render(){
        let applicationList = ["medieninformatik", "techinfo"];
        let name = this.props.userResource && this.props.userResource.name ? this.props.userResource.name : "John Default";
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
                                <Button className="cardButton" onClick={this.getAntrag}> Neuen Antrag Anlegen</Button>
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
                    {applicationList.map((antrag, index) => (
                        <Card key={index} style={{ width: '18rem' }} className="card">
                            <Card.Img variant="top" src="kimbaa_logo_256.png" />
                            <Card.Body>
                                <Card.Title>
                                    {antrag}
                                </Card.Title>
                                    <Card.Text >
                                        <Button className="cardButton" onClick={this.editAntrag(antrag)} > Antrag bearbeiten</Button> 
                                        <Button className="cardButton" onClick={this.deleteAntrag(antrag)} > Antrag löschen</Button>
                                    </Card.Text>
                                </Card.Body>
                        </Card>
                    ))}
                </Container>
            </>
        )
    }   
}

const mapDispatchToProps = dispatch => bindActionCreators({
    antrag: navActions.getNavApplicationPageAction,
    userUpdate: navActions.getNavUserEditPageAction,
    getPTAPage: navActions.getNavPlayTestApplicationPage,
    deleteApplication: appActions.deleteApplicationAction,
    // editAntragAction: navActions.editApplicationAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);



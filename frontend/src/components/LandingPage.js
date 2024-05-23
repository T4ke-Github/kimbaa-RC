import React, {Component} from "react";
import { Button, Card} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { connect } from "react-redux";

import * as navActions from '../actions/NavActions';
import { bindActionCreators } from "redux";
//import * as authActions from '../actions/AuthActions';

const mapStateToProps = state => {
    return state;
}

class LandingPage extends Component{
    constructor(props){
        super(props);
        this.getAntrag = this.getAntrag.bind(this);
        //this.editAntrag = this.editAntrag.bind(this);
        //this.deleteAntrag = this.deleteAntrag.bind(this);
    }

    getAntrag(){
        const { antrag } = this.props;
        antrag();
    }

    //editAntrag(antrag){ const { editAntragAction } = this.props; editAntragAction("id", antrag); }
    //deleteAntrag(antrag){ const { deleteAntragAction } = this.props; deleteAntragAction("id", antrag); }

    //import(){}


    render(){
        return (
            <>
                <Container className="fLanding" >
                    <h1>Willkommen bei kimbaa!</h1>
                    <p> Du hast dich erfolgreich eingeloggt, *name* </p>
                </Container>
                <Container className="fGrid">
                    <Card style={{ width: '18rem' }} className="card">
                        <Card.Body>
                            <Card.Title><Button className="cardButton" onClick={this.getAntrag}> Neuen Antrag Anlegen</Button> </Card.Title>
                                <Card.Text >
                                    hier kannst du einen neuen bachelorantrag erstellen
                                </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }} className="card">
                        <Card.Body>
                            <Card.Title><Button className="cardButton"> Module/Creditpoints importieren</Button> </Card.Title>
                                <Card.Text >
                                    hier kannst du Module sowie Creditpoints importieren
                                </Card.Text>
                        </Card.Body>
                    </Card>
                    {['bachelor medieninfo'].map((antrag) => (
                        <Card style={{ width: '18rem' }} className="card">
                            <Card.Img variant="top" src="kimbaa_logo_clean.png" />
                            <Card.Body>
                                <Card.Title>
                                    {antrag}
                                </Card.Title>
                                    <Card.Text >
                                        <Button className="cardButton" > Antrag bearbeiten</Button> 
                                        <Button className="cardButton" > Antrag löschen</Button>
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
    //deleteAntragAction: authActions.deleteAntragAction,
    //editAntragAction: authActions.editAntragAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
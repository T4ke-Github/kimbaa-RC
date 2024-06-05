import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import * as navActions from '../actions/NavActions';

const mapStateToProps = state => {
    return{
        playTestApplication: state.app.playTestApplication.antragZulassungDetails,
    }
}

class PlayTestApplicationPage extends Component{

    constructor(props){
        super(props);

        let pTA = this.props.playTestApplication;

        this.state = {
            studentId: pTA.studentid ? pTA.studentid : "",
            department: pTA.department ? pTA.department : "",
            bachelor: pTA.bachelor ? pTA.bachelor : false,
            master: pTA.master ? pTA.master : false,
            internshipCompleted: pTA.internshipCompleted ? pTA.internshipCompleted : false,
            recognitionApplied: pTA.recognitionApplied ? pTA.recognitionApplied : false,
            modulesCompleted: pTA.modulesCompleted ? pTA.modulesCompleted : false,
            modulesPending: pTA.modulesPending ? pTA.modulesPending : false,
            attachment2Included: pTA.attachment2Included ? pTA.attachment2Included : false,
            topicSuggestion: pTA.topicSuggestion ? pTA.topicSuggestion : false,
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleFuckGoBack = this.handleFuckGoBack.bind(this);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleFuckGoBack(e);
        }
    }

    handleFuckGoBack(e){
        const { getLanding } = this.props;
        getLanding();
    }

    render(){
        return(
            <>
                <style>
                    {`
                        .fBody{
                            background-color: #ea3b07;
                            color: #ffffff;
                        }
                        .formPage{
                            flex-direction: column;
                        }
                    `}
                </style>
                <div className="formPage" onKeyDown={this.handleKeyPress}>
                    <h1>Mein gespeicherter Bachelorantrag</h1>
                    <h2>Bitte nimm zur Kenntnis, dass diese Seite nur zu (Play-)testzwecken existiert und später durch eine Bearbeitungsseite ersetzt wird.</h2>
                    <Form className="fBody">
                        <h3>Matrikelnummer: {this.state.studentId}</h3>
                        <h3>Fachbereich: {this.state.department}</h3>
                        <Form.Check type="checkbox" checked={this.state.bachelor} label="Ich will eine Bachelorarbeit schreiben" />
                        <Form.Check type="checkbox" checked={this.state.master} label="Ich will eine Masterarbeit schreiben" />
                        <Form.Check type="checkbox" checked={this.state.internshipCompleted} label="Mein Praktikum habe ich erfolgreich abgeschlossen" />
                        <Form.Check type="checkbox" checked={this.state.recognitionApplied} label="Meine Praxisphase wurde anerkannt" />
                        <Form.Check type="checkbox" checked={this.state.modulesCompleted} label="Alle relevanten Module wurden abgeschlossen" />
                        <Form.Check type="checkbox" checked={this.state.modulesPending} label="Der Erfolgreiche Abschluss der in Anlage 1 angeführten Module steht noch aus." />
                        <Form.Check type="checkbox" checked={this.state.attachment2Included} label="Die Anlage 2 ist beigefügt." />
                        <Form.Check type="checkbox" checked={this.state.topicSuggestion} label="Ich will kein eigenes Thema vorschlagen" />
                        <Button className="standardButton buttonWidth" onClick={this.handleFuckGoBack}>Zurück</Button>
                    </Form>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getLanding: navActions.getNavLandingAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlayTestApplicationPage);
import React, {Component} from "react";
import { Form, InputGroup } from "react-bootstrap";
import Container from 'react-bootstrap/Container';


class HauptAntragPage extends Component{
    render(){
        return (
           <>
            <Form className="hauptantrag">
                <Form.Group className="hauptantraggruppe">
                    <Form.Label><h2>Zulassung zur Abschlussprüfung im</h2></Form.Label>
                    <Form.Check id="Sommers" label="Sommersemester"/>
                    <Form.Check id="Winters" label="Wintersemester"/>
                </Form.Group>
                <Form.Group className="hauptantraggruppe3">
                    <Form.Label><h3>Persöhnliche Daten</h3></Form.Label>
                    <input className="antragInput" type="text" id="input1" name="Matrikelnr" placeholder="Matrikelnr." />
                    <input type="text" id="input2" name="Fachbereich" placeholder="Fachbereich" />
                </Form.Group>
                <Form.Group className="hauptantraggruppe2">
                    <input type="text" id="input3" name="Name" placeholder="Name" />     
                    <input type="text" id="input4" name="Vorname" placeholder="Vorname" />       
                </Form.Group>
                <Form.Group className="hauptantraggruppe">
                    <input type="text" id="input5" name="Studiengang" placeholder="Studiengang" /> 
                    <Form.Check label="Bachelor"  /> 
                    <Form.Check label="Master"  /> 
                </Form.Group>
                <Form.Group className="hauptantraggruppe2" >
                    <input type="text" id="input7" name="E-Mail" placeholder="E-Mail" />  
                    <input type="text" id="input8" name="Telefon" placeholder="Telefon" /> 
                    <input type="text" id="input9" name="Adresse" placeholder="Adresse" />  
                </Form.Group>
                <Form.Group>
                    <Form.Label><h3>Bitte Zutreffendes ankreuzen</h3></Form.Label>
                    <Form.Group className="hauptantraggruppe">
                        <Form.Check label="Die Praxisphase ist erfolgreich abgeschlossen."  /> 
                        <Form.Check label="Die Anerkennung ist beantragt bzw. erfolgt."  />
                    </Form.Group>
                    <Form.Group className="hauptantraggruppe3">
                        <Form.Check label="Die Praxisphase wird abgeleistet vom"  /> 
                        <input type="text" id="input10" name="Praxisphase" placeholder="" />  
                    </Form.Group>
                    <Form.Check label="Sämtliche Module des Bachelor- oder Masterstudiums sind erfolgreich abgeschlossen."  />
                    <Form.Check label="Der erfolgreiche Abschluss der in Anlage 1 angeführten Module steht noch aus"  /> 
                    <Form.Check label="Die Anlage 2 (mein Vorschlag zum Thema meiner Abschlussarbeit und des/der Betreuers*in) ist beigefügt."  />
                    <Form.Check label="Einen Vorschlag für das Thema und den/die Betreuer*in meiner Abschlussarbeit mache ich nicht. (Vergabe durch den Prüfungsausschuss gewünscht)"  /> 
                </Form.Group>
                <Form.Group>
                    
                </Form.Group>
            </Form>
           </>
        )
    }   
}

export default HauptAntragPage;
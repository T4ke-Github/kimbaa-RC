import React, {Component} from "react";
import { Form, Button } from "react-bootstrap";


class HauptAntragPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            sommers: false,
            winters: false,
            matrikel: "",
            fachbereich:"",
            name:"",
            vorname:"",
            email:"",
            telefon:"",
            adresse:"",
            studiengang:"",
            bachelor:false,
            master:false,
            module:false,
            anlagesa:false,
            anlage2:false,
            nvorschlag:false,
            praxisp:false,
            annerkennung:false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.saveAntrag = this.saveAntrag.bind(this);
        this.handleSemester = this.handleSemester.bind(this);
        this.handleBM = this.handleBM.bind(this);
    }

    handleInputChange(e){
        const { name, value } = e.target;
        this.setState({[name]: value});
    }

    handleCheckbox(e){
        const { name, checked } = e.target;
        this.setState({[name]: checked });
    }

    handleSemester(e){
        const { name, checked } = e.target;
        this.setState({[name]: checked });
        if(name === "winters"){
            this.setState({"sommers": !checked });
        }else if(name === "sommers"){
            this.setState({"winters": !checked });
        }
    }

    handleBM(e){
        const { name, checked } = e.target;
        this.setState({[name]: checked });
        if(name === "bachelor"){
            this.setState({"master": !checked });
        }else if(name === "master"){
            this.setState({"bachelor": !checked });
        }
    }

    saveAntrag(){
        console.log("Antrag was saved with the following parameters:{ sommers: " +this.state.sommers + 
        ", winters: " + this.state.winters + 
        ", matrikel: "+ this.state.matrikel +
        ", fachbereich: " + this.state.fachbereich + 
        ", name: " + this.state.name + 
        ", vorname: " + this.state.vorname + 
        ", email: " + this.state.email + 
        ", telefon: " +  this.state.telefon + 
        ", adresse: " + this.state.adresse + 
        ", studiengang: " + this.state.studiengang + 
        ", bachelor: " + this.state.bachelor + 
        ", master: " + this.state.master + 
        ", module: " + this.state.module + 
        ", anlagesa: " + this.state.anlagesa + 
        ", anlage2: " + this.state.anlage2 + 
        ", nvorschlag: " + this.state.nvorschlag + 
        ", praxisp: " + this.state.praxisp + 
        ", annerkennung: " + this.state.annerkennung + "}")
    }

    render(){
        return (
           <>
            <Form className="hauptantrag">
                <Form.Group className="hauptantraggruppe">
                    <Form.Label><h2>Zulassung zur Abschlussprüfung im</h2></Form.Label>
                    <Form.Check name="sommers" label="Sommersemester" checked={this.state.sommers} onChange={this.handleSemester} />
                    <Form.Check name="winters" label="Wintersemester" checked={(this.state.winters)} onChange={this.handleSemester} />
                </Form.Group>
                <Form.Group className="hauptantraggruppe3">
                    <Form.Label ><h3>Persöhnliche Daten</h3></Form.Label>
                    <Form.Label >Matrikelnr.</Form.Label><input type="number" name="matrikel" value={this.state.matrikel} placeholder=" "  onChange={this.handleInputChange} />
                    <Form.Label>Fachbereich</Form.Label><input type="text" name="fachbereich" value={this.state.fachbereich}  placeholder=" " onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group className="hauptantraggruppe3">
                    <Form.Label>Name</Form.Label><input type="text" name="name"  value={this.state.name} placeholder="" onChange={this.handleInputChange} />     
                </Form.Group>
                <Form.Group className="hauptantraggruppe3">
                    <Form.Label>Vorname</Form.Label><input type="text" name="vorname" value={this.state.vorname} placeholder=" " onChange={this.handleInputChange} />       
                </Form.Group>
                <Form.Group className="hauptantraggruppe">
                    <input type="text" name="studiengang"  placeholder="Studiengang" value={this.state.studiengang} onChange={this.handleInputChange} /> 
                    <Form.Check label="Bachelor"  name="bachelor" checked={this.state.bachelor}  onChange={this.handleBM} /> 
                    <Form.Check label="Master"  name="master" checked={this.state.master}  onChange={this.handleBM} /> 
                </Form.Group>
                <Form.Group className="hauptantraggruppe3" >
                    <Form.Label>E-Mail</Form.Label><input type="text" name="email"  value={this.state.email} placeholder="" onChange={this.handleInputChange} />  
                </Form.Group>
                <Form.Group className="hauptantraggruppe3">
                    <Form.Label>Telefon</Form.Label><input type="text" name="telefon" value={this.state.telefon} placeholder="" onChange={this.handleInputChange} /> 
                </Form.Group>
                <Form.Group className="hauptantraggruppe3">    
                    <Form.Label>Adresse</Form.Label><input type="text" name="adresse" value={this.state.adresse} placeholder="" onChange={this.handleInputChange} />  
                </Form.Group>
                <Form.Group>
                    <Form.Label><h3>Bitte Zutreffendes ankreuzen</h3></Form.Label>
                    <Form.Group className="hauptantraggruppe">
                        <Form.Check label="Die Praxisphase ist erfolgreich abgeschlossen." name="praxisp" value={this.state.praxisp}  onChange={this.handleCheckbox} /> 
                        <Form.Check label="Die Annerkennung ist beantragt bzw. erfolgt."  name="annerkennung" value={this.state.annerkennung}  onChange={this.handleCheckbox}/>
                    </Form.Group>
                    <Form.Group className="hauptantraggruppe3">
                        <Form.Check label="Die Praxisphase wird abgeleistet vom:"  /> 
                        <input type="text" name="Praxisphase" placeholder="" />  
                    </Form.Group>
                    <Form.Check label="Sämtliche Module des Bachelor- oder Masterstudiums sind erfolgreich abgeschlossen." name="module" value={this.state.module}  onChange={this.handleCheckbox} />
                    <Form.Check label="Der erfolgreiche Abschluss der in Anlage 1 angeführten Module steht noch aus" name="anlagesa" value={this.state.anlagesa}  onChange={this.handleCheckbox} /> 
                    <Form.Check label="Die Anlage 2 (mein Vorschlag zum Thema meiner Abschlussarbeit und des/der Betreuers*in) ist beigefügt." name="anlage2" value={this.state.anlage2}  onChange={this.handleCheckbox} />
                    <Form.Check label="Einen Vorschlag für das Thema und den/die Betreuer*in meiner Abschlussarbeit mache ich nicht. (Vergabe durch den Prüfungsausschuss gewünscht)" name="nvorschlag" value={this.state.nvorschlag}  onChange={this.handleCheckbox} /> 
                </Form.Group>
                <Form.Group className="hauptantraggruppe3">
                    <Button className="cardButton" onClick={this.saveAntrag}> Antrag Speichern </Button>
                    <Button className="cardButton" > Antrag Überprüfen </Button>
                </Form.Group>
            </Form>
           </>
        )
    }   
}

export default HauptAntragPage;
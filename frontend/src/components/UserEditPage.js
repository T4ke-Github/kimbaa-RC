import React, {createRef, Component} from "react";
import { connect } from "react-redux";

import * as navActions from '../actions/NavActions';
import { bindActionCreators } from "redux";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const mapStateToProps = state => {
    return{
        userResource: state.auth.userResource
    }
}

class UserEditPage extends Component{
    
    constructor(props){
        super(props);
        
        let userResource = this.props.userResource;

        this.state = {
            uEName: userResource.name ? userResource.name : "",
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        const { name, value } = e.target;
        this.setState({[name]: value});
    }

    render(){
        return(
            <>
                <style>
                    {`
                        .itemInlineRow{
                            display: flex;
                            flex-direction: row;
                        }
                        .itemInlineColumn{
                            display: flex;
                            flex-direction: column;
                        }
                        label{
                            margin-right: 2vw;
                        }
                        input{
                            margin-top: 8px;
                            margin-left: 10px;
                        }
                        .textInput{
                            height: 24px;
                            border-radius: 12px;
                            border: none;
                            padding: 2px;
                            padding-left: 3px;
                            padding-right: 3px;
                            margin-right: 5vw;
                        }
                        .tiSmall{
                            width: 15vw;
                        }
                        .tiNarrow{
                            width: 25vw;
                        }
                        .tiWide{
                            width: calc(45vw + 16px);
                        }
                        .gapTop{
                            margin-top: 20px;
                        }
                        .buttonWidth{
                            width: 15vw;
                        }
                        .aCancel{
                            background-color: #ea3b07;
                            color: #ffffff;
                            margin-right: 17vw;
                        }
                        .aCancel:hover{
                            background-color: #ffffff;
                            color: #ea3b07;
                        }
                        .diaContent{
                            margin-left: 1vw;
                            margin-right: 1vw;
                        }
                        .dia{
                            width: 12vw;
                        }
                        .dLeft{
                            margin-right: 3vw;
                        }
                    `}
                </style>
                <div className="mainApplicationPAge">
                    <h1>Nutzerdaten bearbeiten & ergänzen</h1>
                    <Form className="mainApplicationForm">
                        <Form.Group controlId="details" className="itemInlineColumn">
                            <Form.Label>Ergänze oder ändere hier deine persönlichen Daten. Die Daten können genutzt werden, um deinen Bachelorantrag z.T. vorauszufüllen.</Form.Label>
                            <input className="textInput tiWide" type="text" placeholder="Name" name="uEName" value={this.state.uEName} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="SubmitOrLeave" className="spaceTop spaceBottom">
                            <div className="itemInlineRow">
                                <Button className="standardButton buttonWidth aCancel" onClick={this.props.moveToLanding}>Abbrechen</Button>
                                <Button className="standardButton buttonWidth">Speichern</Button>
                            </div>
                        </Form.Group>
                    </Form>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    moveToLanding: navActions.getNavLandingAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserEditPage);
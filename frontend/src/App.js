import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux';

import TopMenu from './components/TopMenu';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';

const mapStateToProps = state => {
  return state;
}

class App extends Component{
  render(){
    const page = this.props.page;
    let workspace;

    switch (page){
      case "land":
        workspace = <LandingPage />
        break;
      case "login":
        workspace = <LoginPage />
        break;
      case "registration":
        workspace = <RegistrationPage />
        break;
      default:
        workspace = <LoginPage />
    }

    return (
      <div className='App'>
        <TopMenu />
        { workspace }
      </div>
    )
  }
}

export default connect(mapStateToProps)(App);
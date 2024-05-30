import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux';

import TopMenu from './components/TopMenu';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import HauptAntragPage from './components/HauptAntragPage';

const mapStateToProps = state => {
  return {
    page: state.root.page
  };
}

class App extends Component{
  render(){
    const page = this.props.page;
    let workspace;

    switch (page){
      case "landing":
        workspace = <LandingPage />
        break;
      case "login":
        workspace = <LoginPage />
        break;
      case "registration":
        workspace = <RegistrationPage />
        break;
      case "application":
        workspace =  <HauptAntragPage />
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
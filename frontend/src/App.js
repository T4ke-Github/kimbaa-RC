import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux';

import TopMenu from './components/TopMenu';
import LoggedDemo from './components/LoggedDemo'
import LoginPage from './components/LoginPage';

const mapStateToProps = state => {
  return state;
}

class App extends Component{
  render(){
    const page = this.props.page;
    let workspace;

    switch (page){
      case "land":
        workspace = <LoggedDemo />
      case "logged":
        workspace = <LoginPage />
      default:
        workspace = <LoggedDemo />
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
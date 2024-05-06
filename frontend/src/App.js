import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux';

import TopMenu from './components/TopMenu';
import LoggedDemo from './components/LoggedDemo'
import LandingDemo from './components/LandingDemo';

const mapStateToProps = state => {
  return state;
}

class App extends Component{
  render(){
    const loggedIn = this.props.loggedIn;
    let workspace;
    if(loggedIn){
      workspace = <LoggedDemo />
    }else{
      workspace = <LandingDemo />
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
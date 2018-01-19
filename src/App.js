import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import ConversationsList from './components/ConversationsList'

class App extends Component {
  render() {
    return(
      <div className="App">
        {/*
          <Navbar />
          <Main />
        */}
        <ConversationsList />
      </div>
    );
  }
}

export default App;

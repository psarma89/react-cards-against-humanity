import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { Redirect } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Room from './components/Room'
import {AuthAdapter} from './components/Adapter'


class App extends Component {
  constructor(){
    super()

    this.state = {
      auth: {
        isLoggedIn: false,
        user: ''
      }
    }

    if (localStorage.getItem('token')) {
     AuthAdapter.currentUser()
     .then(user => {
       if (!user.error) {
         console.log("fetch user");
         this.setState({
           auth: {
             isLoggedIn: true,
             user: user
           }
         });
         <Redirect to="/home" />
       }
     })
   }

  }

  signInForm = (username, password) => {
    AuthAdapter.login({username: username, password: password})
    .then( user => {
      if(!user.error){
        this.setState({auth: {isLoggedIn: true, user: user}});
        localStorage.setItem('token', user.token);
      } else{
        alert('Failed')
      }
    })
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({auth: {
      isLoggedIn: false,
      user: ''
    }});
    <Redirect to="/" />
  }

  render() {
    console.log(this.state.auth.isLoggedIn)
    return (
      <div>
        <Navbar handleLogout={this.handleLogout}/>
        <Switch>
          <Route exact path='/' render={()=> {
            return (this.state.auth.isLoggedIn ? <Redirect to="/home" /> : <Login handleForm={this.signInForm} />)
          }}/>
          <Route exact path='/home' render={()=>{
            return (this.state.auth.isLoggedIn ? <Home /> : <Redirect to="/" />)
          }}/>
          <Route exact path='/room/:id' render={(props) => {
            return (this.state.auth.isLoggedIn ? <Room {...props} /> : "FALSE")
          }}/>
        </Switch>
      </div>
    );
  }
}

export default App;

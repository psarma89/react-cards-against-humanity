import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { Redirect } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
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

  handleFormSignup = (username, password, passwordConfirm) => {
    AuthAdapter.signup({user: {username: username, password: password, password_confirmation: passwordConfirm}})
    .then(user => {
      if(!user.error){
        this.setState({auth: { isLoggedIn: true, user: user}})
        localStorage.setItem('token', user.token)
      }
    })
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({auth: {
      isLoggedIn: false,
      user: ''
    }});
    <Redirect to="/login" />
  }

  render() {

    return (
      <div className="App">
        <Navbar isloggedIn={this.state.auth.isLoggedIn} handleLogout={this.handleLogout}/>

        <div id="content" className="ui container">
          <Switch>
            <Route exact path='/' render={() => {
              return (<Redirect to="/login" />)
            }}/>
            <Route exact path='/login' render={()=> {
              return (this.state.auth.isLoggedIn ? <Redirect to="/home" /> : <Login handleForm={this.signInForm} />)
            }}/>
            <Route exact path='/home' render={()=>{
              return (this.state.auth.isLoggedIn ? <Home /> : <Redirect to="/login" />)
            }}/>
            <Route exact path='/room/:id' render={(props) => {
              return (this.state.auth.isLoggedIn ? <Room {...props} /> : "FALSE")
            }}/>
            <Route exact path='/signup' render={() => {
              return (this.state.auth.isLoggedIn ? <Redirect to="/home" /> : <Signup handleForm={this.handleFormSignup} />)
            }}/>
          </Switch>

        </div>
      </div>
    );
  }
}

export default App;

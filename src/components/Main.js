import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import AuthAdapter from './Adapter'


class Main extends Component{

  constructor(){
    super()

    this.state = {
      auth: {
        isLoggedIn: false,
        user: ''
      }
    }
  }

  componentWilMount(){
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
           })
         }
       })
     }
   }

  handleFormLogin = (username, password) => {
    AuthAdapter.login({username: username, password: password})
    .then( user => {
      if(!user.error){
        this.setState({auth: { isLoggedIn: true, user: user}})
        localStorage.setItem('token', user.token)
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
    localStorage.removeItem('token')
    this.setState({ auth: { isLoggedIn: false, user:{}}})
  }

  render(){

    return(
      <Switch>
        <Route path='/login' render={()=> {
          return (<Login handleFormLogin={this.handleFormLogin} handleLogout={this.handleLogout}/>)
        }}/>
      <Route path='/signup' render={()=> {
          console.log(this.state)
          console.log(localStorage)
          return (<Signup handleFormSignup={this.handleFormSignup} />)
        }}/>

      </Switch>
    )}
}

export default Main

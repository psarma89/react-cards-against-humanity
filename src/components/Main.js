import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
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

  handleForm = (username, password) => {
    AuthAdapter.login({username: username, password: password})
    .then( user => {
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
    console.log(this.state.auth)
    console.log(localStorage.getItem('token'))
    return(
      <Switch>
        <Route path='/' render={()=> {
          return (<Login handleForm={this.handleForm} handleLogout={this.handleLogout}/>)
        }}/>
      </Switch>
    )}
}

export default Main

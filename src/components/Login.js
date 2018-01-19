import React, {Component} from 'react'
import { Redirect } from 'react-router'
import AuthAdapter from './Adapter'

class Login extends Component{

  constructor(){
    super()

    this.state = {
      username: '',
      password: ''
    }
  }

  handleUsername = (event) => {
    this.setState({username: event.target.value})
  }

  handlePassword = (event) => {
    this.setState({password: event.target.value})
  }

  handleForm = (event) => {
    event.preventDefault()
    this.props.handleForm(this.state.username, this.state.password)
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleForm}>
          <input type="text" onChange={this.handleUsername} />
          <br></br>
          <input type="password" onChange={this.handlePassword} />
          <button type="Submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Login

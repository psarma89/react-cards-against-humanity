import React, {Component} from 'react'

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
      <form onSubmit={this.handleForm} className= "ui form">
        <div className="field">
          <label>Username</label>
          <input onChange={this.handleUsername} placeholder="username" type="text" />
        </div>
        <div className="field">
          <label>Password</label>
          <input onChange={this.handlePassword} placeholder="password" type="password" />
        </div>
        <button className="ui submit button" type="submit">Submit</button>
      </form>

    )
  }
}

export default Login

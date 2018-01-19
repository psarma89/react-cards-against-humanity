import React, {Component} from 'react'

class Signup extends Component{

  constructor(){
    super()

    this.state = {
      username: '',
      password: '',
      passwordConfirm: ''
    }
  }

  handleUsername = (event) => {
    this.setState({username: event.target.value})
  }

  handlePassword = (event) => {
    this.setState({password: event.target.value})
  }

  handlePasswordConfirm = (event) => {
    this.setState({passwordConfirm: event.target.value})
  }

  handleForm = (event) => {
    event.preventDefault()
    this.props.handleFormSignup(this.state.username, this.state.password, this.state.passwordConfirm)
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
        <div className="field">
          <label>Password Confirmation</label>
          <input onChange={this.handlePasswordConfirm} placeholder="password confirmation" type="password" />
        </div>
        <button className="ui submit button" type="submit">Submit</button>
      </form>

    )
  }
}

export default Signup;

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
      <div>
        <form onSubmit={this.handleForm}>
          <input type="text" onChange={this.handleUsername} />
          <br></br>
          <input type="password" onChange={this.handlePassword} />
          <br></br>
          <input type="password" onChange={this.handlePasswordConfirm} />
          <button type="Submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Signup;

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
      <div>
        <form onSubmit={this.handleForm}>
          <input type="text" onChange={this.handleUsername} />
          <br></br>
          <input type="password" onChange={this.handlePassword} />
          <button type="Submit">Submit</button>
        </form>
        <button onClick={this.props.handleLogout}>Logout</button>
      </div>
    )
  }
}

export default Login

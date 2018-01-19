import React, { Component } from 'react'

class Navbar extends Component{
  render(){
    return(
      <button onClick={this.props.handleLogout}>Logout</button>
    )
  }
}

export default Navbar

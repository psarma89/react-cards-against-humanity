import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Navbar extends Component{
  render(){
    return(
      <div className="ui top fixed menu inverted">
        <div className="item">
          <img src="https://i.ytimg.com/vi/iEV_bCe4VUk/maxresdefault.jpg" alt="cards logo"/>
        </div>

        <div className="item">Cards Against Humanity..sort of
        </div>

        <div className="right menu">
          {this.props.isloggedIn ? (
            <div className="item">
              <Link to="/home" className="item">
                <div className="ui button">Homepage</div>
              </Link>

              <button onClick={this.props.handleLogout}
              className="ui button">Log Out</button>
            </div>
          ) : (
            <div className="item">
              <Link to="/login" className="item">
                <div className="ui button">Log In</div>
              </Link>
              <Link to="/signup" className="item">
                <div className="ui button">Sign Up</div>
              </Link>
            </div>

          )}

        </div>
      </div>

    )
  }
}

export default Navbar

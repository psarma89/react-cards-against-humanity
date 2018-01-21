import React, {Component} from 'react'
import {RoomAdapter} from './Adapter';
import { Redirect } from 'react-router';

class NewRoom extends Component{
  constructor(){
    super()
    this.state = {
      roomName: '',
      redirect: ''
    }
  }

  handleForm = (event) => {
    event.preventDefault()
    RoomAdapter.createRoom({roomName: this.state.roomName})
    .then(resp => {
      this.setState({redirect: resp.id})
    })
  }

  render(){
    if(this.state.redirect.length>0){
      return (<Redirect to={"/room/" + this.state.redirect} />) //Is there a better way to do this?
    }
    return(

      <form className= "ui form" onSubmit={this.handleForm}>
        <div className="field">
          <label>New Room</label>
          <input placeholder="Room Name" type="text" onChange={(e) => this.setState({roomName: e.target.value})}/>
        </div>
        <button className="ui submit button" type="submit">Create</button>
      </form>
    )
  }
}

export default NewRoom

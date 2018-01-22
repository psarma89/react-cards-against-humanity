import React, {Component} from 'react'
import {RoomAdapter, UserAdapter} from './Adapter'

class Room extends Component{
  constructor(props){
    super(props)

    this.state = {
      userHand: ''
    }
    RoomAdapter.connectRoom(props.match.params.id)
    .then(resp => {
      UserAdapter.getHand(resp.hand).then(resp => this.setState({userHand: resp}))
    })

  }

  render(){
    console.log(this.state.userHand)
    return(
      <div>
        <h1>Testing</h1>
      </div>
    )
  }
}

export default Room

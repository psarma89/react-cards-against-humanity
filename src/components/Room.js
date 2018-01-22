import React, {Component} from 'react'
import {RoomAdapter, UserAdapter} from './Adapter'
import Card from './Card'
import { Link } from 'react-router-dom';

class Room extends Component{
  constructor(props){
    super(props)

    this.state = {
      userHand: '',
      playerReady: false,
      roomReady: false
    }
    RoomAdapter.connectRoom(props.match.params.id)
    .then(resp => {
      console.log(resp.hand[0].hand)
      UserAdapter.getHand(resp.hand[0].hand).then(resp => this.setState({userHand: resp}))
    })

  }

  handleCards = () => {
    let userHand = this.state.userHand
    if(userHand.length > 0){
      return userHand.map((card) => {
        return (<Card card={card} />)
      })
    }
  }

  readyPlayer = () => {
    UserAdapter.readyPlayer({roomId: this.props.match.params.id})
    this.setState({ready: true})
  }

  render(){
    console.log(this.state.userHand)
    return(
      <div>
        <h1>Testing</h1>
        <div className="four wide column">
          <button onClick={this.readyPlayer}>Ready</button>
        </div>
        <br></br>
        <div className="ui grid container twelve wide column">
          {this.handleCards()}
        </div>
      </div>
    )
  }
}

export default Room

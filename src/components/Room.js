import React, {Component} from 'react'
import {RoomAdapter, UserAdapter} from './Adapter'
import Card from './Card'
import BlackCard from './BlackCard'
import { Link } from 'react-router-dom';

class Room extends Component{
  constructor(props){
    super(props)

    this.state = {
      userHand: '',
      blackCard: '',
      roomReady: false
    }

    RoomAdapter.connectRoom(props.match.params.id)
    .then(resp => {
      console.log(resp)
      UserAdapter.getHand(resp.hand).then(resp => this.setState({userHand: resp}))
    })
  }

  handleCards = () => {
    let userHand = this.state.userHand
    if(userHand && userHand.length > 0){
      return userHand.map((card) => {
        return (<Card card={card} />)
      })
    }
  }

  handleWebSocket = response => {
    this.setState({
      
    })
  }

  readyPlayer = () => {
    UserAdapter.readyPlayer({roomId: this.props.match.params.id}).then(resp => {
      console.log(resp)
      if(resp.roomReady){
        this.setState({roomReady: true})
      }
    })
    //this.setState({roomReady: true})
  }

  render(){
    return(
      <div>
        <div className="ui button" onClick={this.readyPlayer}>Ready
        </div>

        <br></br>
        <h3>Your Hand:</h3>

        <div className="ui six column grid">
          {this.handleCards()}
        </div>

        <br></br>
        <h3>Blackcard</h3>

        {this.state.blackCard ?
            <div className="ui one column grid">
              <BlackCard card={{id: 1, text: "This is a blackcard"}} />
            </div> : null
        }
      </div>
    )
  }
}

export default Room

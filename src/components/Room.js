import React, {Component} from 'react'
import {RoomAdapter, UserAdapter, AuthAdapter} from './Adapter'
import Card from './Card'
import BlackCard from './BlackCard'
import { Link } from 'react-router-dom';
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

const sampleRoom = {
    "id" : "5a674a719501ebf24ffc4e80",
    "roomReady" : true,
    "title" : "Chris' Room",
    "players" : [
        {
            "userId" : "5a66137a79fb55bc46fac60c",
            "ready" : false,
            "username" : "chris198"
        },
        {
            "userId" : "5a6625ad37fd89e90f894cb2",
            "ready" : true,
            "username" : "cjohnson"
        },
        {
            "userId" : "5a65f96c7f0359cb039b91de",
            "ready" : true,
            "username" : "patrick"
        },
        {
            "ready" : false
        }
    ],
    "currentTurn" : {
        "userId" : "5a66137a79fb55bc46fac60c",
        "blackCard" : {id: 1, text: "This is a blackcard"},
        "pickedCards" : [],
        "currentHands" : [
            {
                "userId" : "5a65f15ac2c99193b69c3647",
                "hand" : [
                    258,
                    6,
                    443,
                    311,
                    8
                ]
            },
            {
                "userId" : "5a6625ad37fd89e90f894cb2",
                "hand" : [
                    83,
                    403,
                    233,
                    422,
                    229
                ]
            },
            {
                "userId" : "5a65f96c7f0359cb039b91de",
                "hand" : [
                    137,
                    392,
                    292,
                    287,
                    226
                ]
            },
            {
                "hand" : [
                    233,
                    454,
                    93,
                    280,
                    28
                ]
            }
        ]
    },
    "graveYard" : {
        "blackCards" : [],
        "whiteCards" : []
    }
}
const userHand1 =
[{id: 37, text: "Cheating in the Special Olympics."},{id: 38, text: "German dungeon porn."},{id: 118, text: "Five-Dollar Footlongs&trade;."},{id: 219, text: "Altar boys."},{id: 393, text: "Passive-aggressive Post-it notes."}]

class Room extends Component{
  constructor(props){
    super(props)

    this.state = {
      room: sampleRoom,
      userHand: userHand1,
      userLoggedIn: ''
    }

  }

  componentDidMount(){

    AuthAdapter.currentUser().then(resp => {
      // console.log(resp.response.data.user.id)
      this.setState({userLoggedIn: resp.response.data.user.id}, () => console.log(this.state))
    })
    // var io = sailsIOClient(socketIOClient);
    // io.sails.useCORSRouteToGetCookie = false;
    // io.sails.url = 'http://localhost:1337';
    // io.socket.get('/api/v1/rooms/subscribe', {roomID: this.props.match.params.id}, (data, jwr) => {
    //   console.log('what is my data', data)
    //   UserAdapter.getHand(data.hand).then(resp => this.setState({userHand: resp, room: data.roomData}, () => console.log(this.state)))
    // })
    // io.socket.on("room", (event) => {
    //   switch (event.verb) {
    //   case 'updated':
    //     console.log(event);
    //     this.setState({room: event.data}, () => console.log(this.state))
    //     break;
    //   default:
    //     console.warn('Unrecognized socket event (`%s`) from server:',event.verb, event);
    //   }
    // })
  }

  handleCards = () => {
    let userHand = this.state.userHand
    if(userHand && userHand.length > 0){
      return userHand.map((card) => {
        return (<Card key={card.id} card={card} />)
      })
    }
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

  currentTurnUser = () => {
    return this.state.userLoggedIn === this.state.room.currentTurn.currentUser
  }

  render(){
    return(
      <div>
        <div className="ui button" onClick={this.readyPlayer}>Ready
        </div>

        <br></br>

        <div>{"Whose Turn is it: " + this.state.room.players.find(player => {return player.userId === this.state.room.currentTurn.userId}).username
        }
        </div>

        <br></br>
        <h3>Your Hand:</h3>

        <div className="ui six column grid">
          {this.handleCards()}
        </div>

        <br></br>
        <h3>Blackcard</h3>

        {this.state.room.roomReady ?
            <div className="ui one column grid">
              <BlackCard card={this.state.room.currentTurn.blackCard} />
            </div> : null
        }
      </div>
    )
  }
}

export default Room

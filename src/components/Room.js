import React, {Component} from 'react'
import {RoomAdapter, UserAdapter, AuthAdapter} from './Adapter'
import Card from './Card'
import BlackCard from './BlackCard'
import { Link } from 'react-router-dom';
var _ = require('lodash');
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

class Room extends Component{
  constructor(props){
    super(props)

    this.state = {
      userHand: '',
      userLoggedIn: ''
    }

  }

  componentDidMount(){

    AuthAdapter.currentUser().then(resp => {
        // console.log(resp.response.data.user.id)
        this.setState({userLoggedIn: resp.response.data.user.id})
      })
      var io = sailsIOClient(socketIOClient);
      io.sails.useCORSRouteToGetCookie = false;
      io.sails.headers = {'Authorization': localStorage.getItem('token')}
      io.sails.url = 'http://192.168.4.196:1337';
      io.socket.get('/api/v1/rooms/subscribe', {roomID: this.props.match.params.id}, (data, jwr) => {
        // console.log('what is my data', data)

        //console.log(data.roomData.players.find((player) => {return player.userId == this.state.userLoggedIn})

      })
      io.socket.on("room", (event) => {
        switch (event.verb) {
        case 'updated':

        event.data.roomData.currentTurn.currentHands.find((player) => {
          if(player.userId === this.state.userLoggedIn){
            UserAdapter.getHand(player.hand).then(resp => this.setState({userHand: resp, room: event.data}))
          }
        })
          break;
        default:
          console.warn('Unrecognized socket event (`%s`) from server:',event.verb, event);
        }
      })
  }

  handleCards = () => {
    let userHand = this.state.userHand
    if(userHand && userHand.length > 0){
      return userHand.map((card) => {
        return (<Card key={card.id}  currentUser={this.currentTurnUser()} handleCardClick={this.handleCardClick} card={card} />)
      })
    }
  }

  handlePickedCards = () => {
    let pickedCards = this.state.room.roomData.currentTurn.pickedCards
    if(pickedCards && pickedCards.length > 0){
      return pickedCards.map((card) => {
        return (<Card key={card.id}  currentUser={!this.currentTurnUser()} handleCardClick={() => {}} card={card} />)
      })
    }
  }

  handleCardClick = (cardID) => {
    let room = this.state.room
    if(room.roomData.roomReady && room.roomData.currentTurn.pickedCards.filter(userPick => userPick.userId == this.state.userLoggedIn).length < room.roomData.currentTurn.pick){
      //Step 1: Add card to pickedCards
      room.roomData.currentTurn.pickedCards.push({userId: this.state.userLoggedIn, card: cardID})
      //Step 2: Delete Card from hand

      room.roomData.currentTurn.currentHands.map(player => {

        if(player.userId == this.state.userLoggedIn){
          _.pull(player.hand, cardID)
          let currentHand = room.roomData.currentTurn.currentHands.filter(player => player.userId == this.state.userLoggedIn)[0].hand.length
          for(currentHand; currentHand < 5; currentHand++) {
            player.hand.push(_.random(0,460))
          }
        }
      })

      //Step 3: Submit new room object to /api/v1/submit
      fetch('http://25.57.52.41:1337/api/v1/rooms/submit',{
        method: "POST",
        headers: {
          'Content-type':'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify({room: room})
      })
      //Should hit socket when complete
    }
  }

  readyPlayer = () => {
    UserAdapter.readyPlayer({roomId: this.props.match.params.id}).then(resp => {
      console.log(resp)
      // console.log(this.state.room)
      if(resp.data){
        this.setState({room: resp.data}, () => console.log(this.state.room))
      }
    })
    //this.setState({roomReady: true})
  }

  currentTurnUser = () => {
    return this.state.userLoggedIn === this.state.room.roomData.currentTurn.userId
  }

  whoseTurnIsIt = () => {
    const currentTurnId = this.state.room.roomData.currentTurn.userId;
    const foundUser = this.state.room.roomData.players.find(player => {
      return player.userId === currentTurnId
    })
    // console.log(currentTurnId, foundUser)
    // const coolBeans = {"username": "someValue"}
    return foundUser
  }

  render(){

    console.log(this.state.room)
    return(
      <div>
        <div className="ui button" onClick={this.readyPlayer}>Ready
        </div>

        <br></br>

      {this.state.room && this.state.room.roomData.roomReady ?
        <h3>{this.whoseTurnIsIt() ? `Whose Turn is it: ${this.whoseTurnIsIt().username}` : "ghost"}</h3>
        : <h3>Room Not Ready. Dilly Dilly</h3>
      }

        <h3>Your Hand:</h3>

        <div className="ui six column grid">
          {this.handleCards()}
        </div>

        <br></br>
        <br></br>

        {this.state.room && this.state.room.roomData.roomReady ?
          <div className="ui one column grid">
            <h3>Blackcard: Pick {this.state.room.roomData.currentTurn.pick}</h3>
            <BlackCard card={this.state.room.roomData.currentTurn.blackCard} />
          </div> : null
        }

        <br></br>

        {this.state.room && this.state.room.roomData.currentTurn.pickedCards.length > 0 ?
        <div className="ui six column grid">
          <h3>Picked Cards</h3>
          {this.handlePickedCards()}
        </div> : null
        }


      </div>
    )
  }
}

export default Room

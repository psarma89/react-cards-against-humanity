import React, {Component} from 'react';
//HOORAY!

const baseUrl = 'http://192.168.4.196:1337/api/v1'

export class AuthAdapter {
  static login(loginParams) {
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static signup(signupParams) {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(signupParams)
    })
    .then(res => res.json())
  }

  static allUsers() {
    return fetch(`${baseUrl}/user`, {
      headers: headers()
    })
    .then(res => res.json())
  }

  static currentUser() {
    return fetch(`${baseUrl}/current_user`, {
      headers: headers()
    })
    .then(res => res.json())
  }

  static userInfo(id) {
    return fetch(`${baseUrl}/user/${id}`, {
      headers: headers()
    })
    .then(res => res.json())
  }
}

export class RoomAdapter{
  static submitRoom(payload){
    return fetch(`${baseUrl}/rooms/submit`,{
      method: "POST",
      headers: {
        'Content-type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({room: payload})
    })
  }

  static submitRoom(payload){
   return fetch(`${baseUrl}/rooms/submit`,{
     method: "POST",
     headers: {
       'Content-type':'application/json',
       'Accept':'application/json'
     },
     body: JSON.stringify({room: payload})
   })
 }

  static createRoom(payload){
    return fetch(`${baseUrl}/rooms/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
  }

  static getRooms(){
    return fetch(`${baseUrl}/rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then(resp => resp.json())
  }

  static connectRoom(roomId){
    return fetch(`${baseUrl}/room/${roomId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({userId: localStorage.getItem('token')})
    })
    .then(resp => resp.json())
  }

}

export class UserAdapter{
  static getHand(payload){
    return fetch(`${baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({cardArray: payload})
    })
    .then(resp => resp.json())
  }

  static readyPlayer(payload){
    return fetch(`${baseUrl}/rooms/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(payload)
    })
    .then(resp => resp.json())
  }
}


function headers () {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('token')
  }
}

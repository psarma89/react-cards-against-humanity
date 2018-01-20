import React, {Component} from 'react';
//HOORAY!

const baseUrl = 'http://25.58.9.122:1337/api/v1'

export class AuthAdapter {
  static login (loginParams) {
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static signup (signupParams) {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(signupParams)
    }).then(res => res.json())
  }

  static currentUser () {
    return fetch(`${baseUrl}/current_user`, {
      headers: headers()
    }).then(res => res.json())
  }
}

function headers () {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('token')
  }
}

export class RoomAdapter{
  static getRooms(){
    return fetch(`${baseUrl}/rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(resp => resp.json())
  }

  static connectRoom(roomId){
    return fetch(`${baseUrl}/joinroom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({userId: localStorage.getItem('token'), roomId: roomId})
    })
  }

}

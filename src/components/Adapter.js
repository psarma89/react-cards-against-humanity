import React, {Component} from 'react'

const baseUrl = 'http://192.168.4.103:3000/api/v1/'

export class AuthAdapter {
  static login (loginParams) {
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static currentUser () {
    return fetch(`${baseUrl}current_user`, {
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

}

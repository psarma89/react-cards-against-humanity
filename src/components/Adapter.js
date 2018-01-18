import React, {Component} from 'react'

const baseUrl = 'http://25.77.145.33:3000/api/v1/'

export default class AuthAdapter {
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

import React, {Component} from 'react'

const baseUrl = 'http://192.168.4.103:3000/api/v1';
export const API_WS_ROOT = 'ws://192.168.4.103:3000/cable';

export default class AuthAdapter {
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

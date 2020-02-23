import React, { Component } from 'react'
import LoginPage from './LoginPage';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      isogin: false
    }
  }
  render() {
    if (!this.state.isogin) {
      return <LoginPage />
    }
    return (
      <div>
        <button className="btn btn-danger" href="/">Home</button>
      </div>
    )
  }
}

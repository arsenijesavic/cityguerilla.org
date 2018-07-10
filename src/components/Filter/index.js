import React, { Component } from 'react'
class Filter extends Component {
  render() {
    const actions = {}
    const state = { ...this.state }
    return this.props.children({ actions, state })
  }
}

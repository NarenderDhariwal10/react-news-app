import React, { Component } from 'react'
import loader from './loader.gif'

export class spinner extends Component {
  render() {
    return (
      <div className='text-center'>
          <img src={loader} alt="Loading" />
      </div>
    )
  }
}

export default spinner

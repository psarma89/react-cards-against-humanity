import React, {Component} from 'react'

class Room extends Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div>
        {this.props.match.params.id}
      </div>
    )
  }
}

export default Room

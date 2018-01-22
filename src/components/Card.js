import React, {Component} from 'react'

class Card extends Component{
  render(){
    return(

      <div className="column">
        <div className="ui link card" style={{minHeight: "30vh", margin: "2px"}}>
          <div className="content">
            <div className="header">{this.props.card.text}</div>
          </div>

        </div>
      </div>

    )
  }
}

export default Card

import React, {Component} from 'react'

class Card extends Component{
  render(){
    console.log(this.props)
    return(

      <div className="column" id={this.props.currentUser ? "no-click" : ""}>
        <div className="ui link card" onClick={() => this.props.handleCardClick(this.props.card.id)} style={{minHeight: "30vh", margin: "2px"}}>
          <div className="content">
            <div className="header">{this.props.card.text}</div>
          </div>

        </div>
      </div>

    )
  }
}

export default Card

import React, {Component} from 'react'

class BlackCard extends Component{
  render(){
    return(

      <div className="column inverted">
        <div className="ui link card" style={{minHeight: "30vh", margin: "2px", background: "black"}}>
          <div className="content">
            <div className="header" style={{color: "white"}}>{this.props.card}</div>
          </div>

        </div>
      </div>

    )
  }
}

export default BlackCard

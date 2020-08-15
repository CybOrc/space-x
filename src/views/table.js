import React from 'react';

class Table extends React.Component {
  render() {
  	const rockets = this.props.rockets;
  	const rocketId = this.props.rocketId;



  	return(
  		<section className="c-rocket-table">
          <div className="c-rocket-table__row">
              <div className="c-rocket-table__cell">Name</div>
              <div className="c-rocket-table__cell">Status</div>
              <div className="c-rocket-table__cell">Success</div>
              <div className="c-rocket-table__cell">Description</div>  
              <div className="c-rocket-table__cell">Details</div>                  
          </div>
          
          {rockets.map(rocket => ( 
            <div key={rocket.id} className={((rocketId !== null && rocket.id !== rocketId) ? "c-rocket-table__hide" : "c-rocket-table__row")}>
                <div className="c-rocket-table__cell  u-nowrap">{rocket.name}</div>       
                <div className="c-rocket-table__cell">{(rocket.active) ? "Active" : "Inactive"}</div>
                <div className="c-rocket-table__cell">{rocket.success_rate_pct}%</div>
                <div className="c-rocket-table__cell">{rocket.description}</div>   
                <div className="c-rocket-table__cell">
                  <button id={rocket.id} href={rocket.id} onClick={this.props.handleClick} className="c-btn"> { (rocketId) ? 'Hide' : "Show"} Details </button>
                </div>              
            </div>
          ))}

        </section>
  	)
  }
}
export default Table;
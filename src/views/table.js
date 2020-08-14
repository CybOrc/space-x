import React from 'react';

class Table extends React.Component {
  render() {
  	const rockets = this.props.data;
  	return(
  		<section className="c-rocket-table">
          <div className="o-layout u-flex">
              <div className="o-layout__item">Name</div>
              <div className="o-layout__item">Status</div>
              <div className="o-layout__item">Success Rate</div>
              <div className="o-layout__item">Description</div>  
              <div className="o-layout__item">Details</div>                  
          </div>

          {rockets.map(rocket => (
            <div key={rocket.id} className="o-layout u-flex">
                <div className="o-layout__item">{rocket.name}</div>       
                <div className="o-layout__item">{(rocket.active) ? "Active" : "Inactive"}</div>
                <div className="o-layout__item">{rocket.success_rate_pct}%</div>
                <div className="o-layout__item">{rocket.description}</div>   
                <div className="o-layout__item">
                  <a id={rocket.id} href={rocket.id} onClick={this.props.handleClick} className="c-btn"> More Info </a>
                </div>              
            </div>
          ))}
        </section>
  	)
  }
}
export default Table;
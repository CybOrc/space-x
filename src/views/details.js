import React from 'react';

class Details extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			launches:[],
			sortedField:null,
			ascending:true
		};
	};

	componentDidUpdate(nextProps){
	    if(nextProps.rocketId !== this.props.rocketId) {
	    	this.setState({	launches: [] });
	     	this.componentDidMount();
	    }
	}

	handleClick = (e) => {
	    e.preventDefault();
	    if(this.state.sortedField === e.target.getAttribute('data') ) {
	    	this.setState({ascending: !this.state.ascending});
	    }	    
	    this.setState({sortedField: e.target.getAttribute('data') });
	  };

	componentDidMount(){
		const url = "https://api.spacexdata.com/v4/launches";
		const ship = this.props.rocketId;
	// read latest entities
	fetch(url, {
	      "method": "GET"
	    })
	  .then(data => data.json())
	  .then(data => {
	  	data.forEach(launch => {
	  		if(launch.rocket === ship ){
	  			this.setState({
	          		launches: this.state.launches.concat(launch)
	          	});
	  		}
	  	})
	  })
	  .catch(err => { console.log(err); 
	});
	};

	render() {
		const rocketId = this.props.rocketId;
		const data = this.props.data;
		const launches = this.state.launches;
		const sortedField = this.state.sortedField;
		const ascending = this.state.ascending;
		const rocketDetails = (data.filter( obj => { return obj.id === rocketId } ))[0];
		let sortedLaunches = [...launches];

		function getStatus(date_unix,status) {
			let time = Math.round(new Date().getTime()/1000);
			if (date_unix > time ) {
				return "Upcoming"
			}
			return (status)? "Successful" : "Failed"
		}

		if (sortedField !== null) {

		    sortedLaunches.sort((a, b) => {
		      if (a[sortedField] < b[sortedField]) {
		        return (ascending) ? -1 : 1 ;
		      }
		      if (a[sortedField] > b[sortedField]) {
		        return (ascending) ? 1 : -1;
		      }
		      return 0;
		    });
		  }


		if(rocketId) {
			return(
				<section>
					<div className="o-layout">
						<div className="o-layout__item u-1/2">
							<h1 className="u-margin-horizontal"> {rocketDetails.name}</h1>
							<ul >
								<li className="o-layout__item u-1/2  u-padding-none">Height: {rocketDetails.height.meters}m</li>
								<li className="o-layout__item u-1/2  u-padding-none">Diameter: {rocketDetails.diameter.meters}m</li>
								<li className="o-layout__item u-1/2  u-padding-none">Mass: {rocketDetails.mass.kg}</li>
								<li className="o-layout__item u-1/2  u-padding-none">Engine: {rocketDetails.engines.type}</li>
								<li className="o-layout__item u-1/2  u-padding-none">Wikipedia: <a href={rocketDetails.wikipedia}>here</a> </li>
							</ul>
						</div>
						<div className="o-layout__item u-1/2">
							<img className="u-margin-right" alt={rocketDetails.name} src={rocketDetails.flickr_images[0]} />
						</div>
						<h1 className="u-margin-horizontal"> Launches</h1>
					</div>
					<div className="c-rocket-table" >
						<div className="c-rocket-table__row"> 
							<div className="c-rocket-table__cell">
								<button type="button" data="date_utc" onClick={ this.handleClick }>Date</button>
							</div>
							<div className="c-rocket-table__cell">
								<button type="button" data="success" onClick={ this.handleClick }>Status</button>
							</div>
							<div className="c-rocket-table__cell">
								Details
							</div>
						</div>
						{sortedLaunches.map(launch => (
						<div key={launch.id} className="c-rocket-table__row"> 
							<div className="c-rocket-table__cell">{launch.date_utc}</div>
							<div className="c-rocket-table__cell">{
								getStatus(launch.date_unix,launch.success) 
							}
							</div>
							<div className="c-rocket-table__cell">{launch.details}</div>
						</div>))}
					</div>
				</section>
				)
		}else {
			return("Select a Rocket")
		}
		
	}
}
export default Details;
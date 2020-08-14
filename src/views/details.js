import React from 'react';

class Details extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			launches:[]
		};
	};

	componentDidUpdate(nextProps){
	    if(nextProps.selected !== this.props.selected) {
	    	this.setState({	launches: [] });
	     	this.componentDidMount();
	    }
	}

	componentDidMount(){
		const url = "https://api.spacexdata.com/v4/launches";
		const ship = this.props.selected;
		console.log("mounted");
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
		const selected = this.props.selected;
		const launches = this.state.launches;
		if(selected) {
			return(
				<section>
					<h1> {selected} Launches</h1>
					{launches.map(launch => (
						<div key={launch.id}> {launch.date_utc} </div>
						))}
				</section>
				)
		}else {
			return("Select a Rocket")
		}
		
	}
}
export default Details;
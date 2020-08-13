import React from 'react';


class Rockets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: [],
      loaded: false,
      error: null,
      sort: null 
    };
  }

  componentDidMount(){
    // read latest entities
    this.setState({ isLoading: true });
    fetch("https://api.spacexdata.com/v4/rockets", {
          "method": "GET"
        })
      .then(response => response.json())
      .then(response => {
        this.setState({
          response: response,
          loaded: true
          });
        console.log(response);
       })
      .catch(err => { console.log(err); 
    });
  }


  render() {
    const { error, loaded, response } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } 

    if (!loaded) {
      return <div>Loading...</div>;
    } 

    return (
        <section>
          <div className="o-layout">
              <div className="o-layout__item  u-1/5">Name</div>
              {/*<div className="o-layout__item  u-1/5">Description</div>         */}
              <div className="o-layout__item  u-1/5">Status</div>
              <div className="o-layout__item  u-1/5">Success Rate</div>
              <div className="o-layout__item  u-1/5">Details</div>              
          </div>

          {response.map(item => (
            <div key={item.id} className="o-layout">
                <div className="o-layout__item  u-1/5">{item.name}</div>
                {/*<div className="o-layout__item  u-1/5">{item.description}</div>*/}         
                <div className="o-layout__item  u-1/5">{(item.active) ? "Active" : "Inactive"}</div>
                <div className="o-layout__item  u-1/5">{item.success_rate_pct}%</div>
                <div className="o-layout__item  u-1/5">
                  <a href="#" className="c-btn"> More Info </a>
                </div>              
            </div>
          ))}

        </section>
      );
  }
  
}


export default Rockets;

/*
 Capsules
 Company
 Cores
 Crew
 Dragons
 Landpads
 launches
 launchpads
 payloads
 Roadster
 Rockets
 Ships
 Starlink

*/
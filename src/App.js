import React from 'react';
import Table from './views/table';
import Details from './views/details';

class app extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loaded: false,
      error: null,
      sort: null ,
      selected:null
    };
  };

  componentDidMount(){
    // read latest entities
    this.setState({ isLoading: true });
    fetch("https://api.spacexdata.com/v4/rockets", {
          "method": "GET"
        })
      .then(data => data.json())
      .then(data => {
        this.setState({
          data: data,
          loaded: true
          });
       })
      .catch(err => { console.log(err); 
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({selected:e.target.id});
  };



  render() {
    const { error, loaded, data, selected } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } 

    if (!loaded) {
      return <div>Loading...</div>;
    };


    return (
      <main className="u-padding">
        {<Table data={this.state.data} handleClick={this.handleClick} />}
        {<Details selected={this.state.selected}/>}
      </main>
      );
  }
  
}


export default app;
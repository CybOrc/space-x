import React from 'react';

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: [],
      loaded: false,
      error: null,
      sort: null 
    };
  }

  render() {
  	return("Hello World")
  }
}
export default Details;
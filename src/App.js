import React from "react";
import Table from "./views/table";
import Details from "./views/details";

class app extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loaded: false,
      error: null,
      sort: null,
      rocketId: null,
    };
  }

  componentDidMount() {
    // read latest entities
    this.setState({ isLoading: true });
    fetch("https://api.spacexdata.com/v4/rockets", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          data: data,
          loaded: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClick = (e) => {
    e.preventDefault();
    if (this.state.rocketId === null) {
      let id = e.target.id;
      this.setState({ rocketId: id });
    } else {
      this.setState({ rocketId: null });
    }
  };

  render() {
    const { error, loaded, data, rocketId } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!loaded) {
      return <div>Loading...</div>;
    }

    return (
      <main className="u-padding">
        {
          <Table
            rockets={data}
            handleClick={this.handleClick}
            rocketId={rocketId}
          />
        }
        {<Details rocketId={rocketId} data={data} />}
      </main>
    );
  }
}

export default app;

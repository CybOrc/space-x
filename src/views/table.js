import React from "react";

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortThisField: null,
      ascending: true,
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    if (this.state.sortThisField === e.target.getAttribute("data")) {
      this.setState({ ascending: !this.state.ascending });
    }
    this.setState({ sortThisField: e.target.getAttribute("data") });
  };

  render() {
    const rockets = this.props.rockets;
    const rocketId = this.props.rocketId;
    const sortThisField = this.state.sortThisField;
    const ascending = this.state.ascending;
    let sortedRockets = [...rockets];

    if (sortThisField !== null) {
      sortedRockets.sort((a, b) => {
        if (a[sortThisField] < b[sortThisField]) {
          return ascending ? -1 : 1;
        }
        if (a[sortThisField] > b[sortThisField]) {
          return ascending ? 1 : -1;
        }
        return 0;
      });
    }

    return (
      <section className="c-rocket-table u-1/1">
        <div className="c-rocket-table__row">
          <div className="c-rocket-table__cell">
            <button type="button" data="name" onClick={this.handleClick}>
              {" "}
              Name{" "}
            </button>
          </div>
          <div className="c-rocket-table__cell">
            <button type="button" data="active" onClick={this.handleClick}>
              {" "}
              Status{" "}
            </button>
          </div>
          <div className="c-rocket-table__cell">
            <button
              type="button"
              data="success_rate_pct"
              onClick={this.handleClick}
            >
              {" "}
              Success{" "}
            </button>
          </div>
          <div className="c-rocket-table__cell">
            <button type="button" data="stages" onClick={this.handleClick}>
              {" "}
              Stages{" "}
            </button>
          </div>
          <div className="c-rocket-table__cell">
            <button type="button" data="boosters" onClick={this.handleClick}>
              {" "}
              Boosters{" "}
            </button>
          </div>
          <div className="c-rocket-table__cell">
            <button
              type="button"
              data="first_flight"
              onClick={this.handleClick}
            >
              {" "}
              First Flight{" "}
            </button>
          </div>
          <div className="c-rocket-table__cell">Details</div>
        </div>

        {sortedRockets.map((rocket) => (
          <div
            key={rocket.id}
            className={
              rocketId !== null && rocket.id !== rocketId
                ? "c-rocket-table__hide"
                : "c-rocket-table__row"
            }
          >
            <div className="c-rocket-table__cell  u-nowrap">{rocket.name}</div>
            <div className="c-rocket-table__cell">
              {rocket.active ? "Active" : "Inactive"}
            </div>
            <div className="c-rocket-table__cell">
              {rocket.success_rate_pct}%
            </div>
            <div className="c-rocket-table__cell">{rocket.stages}</div>
            <div className="c-rocket-table__cell">{rocket.boosters}</div>
            <div className="c-rocket-table__cell">{rocket.first_flight}</div>
            <div className="c-rocket-table__cell">
              <button
                id={rocket.id}
                href={rocket.id}
                onClick={this.props.handleClick}
                className="c-btn"
              >
                {" "}
                {rocketId ? "Hide" : "Show"} Details{" "}
              </button>
            </div>
          </div>
        ))}
      </section>
    );
  }
}
export default Table;

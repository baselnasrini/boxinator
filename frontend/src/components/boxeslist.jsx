import React, { Component } from "react";
import axios from "axios";

class BoxesList extends Component {
  state = {
    boxesList: [],
    showWarning: false,
    isLoading: true,
    warningMsg: "",
    warningType: "",
  };

  warningTypesEnum = {
    danger: "alert-danger",
    success: "alert-success",
  };

  async componentDidMount() {
    try {
      this.hideWarning();
      const response = await axios.get("api/listboxes");
      if (response.status === 200) {
        this.setState({
          boxesList: response.data,
          isLoading: false,
          showWarning: false,
        });
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      this.displayWarning(
        this.warningTypesEnum.danger,
        "Server-side is down:( Please run the server-side and try again."
      );
      return error.response;
    }
  }

  displayWarning(warningType, message) {
    this.setState({ showWarning: true });
    this.setState({ warningType: warningType });
    this.setState({ warningMsg: message });
  }

  hideWarning() {
    this.setState({ showWarning: false });
    this.setState({ warningType: "" });
    this.setState({ warningMsg: "" });
  }

  render() {
    const { boxesList, isLoading } = this.state;
    if (isLoading)
      return <div className="container mt-5">Loading boxes list...</div>;

    let boxesRows = boxesList.map((box) => (
      <tr key={box.id}>
        <td>{box.name}</td>
        <td>{box.weight} kg</td>
        <td style={{ backgroundColor: box.color }}></td>
        <td>{box.cost} SEK</td>
        <td>{box.country}</td>
      </tr>
    ));

    return (
      <div className="container mt-5">
        <div
          className={"alert " + this.state.warningType}
          role="alert"
          hidden={!this.state.showWarning}
        >
          {this.state.warningMsg}
        </div>
        <table className="table table-bordered" hidden={this.state.showWarning}>
          <thead className="thead-light">
            <tr>
              <th scope="col">Receiver Name</th>
              <th scope="col">Weight</th>
              <th scope="col">Box color</th>
              <th scope="col">Shipping cost</th>
              <th scope="col">Country</th>
            </tr>
          </thead>
          <tbody>{boxesRows}</tbody>
        </table>
      </div>
    );
  }
}

export default BoxesList;

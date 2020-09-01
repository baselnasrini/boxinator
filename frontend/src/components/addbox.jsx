import React, { Component } from "react";
import axios from "axios";

class AddBox extends Component {
  state = {
    colorAccepted: true,
    showWarning: false,
    warningMsg: "",
    warningType: "",
  };

  warningTypesEnum = {
    danger: "alert-danger",
    success: "alert-success",
  };

  addBoxHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const box = {
      name: formData.get("name").trim(),
      weight: formData.get("weight").trim(),
      color: formData.get("color"),
      country: formData.get("country").trim(),
    };
    if (this.checkInputs(box)) {
      this.createBox(box);
    } else {
      if (this.state.colorAccepted) {
        this.displayWarning(
          this.warningTypesEnum.danger,
          "Bad arguments :( Please fill all the required fields to add a new box."
        );
      }
    }
  };

  async createBox(box) {
    try {
      await axios
        .post("api/addbox", box)
        .then((res) => {
          if (res.status === 200) {
            this.displayWarning(
              this.warningTypesEnum.success,
              "Box added successfully :)"
            );
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          this.displayWarning(this.warningTypesEnum.danger, err.response.data);
        });
    } catch (error) {
      this.displayWarning(
        this.warningTypesEnum.danger,
        "Server-side is down:( Please run the server-side and try again."
      );
      return error.response;
    }
  }

  colorSelected = (e) => {
    const hex = e.target.value;
    const rgb = this.hexToRGB(hex);
    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    if (this.isColorBlue(hsl)) {
      this.displayWarning(
        this.warningTypesEnum.danger,
        "Blue and all it's shade are not acceptable!! Please choose another color"
      );
      this.setState({ colorAccepted: false });
    } else {
      this.hideWarning();
      this.setState({ colorAccepted: true });
    }
  };

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

  checkInputs(box) {
    const isColorValue = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$").exec(
      box.color
    ); // ref: stackoverflow

    if (
      box.name &&
      box.weight >= 0.01 &&
      isColorValue &&
      this.state.colorAccepted &&
      ["Sweden", "China", "Brazil", "Australia"].includes(box.country)
    ) {
      return true;
    }
    return false;
  }

  // ref: https://css-tricks.com/converting-color-spaces-in-javascript/#hex-to-rgb
  hexToRGB(h) {
    let r = 0,
      g = 0,
      b = 0;

    // 3 digits
    if (h.length === 4) {
      r = +("0x" + h[1] + h[1]);
      g = +("0x" + h[2] + h[2]);
      b = +("0x" + h[3] + h[3]);

      // 6 digits
    } else if (h.length === 7) {
      r = +("0x" + h[1] + h[2]);
      g = +("0x" + h[3] + h[4]);
      b = +("0x" + h[5] + h[6]);
    }

    return { r, g, b };
  }

  // ref: https://gist.github.com/mjackson/5311256
  rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          break;
      }

      h /= 6;
    }

    return { h, s, l };
  }

  // I considered the color as blue when the Hue degree of the HSL value is between 180 and 255 which is between 0.5 and 0.708
  isColorBlue(hsl) {
    return hsl.h >= 0.5 && hsl.h < 0.708;
  }

  render() {
    return (
      <div className="container mt-5">
        <form onSubmit={this.addBoxHandler}>
          <div
            className={"alert " + this.state.warningType}
            role="alert"
            hidden={!this.state.showWarning}
          >
            {this.state.warningMsg}
          </div>
          <div className="form-group">
            <label htmlFor="inputName">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              maxLength="40"
              placeholder="Enter receiver name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputWeight">Weight</label>
            <input
              type="number"
              min="0.01"
              step=".01"
              className="form-control"
              name="weight"
              placeholder="Enter box weight in kg"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="color">Box Color </label>
            <input
              type="color"
              name="color"
              className="w-100"
              onChange={this.colorSelected}
            />
          </div>
          <div className="form-group">
            <label htmlFor="county">Country</label>
            <select
              id="county"
              name="country"
              className="custom-select"
              required
            >
              <option value="" defaultValue>
                Select the destination country...
              </option>
              <option value="Sweden">Sweden</option>
              <option value="China">China</option>
              <option value="Brazil">Brazil</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
          <button className="btn btn-primary">Add</button>
        </form>
      </div>
    );
  }
}

export default AddBox;

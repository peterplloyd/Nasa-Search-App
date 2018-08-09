import React, { Component, PropTypes } from "react";

class NasaCheckbox extends Component {
  state = {
    isChecked: true
  };

  toggleCheckboxChange = () => {
    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));
  };

  render() {
    const { label } = this.props;
    const { mediaType } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            id={mediaType}
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />
          {label}
        </label>
      </div>
    );
  }
}

export default NasaCheckbox;

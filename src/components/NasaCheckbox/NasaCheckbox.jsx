import React, { Component, PropTypes } from "react";
import styles from "./NasaCheckbox.scss";

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
    const {
      searchHeader__container__checkbox__container,
      searchHeader__container__checkbox__container__input
    } = styles;

    return (
      <div className={searchHeader__container__checkbox__container}>
        <label>
          <input
            className={searchHeader__container__checkbox__container__input}
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

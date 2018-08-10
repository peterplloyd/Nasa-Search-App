import React, { Component } from "react";
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
      searchHeader__container__checkbox__container__input,
      searchHeader__container__checkbox__container__label
    } = styles;

    return (
      <div className={searchHeader__container__checkbox__container}>
        <input
          className={searchHeader__container__checkbox__container__input}
          id={mediaType}
          type="checkbox"
          value={label}
          checked={isChecked}
          aria-checked={isChecked}
          onChange={this.toggleCheckboxChange}
        />
        <label
          htmlFor={mediaType}
          className={searchHeader__container__checkbox__container__label}
        >
          {label}
        </label>
      </div>
    );
  }
}

export default NasaCheckbox;

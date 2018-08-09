import React, { Component } from "react";
import { connect } from "react-redux";
import { Player } from "video-react";

import Checkbox from "../NasaCheckbox";
import Limit from "../../config/limit.js";

import styles from "./NasaSearch.scss";
import Search from "../../images/svg/search.svg";
import Close from "../../images/svg/close.svg";

import {
  fetchDataAction,
  clearAction,
  updateTextAction
  //getVideoAction
} from "../../redux/actions/actions.js";

@connect(
  store => {
    return {
      results: store.main.results,
      text: store.main.text
    };
  },
  dispatch => {
    return {
      updateTextFromInput: (payload, media) =>
        dispatch(fetchDataAction(payload, media)),
      clear: () => dispatch(clearAction()),
      updateText: payload => dispatch(updateTextAction(payload)),
      //getVideoAction: payload => dispatch(getVideoAction(payload))
    };
  }
)
export default class NasaSearch extends Component {
  constructor(props) {
    super(props);
    this.updateTextFromInput = this.updateTextFromInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clear = this.clear.bind(this);
  }

  updateTextFromInput() {
    const image = document.querySelector("#Image").checked ? "image" : "";
    const video = document.querySelector("#Video").checked ? "video" : "";
    let media = `${image},${video}`;

    this.props.updateTextFromInput(this.props.text, media, false);
  }

  /*getVideoAction(src) {
    console.log("hello");
    this.props.getVideoAction(src);
  }*/

  clear() {
    this.props.updateText("");
    this.props.clear();
  }

  renderResponse() {
    const { result, resultContainer } = styles;
    let count = 0;
    if (this.props.results) {
      if (this.props.results.resultCollection.length > 0 && this.props.text) {
        return (
          <div className={result}>
            {this.props.results.resultCollection.map((x, y) => {
              count++;
              let photographer = x.data[0].photographer || "Nasa",
                description = x.data[0].description || "",
                src = x.links[0].href || "",
                keywords = x.data[0].keywords || "No Tags",
                mediaType = x.data[0].media_type || "",
                nasaId = x.data[0].nasa_id || "";

              if (count <= Limit) {
                if (mediaType === "image") {
                  return (
                    <div id={nasaId} className={resultContainer}>
                      <a href={src}>
                        <img src={src} alt={keywords[0]} />
                      </a>
                      <p>Taken By: {photographer} </p>
                      <p>{description}</p>
                      <p>Tags: {keywords}</p>
                    </div>
                  );
                } else {
                  //this.getVideoAction(src);
                  return (
                    <div id={nasaId} className={resultContainer}>
                      <Player playsInline src={src} />
                      <p>Filmed By: {photographer} </p>
                      <p>{description}</p>
                      <p>Tags: {keywords}</p>
                    </div>
                  );
                }
              }
            })}
          </div>
        );
      } else {
        return (
          <div className={result}>
            <p>sorry no results found!</p>
          </div>
        );
      }
    }
  }

  handleInputChange(e) {
    this.props.updateText(e.target.value);
  }

  renderResults() {
    const {
      search,
      input,
      searchSvg,
      searchButton,
      closeButton,
      closeSvg,
      checkbox
    } = styles;

    return (
      <div className={search}>
        <div className={input}>
          <input
            type="text"
            value={this.props.text ? decodeURIComponent(this.props.text) : ""}
            onChange={this.handleInputChange}
            placeholder={'Please enter search term... e.g "Orion"'}
            onKeyPress={e => {
              e.key === "Enter" ? this.updateTextFromInput() : "";
            }}
          />
          {this.props.text ? (
            <a className={closeButton} onClick={this.clear}>
              <Close className={closeSvg} />
            </a>
          ) : (
            <a className={searchButton} onClick={this.updateTextFromInput}>
              <Search className={searchSvg} />
            </a>
          )}
        </div>
        <div className={checkbox}>
          <Checkbox
            label="Image"
            handleCheckboxChange={this.toggleCheckbox}
            mediaType="Image"
          />
          <Checkbox
            label="Video"
            handleCheckboxChange={this.toggleCheckbox}
            mediaType="Video"
          />
        </div>
        {this.renderResponse()}
      </div>
    );
  }

  render() {
    const { container, title } = styles;
    return (
      <div className={container}>
        <div className={title}>
          <h2>
            <strong>Nasa Search</strong>
          </h2>
        </div>
        {this.renderResults()}
      </div>
    );
  }
}

import axios from "axios";
import * as actionTypes from "./actionTypes";

export function fetchDataAction(payload, media) {
  const searchQuery = `https://images-api.nasa.gov/search?q=${payload}&media_type=${media}`;

  return dispatch => {
    axios
      .get(searchQuery)
      .then(response => {
        let data = response.data;
        dispatch(sanitizeData(data));
      })
      .catch(error => {
        alert("Sorry, there was an error fetching the data from Nasa! ", error);
      });
  };
}

export function sanitizeData(payload) {
  return dispatch => {
    let sanitizedData = {};
    let resultCollection = payload.collection.items;

    sanitizedData = {
      ...sanitizedData,
      resultCollection: resultCollection
    };
    return dispatch(sanitizedDataAction(sanitizedData));
  };
}

export function sanitizedDataAction(payload) {
  return { type: actionTypes.SANITIZED_DATA_ACTION, payload };
}

export function clearAction() {
  return { type: actionTypes.CLEAR_ACTION };
}

export function updateTextAction(payload) {
  return { type: actionTypes.UPDATE_TEXT_ACTION, payload };
}

/*export function getVideoAction(payload) {
  console.log(payload);
  return dispatch => {
    let sanitizedData = {};
    let video = payload;

    sanitizeData = {
      ...sanitizedData,
      video: video
    };

    return dispatch(sanitizedDataAction(sanitizedData));
  };
}*/

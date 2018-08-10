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
    let videoLinks = {};
    let resultCollection = payload.collection.items;

      console.log(resultCollection);
    resultCollection.map(x => {
      axios.get(x.href).then(response => {
        videoLinks[x.data[0].nasa_id] = response.data[0];
      });
    });

    sanitizedData = {
      ...sanitizedData,
      resultCollection: resultCollection,
      videoLinks: videoLinks
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

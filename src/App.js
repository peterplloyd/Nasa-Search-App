import React, { Component } from "react";
import NasaSearch from "./components/NasaSearch";
import NasaLogo from "./components/NasaLogo";

import "./styles/fonts/_fonts.scss";
import "./styles/_global.scss";

class App extends Component {
  render() {
    return (
      <div id={"container"}>
        <NasaLogo
          title="Nasa Logo"
          alt="The Logo of the National Aeronautics and Space Administration"
        />
        <NasaSearch title="Nasa Search Bar" text="Value" />
      </div>
    );
  }
}
export default App;

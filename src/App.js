import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";

const HatsPage = () => {
  return (
    <div>
      <hi>Hats Page hereeeee</hi>
    </div>
  );
};
function App() {
  return (
    <div className="">
      <Route exact path="/" component={HomePage} />
      <Route exact path="/hats" component={HatsPage} />
    </div>
  );
}

export default App;

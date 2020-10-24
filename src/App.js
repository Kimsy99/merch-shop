import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.components.jsx";
import SignInSignUp from "./pages/sign-in-and-sign-up-page/sign-in-and-sign-up.components";

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
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/hats" component={HatsPage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/signin" component={SignInSignUp} />
      </Switch>
    </div>
  );
}

export default App;

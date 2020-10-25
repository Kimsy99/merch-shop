import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.components.jsx";
import SignInSignUp from "./pages/sign-in-and-sign-up-page/sign-in-and-sign-up.components";
import { auth } from "./firebase/firebase.util";
const HatsPage = () => {
  return (
    <div>
      <hi>Hats Page hereeeee</hi>
    </div>
  );
};
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      //take current state of user then set the user state into current state
      this.setState({ currentUser: user });
      console.log(user);
    });
  }
  //close subscription when leave
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div className="">
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/hats" component={HatsPage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;

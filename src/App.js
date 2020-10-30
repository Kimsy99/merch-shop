import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.components.jsx";
import SignInSignUp from "./pages/sign-in-and-sign-up-page/sign-in-and-sign-up.components";
import { auth, createUserProfileDocument } from "./firebase/firebase.util";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
const HatsPage = () => {
  return (
    <div>
      <hi>Hats Page hereeeee</hi>
    </div>
  );
};
class App extends React.Component {
  // We dont need this anymore
  // constructor() {
  //   super();
  //   this.state = {
  //     currentUser: null,
  //   };
  // }
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props; //destructor it since we are using a few times
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // //take current state of user then set the user state into current state
      // this.setState({ currentUser: user });
      // console.log(user);
      // createUserProfileDocument(user);
      // console.log(userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth); //directly pass in  what object we wanna update with
      }
    });
  }
  //close subscription when leave
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
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
}

const mapDispatchToProps = (dispatch) => ({
  //set current user -> it goes to the function that take user object, then call dispatch ->  pass it to the a dispatch. then we call in setCurrentUser function with paramter of user in dispatch (user will be used as the payload)
  //dispatch is like -> whatever object you are passing me, is going to be a action object that i will pass to all reducer (action object is like what that are returned in user.action)
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(App);

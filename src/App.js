import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.components.jsx';
import SignInSignUp from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up.components';
import Checkout from './pages/checkout/checkout.components';
import {
  auth,
  createUserProfileDocument,
  addCollectionAndDocument,
} from './firebase/firebase.util';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';
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
    const { setCurrentUser, collectionsArray } = this.props; //destructor it since we are using a few times
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // //take current state of user then set the user state into current state
      // this.setState({ currentUser: user });
      // console.log(user);
      // createUserProfileDocument(user);
      // console.log(userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //when snapshot changes -> then pass to listener
        userRef.onSnapshot((snapshot) => {
          //set to our redux
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } //else {
      setCurrentUser(userAuth); //directly pass in  what object we wanna update with
      addCollectionAndDocument(
        'collections',
        collectionsArray.map(({ title, items }) => ({ title, items }))
      );
      // }
    });
  }
  //close subscription when leave
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div className=''>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? <Redirect to='/' /> : <SignInSignUp />
            }
          />
          <Route exact path='/checkout' component={Checkout} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview,
});
const mapDispatchToProps = (dispatch) => ({
  //set current user -> it goes to the function that take user object, then call dispatch ->  pass it to the a dispatch. then we call in setCurrentUser function with paramter of user in dispatch (user will be used as the payload)
  //dispatch is like -> whatever object you are passing me, is going to be a action object that i will pass to all reducer (action object is like what that are returned in user.action)
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

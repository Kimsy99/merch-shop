import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCq9LwDRm5WixoblJ0rzUThreF46Lr6-gk",
  authDomain: "merch-db-b2c46.firebaseapp.com",
  databaseURL: "https://merch-db-b2c46.firebaseio.com",
  projectId: "merch-db-b2c46",
  storageBucket: "merch-db-b2c46.appspot.com",
  messagingSenderId: "466073915304",
  appId: "1:466073915304:web:55bd21b40f7091a952179d",
  measurementId: "G-Y1HRCNXCE6",
};
firebase.initializeApp(config);

export const auth = firebase.auth(); //we export the authentication out
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  // enter firebase config here
};
firebase.initializeApp(config);
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`); //get user reference at that location
  const snapShot = userRef.get(); //get location le then now get snapshot
  // console.log(snapShot);

  // //try on collectionReference andd querySnapshot
  // const collectionRef = firestore.collection("users");
  // const collectionSnapshot = await collectionRef.get();
  // console.log(collectionSnapshot);
  // console.log({ collection: collectionSnapshot.docs.map((doc) => doc.data()) });

  //check whether this account exists (make sure no duplicate) -> if not then we need to use document reference object to collect it, not snapshot (bcs snapshot rep data only)
  if (!snapShot.exists) {
    //we want the user name, email and datatime this is created
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    //make sure if any error happens still ok
    try {
      //create new doc
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log('error: ', err.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch(); //batch our set get those things into 1
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc(); // create a new doc ref and randomly generate id for it
    batch.set(newDocRef, obj);
  });
  return await batch.commit(); //batch together
};

//convert to object from array
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection; //each object into key is title contain the object we have here
    return accumulator;
  }, {});
};
export const auth = firebase.auth(); //we export the authentication out
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

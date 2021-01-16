import ShopActionTypes from './shop.types';
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.util';

export const updateCollection = (collectionsMap) => ({
  type: ShopActionTypes.UPDATE_COLLECTION,
  payload: collectionsMap,
});

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errMsg) => ({
  type: ShopActionTypes.fetchCollectionsFailure,
  payload: errMsg,
});

/*
Async action creator
- made possible by redux-thunk middleware
- when RT middleware is enabled -> then anytime when we attempt to dispatch a function
  instead of an object, then middleware will call that function with dispatch method itself
  as the first argument

Basically is a function -> that returns a function that get access the dispatch
*/
export const fetchCollectionsStartAsync = () => {
  //dispatch the moment the get called -> bcs of redux-thunk
  return (dispatch) => {
    const collectionRef = firestore.collection('collections'); //get collection ref
    dispatch(fetchCollectionsStart());
    // Fetch data from database
    collectionRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
};

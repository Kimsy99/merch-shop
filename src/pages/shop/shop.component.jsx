import React from 'react';
import { Route } from 'react-router';
import CollectionOverview from '../../components/collection-overview/collection-overview.components';
import CollectionPage from '../collection/collection.components';
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.util';
class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const collectionRef = firestore.collection('collections');
    collectionRef.onSnapshot(async (snapshot) => {
      convertCollectionsSnapshotToMap(snapshot);
    }); //when collectionRef updates/ when the code runfor the first time then it will send us the snapshot of the code of collection array
  }
  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}
export default ShopPage;

//pass category id as parameter then we we put /hats -> categoryId = hats => then we can know which page it is going and publish which one

import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import CollectionOverview from '../../components/collection-overview/collection-overview.components';
import CollectionPage from '../collection/collection.components';
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.util';
import { updateCollection } from '../../redux/shop/shop.actions';

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const { updateCollection } = this.props;
    const collectionRef = firestore.collection('collections');
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollection(collectionsMap);
      }
    ); //when collectionRef updates/ when the code runfor the first time then it will send us the snapshot of the code of collection array
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

const mapDispatchToProps = (dispatch) => ({
  updateCollection: (collectionsMap) =>
    dispatch(updateCollection(collectionsMap)),
});
export default connect(null, mapDispatchToProps)(ShopPage);

//pass category id as parameter then we we put /hats -> categoryId = hats => then we can know which page it is going and publish which one

import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import CollectionOverview from '../../components/collection-overview/collection-overview.components';
import WithSpinner from '../../components/with-spinner/with-spinner.components';
import CollectionPage from '../collection/collection.components';
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.util';
import { updateCollection } from '../../redux/shop/shop.actions';

// get the component for both overview and page pages.
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  unsubscribeFromSnapshot = null;

  // obtain collection data from firestore as here shoppage ahve children -> overview , page that require that data
  componentDidMount() {
    const { updateCollection } = this.props;
    const collectionRef = firestore.collection('collections'); //get collection ref
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      //get the data
      async (snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollection(collectionsMap);
        this.setState({ loading: false });
      }
    ); //when collectionRef updates/ when the code runfor the first time then it will send us the snapshot of the code of collection array
  }
  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
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

import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionOverview from '../../components/collection-overview/collection-overview.components';
import WithSpinner from '../../components/with-spinner/with-spinner.components';
import CollectionPage from '../collection/collection.components';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selector';

// get the component for both overview and page pages.
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  // obtain collection data from firestore as here shoppage ahve children -> overview , page that require that data
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }
  render() {
    const { match, isCollectionFetching } = this.props;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});
export default connect(null, mapDispatchToProps)(ShopPage);

//pass category id as parameter then we we put /hats -> categoryId = hats => then we can know which page it is going and publish which one

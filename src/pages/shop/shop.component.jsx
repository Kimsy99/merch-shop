import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionsOverviewContainer from '../../components/collection-overview/collection-overview.container';
import WithSpinner from '../../components/with-spinner/with-spinner.components';
import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';

class ShopPage extends React.Component {
  // obtain collection data from firestore as here shoppage ahve children -> overview , page that require that data
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }
  render() {
    const { match, isCollectionLoaded } = this.props;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          // render={(props) => (
          //   <CollectionOverviewWithSpinner
          //     isLoading={isCollectionFetching}
          //     {...props}
          //   />
          // )}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          // render={(props) => (
          //   <CollectionPageWithSpinner
          //     isLoading={!isCollectionLoaded} //if loaded then it is not loading
          //     {...props}
          //   />
          // )}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});
export default connect(null, mapDispatchToProps)(ShopPage);

//pass category id as parameter then we we put /hats -> categoryId = hats => then we can know which page it is going and publish which one

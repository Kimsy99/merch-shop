/*
Container pattern
-separate component that render something and container that connects redux part of our app and pass props to the component that need it
*/

// this is just basically we separate out the WithSpinner(collectionpage) from shop.component
// which make things more separate and nicer

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';
import { compose } from 'redux';
import WithSpinner from '../../components/with-spinner/with-spinner.components';
import CollectionPage from './collection.components';

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionsLoaded(state),
});
const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

//same as connect(mapStateToProps)(WIthSopinner(CollecrtionsOverview))

export default CollectionPageContainer;

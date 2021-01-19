// this is just basically we separate out the WithSpinner(collectionoverview) from shop.component
// which make things more separate and nicer

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selector';
import { compose } from 'redux';
import WithSpinner from '../with-spinner/with-spinner.components';
import CollectionsOverview from './collection-overview.components';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

//same as connect(mapStateToProps)(WIthSopinner(CollecrtionsOverview))

export default CollectionsOverviewContainer;

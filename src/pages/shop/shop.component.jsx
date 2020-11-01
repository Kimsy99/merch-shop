import React from "react";
import { Route } from "react-router";
import CollectionOverview from "../../components/collection-overview/collection-overview.components";
import CollectionPage from "../collection/collection.components";
const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);
export default ShopPage;

//pass category id as parameter then we we put /hats -> categoryId = hats => then we can know which page it is going and publish which one

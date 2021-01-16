import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;
//take whole collection
export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);
//bcs we now is object -> however the component can only read array -> we convert it
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);
//take specific collection
export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );

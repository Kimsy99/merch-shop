import { createSelector } from "reselect";

const COLLECTION_ID_MAP = {
  hats: 1,
  jackets: 3,
  sneakers: 2,
  womens: 4,
  mens: 5,
};
const selectShop = (state) => state.shop;
//take whole collection
export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

//take specific collection
export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    )
  );

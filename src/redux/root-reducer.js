import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //import local storage object from window browser
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], //the things we want persist is cart as user is handled by firebase
};
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});
export default persistReducer(persistConfig, rootReducer); //modified version of our root reducer with persistence capabilities

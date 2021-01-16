// To create the store object
import { createStore, applyMiddleware } from 'redux'; //middleware is a function that recerive action in and do something then ouput
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

const middleware = [thunk]; //all methods we wanna put in middleware are stored as array here
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}
export const store = createStore(rootReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store); //a persisted version of our store

export default { store, persistor };

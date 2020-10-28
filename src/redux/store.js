import { createStore, applyMiddleware } from "redux"; //middleware is a function that recerive action in and do something then ouput
import logger from "redux-logger";

import rootReducer from "./root-reducers";

const middleware = [logger]; //all methods we wanna put in middleware are stored as array here

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;

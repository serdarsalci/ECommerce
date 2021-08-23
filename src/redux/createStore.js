import { createStore, applyMiddleware, compose } from 'redux';

import logger from 'redux-logger';

import rootReducer from './rootReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const middlewares = [logger];

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(...middlewares))
);

export default store;

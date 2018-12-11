import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from 'reducers';

export const rootReducer = combineReducers({
    ...reducers,
});

const configureStore = (initialState) => {

    const middleware = [
        thunk,
    ];

    const enhancers = [applyMiddleware(...middleware)];

    // Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                shouldHotReload: false, // Prevent recomputing reducers for `replaceReducer`
            })
            : compose;
    /* eslint-enable */

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(...enhancers)
    );
};

const store = configureStore();

export default store;

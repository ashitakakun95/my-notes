import { createStore, combineReducers } from 'redux';

import currentUserReducer from './reducers/currentUser';

const rootReducer = combineReducers({
    currentUser: currentUserReducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;
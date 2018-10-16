# How to create android app

## Basic Setup

1. downgrade to stable version `"react-native": "0.57.1"`
2. double check your version `react-native -v`
3. install babel manually as newest version doesn't install automatically `npm install @babel/runtime --save`
4. test run app `react-native run-android`
5. recommended package 
    1. `react-native-navigation`
    2. `react-native-vector-icons`


## How to Redux?

1. `npm install react-redux redux --save`
2. create a folder named `store` under `src` with subfolder `reducers` & `actions`
3. to make our app aware of redux
```jsx
// index.js
/** @format */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

// initialize store
const store = configureStore();

// React Native Redux
// needs to be function just like stateless component
const RNRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);

```
4. create a file under store with name `configureStore.js`
```jsx
import { createStore, combineReducers } from 'redux';

import currentUserReducer from './reducers/currentUser';

// here is all your reducers
const rootReducer = combineReducers({
    currentUser: currentUserReducer
});

// combine all reducers into one
const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;
```

Example of using redux
```jsx
// Component.js
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        /**
        currentUser is a name you must followed declared from
        configureStore.js
        */
        currentUser: state.currentUser.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
```

Now with initialization, just access them using ie. `this.props.currentUser`

## How to Redux with `fetch`



## How To Connect Phone DevMode To WiFi

1. `npm start` your project
2. `ipconfig` look for ipv4
3. open dev menu and set server address to that ip

## How To Create Navigation

1. Follow the steps from documentation
2. create a file named `index.android.js` and `index.ios.js` then copy every code from `index.js`
3. follow the video
4. at least one screen must be added, or else it will just be blank(even dev menu won't pop out)

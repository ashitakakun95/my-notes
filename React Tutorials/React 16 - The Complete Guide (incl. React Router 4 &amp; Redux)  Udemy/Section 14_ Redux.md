# Redux

`npm install redux --save`

This store should be created right before our application or when our application starts, so the `index.js` is the place to start with.

Redux alone is standalone, and is not connected to React, so we'll need `react-redux` package.

Then we'll create a folder named `store` inside `src`.

```jsx
// src/store/reducer.js
const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {
    return state;
};

export default reducer;
```

`npm install react-redux --save`

Provider is a helper component which allows us to kind of inject our store into the react components. For hooking up the provider component with our store here, we'll need to pass the `store` as property to the `Provider` component.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducer from './store/reducer';

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

```

## Combining Multiple Reducers

As the application grows, the reducer grows, so we'll need multiple reducers(file).
Anyhow, all actions inthe end get funneled through one reducer but redux, the package gives us a utility method we can use to combine multiple reducers into one, so that we still follow the pattern of having one reducer behind the scenes.

```jsx
// index.js

import { createStore, combineReducers } from 'redux';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

const rootReducer = combineReducers({
    counter: counterReducer,
    result: resultReducer
});
```
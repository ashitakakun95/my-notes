# Redux Advanced

## Adding Middleware

What is middleware?
1. Middleware basically is a term used for functions or the code general you hook into a process which then gets executed as part of that process without stopping it. So we can add middleware and the action will still reach the reducer thereafter but we can do something with that action before it reaches the reducer, that can be simply logging something, but that will also become important later when we want to execute asynchronous code,

2. Middleware is just like any function but get execute before the actual function.

Now this is an example of creating an middlware which simply logs each action we issue.

```jsx
import { createStore, combineReducers, applyMiddleware } from 'redux';

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));

```

## Using the Redux Devtools

https://github.com/zalmoxisus/redux-devtools-extension

With the redux devtools, you


```jsx
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
```

## Executing Async Code

By right, it's not correct to execute async code within the reducers. So we have to execute the code using a way called `action-creators`

## Handling Asynchronous Code

`npm install redux-thunk --save`

https://www.google.com/search?num=30&q=redux+thunk&spell=1&sa=X&ved=0ahUKEwjzwPni6eDdAhUYbysKHTIKDq4QBQgqKAA&biw=1920&bih=984

```jsx
// index.js
import thunk from 'react-redux';

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));
```

```jsx
// action.js

export const saveResult = (result) => {
    return {
        type: STORE_RESULT,
        result
    };
}

export const storeResult = (result) => {
    return function (dispatch) {
        setTimeout(() => {
            dispatch(saveResult(result));
        }, 2000);
    }
};
```

## Restructuring Actions

Instead of storing all the actions within `actions.js`, we can restructure into separate files.
ie. `actionTypes.js`  `counter.js` `result.js`

With all of them created, we can create an `index.js` file which export the action's file.

```jsx
export {
    add,
    subtract,
    increment,
    decrement
} from './counter';

export {
    storeResult,
    deleteResult
} from './result';
```

This will make more sense for larger application.

## Where to Put Data Transforming Logic?

## Using Action Creators and Get State

Sometimes in your `async` code, you might need to able to reach out to the state prior to your to-be-dispatched action.

Example. Let's say you want to save some data for a given user and you have the ide of the user stored in your redux state, you can get it with getState

```jsx
export const storeResult = (result) => {
    return function (dispatch, getState) {
        setTimeout(() => {
            const oldCounter = getState().ctr.counter;
            dispatch(saveResult(result));
        }, 2000);
    }
};
```

## Using Utility Functions (Cleaning up reducer)

create a file named `utility.js` under `store`

Example
```jsx
// utility.js
export const updatedObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};
```

```jsx
// counter.js
import { updateObject } from '../utility';
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INCREMENT:
            return updateObject(state, {counter: state.counter + 1});

        case actionTypes.DECREMENT:
            return updateObject(state, {counter: state.counter - 1});
    
        case actionTypes.ADD:
            return updateObject(state, {counter: state.counter + action.val});

        case actionTypes.SUBTRACT:
            return updateObject(state, {counter: state.counter - action.val});
        default: break;
    }
    return state;
};
```

## A Leaner Switch Case Statement

Instead of handling the logic within the switch case, we can outsource it into its own function.

Example
```jsx
// reducer/result.js
const deleteResult = (state, action) => {
    const updatedArray = state.results.filter(result => result.id !== action.resultElId);

    updateObject(state, { result: updatedArray });
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.result})
            }
        case actionTypes.DELETE_RESULT:
            // const id = 2;
            // const newArray = [...state.results];
            // newArray.splice(id, 1)
            return deleteResult(state, action);
        default: break;
    }
    return state;
};
```

## An Alternative Folder Structure

Instead of having a single `store` folder which handle all the redux's stuff, you can have individual `store` folder inside each of the your `container` which `store` that include `reducer` and `actions`

## Diving Much Deeper

https://redux.js.org/recipes/structuringreducers/immutableupdatepatterns
https://redux.js.org/recipes/usingimmutablejs

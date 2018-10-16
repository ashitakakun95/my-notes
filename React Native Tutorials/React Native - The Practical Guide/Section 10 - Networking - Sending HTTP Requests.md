# Section 10 - Networking - Sending HTTP Requests

1. `npm install redux-thunk --save`
2. apply middleware to redux store
    - `import { applyMiddleware } from 'redux';` in `configureStore.js`




How to invoke Redux Thunk?

when the function inside redux return a function instead of an object

Instead of 
```jsx
export const addPlace = (placeName) => {
    return {
        type: ADD_PLACE,
        placeName
    };
};
```
s
Do this
```jsx

```
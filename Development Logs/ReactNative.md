# React Native

Always remember to `return` something inside the `this.setState` function.

Example

```jsx
placeDeletedHandler = index => {
    this.setState(prevState => {
        return {
            places: prevState.places.filter((place, i) => {
                return i !== index;
            })
        }
    });
};
```

---

Note: Do not use Integer data type for component's key property

Solution

```jsx
this.setState(prevState => {
    return {
        places: prevState.places.concat({key: Math.random().toString(), value: placeName}),
    };
});
```

## Blank Screen?

Check if your code is correct

Most problem come with redux debug tool initialization

```jsx
// configureStore.js

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
```

this is the code that might causes debug error

## App Stop Working (After implement navigation)?

check your `MainActivity.java` file in android, do not comment out the first two line

should be something like this

```jsx
// DO NOT COMMENT OUT
package com.teleappmobile;

import com.facebook.react.ReactActivity;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {

}
```
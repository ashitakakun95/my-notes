# Section 15: Adding Redux To Our Project

## Installing Redux and React Redux(Plus Initial Setup)

1. `npm install react-redux redux --save`
2. create a folder under `src` named `store` with files ie. `reducer.js` and `actions.js`

```jsx
// src/store/actions.js

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
```

```jsx

```

3. Add those config within your `index.js` file. If you're using `routes` for your app, then you should wrap the `Provider` around the route.

```jsx
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';

const store = createStore(reducer);

const app = (
    // connect our app to the store
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
```

Note: Remember we'll need different way to handle `async` request like fetching data from firebase or nodeJS API.

## Finishing the Reducer for Ingredients

- Learn how to create deep clone for objects

Example
```jsx
// reducer.js

const initialState = {
    const initialState = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: STARTING_PRICE,
    };
}

// when there's a nested object wtihin object
// simply return {... state} will simly return the old object,
// ingredient in this case.
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients
                }
            }
            break;
    /// code
    }
}
```

## Connecting the Burger Builder Container to our Store

Now with the setup of redux, we can use it in our application. At first, we'll work on the container that uses those data.

Example - Initialization
```jsx
// src/containers/BurgerBuilder.js

import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

// initializations
// these will fetch the state from the store
// declare these initialization only when you need it
const mapStateToProps = state => {
    // ings just a naming
    return {
        // state.ingredients must match the name declared in reducer
        ings: state.ingredients
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    }
}

// the arguments for connect will be mapStateToProps and then mapDispatchToProps
// pass null if there's none
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));
```

Then we passed the declared props into our components and accessing then using `props`

`props.ings` to access the `props`'s state
`props.onIngredientAdded` to access the `props`'s function.

## Adjusting Checkout and Contact Data

So with the `Redux` setup, the components now can access to those state by adding the redux HOC to it.

# React

## 16 September 2018 - copy of object

The Wrong Way

```jsx
const burger = this.state.burger;

this.setState({
  /// code
});
```

This will actually manipulate the actual state of the component as the burger is now a pointer to the component's state.

The Correct Way

```jsx
const burger = {...this.state.burger};

this.setState({
  /// code
})
```

## Try not to use inline setStaet property

Example:

```jsx
burgerStarted () {
        const ingredients = {
            ...this.state.ingredients
        }
 
        // Go through ingredients and add the total amount of ingredients added.
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
 
        return sum > 0;
    }
 
// Then in my BuildControls component, I set this prop.
purchasable={this.burgerStarted()};
```

You can use methods but the downside indeed is that they will re-run on every re-render cycle - even if the source of the new cycle is not related to this method (or the data used in it) at all. That's why I'd not recommend using too many methods from inside your JSX code.

## `forEach` vs `map`

Occasionally, `forEach` will not work, so use `map` instead for array and you can even pass index as well.

```jsx
yourArray.map(item, index) => {
  /// code
}
```

## Multiple `classes`

Remember to join the array of multiple classes

```jsx
className={[classes.Button, classes[btnType]].join(' '));}
```

## Switch's Default Case in Redux

In redux's reducer, default case in `switch` statement should return `state` or error message will be invoke.

## Undefined during initialization error - Redux
Error: Reducer "errors" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.

Check your switch case if default return `...state` instead of break.
# Overall Notes

## Passing down function with parameters to children component

Often we'll declare the function in the parent class then pass it down to its nested component.

Example
```jsx
// parent component
return (
    <div className={ classes.BuildControls }>
        { controls.map(control => (
            <BuildControl 
                key={ control.label }
                label={ control.label }
                addIngredient={ () => props.addIngredient(control.type) } />
        )) }
    </div>
);
```

```jsx
// child component
return (
    <div className={ classes.BuildControl }>
        <div className={ classes.Label }>{ props.label }</div>
        <button className={ classes.Less }>Less</button>
        <button 
            className={ classes.More }
            onClick={ props.addIngredient }>More</button>
    </div>
);
```

Note: Remember to add actual eventListener to the component for the child(ie. onClick, etc)


## Working with Async Code(SetState)

Example
```jsx
this.setState(
    {
        totalPrice: newPrice,
        ingredients: updatedIngredients
    }
)
this.updatePurchaseState();
```

~~The `updatePurchaseState` method checks on ingredient amount and update the purchase state. Then issue in this code is that the setState is async, so the updatePurchaseState is invoke during/before the `setState` method, so the `updatePurchaseState` will get the old value from ingredient.~~

## Dynamic Component's Class Name

Custom component name depending on the passed in prop value

Example: second class name will depends on the `buttonType` value
```jsx
const Button = (props) => {
    return (
        <button
            className={[classes.Button, classes[props.buttonType]].join(' ')}
            onClick={ props.clicked }>{ props.children }</button>
    );
};
```

## Adding Assets Dynamically

Example(Wrong)
```jsx
<img src="../../assets/images/burger-logo.png" />
```

Example(Correct, using import first)

```jsx
import BurgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => {
    <div>
        <img src={BurgerLogo} alt="Burger" />
    </div>
}
```

It just means we make webpack aware of the fact that we're using this image and webpack will then handle this image with a special plug-in or a special module that was added to webpack, to its config, will handle the image, will basically copy it over to the destination directory it creates, again only in memory during development and we'll even optimize the image.

## Passing Boolean Props

When passing boolean props, we can shorten it down by omit the passing value.

Example

```jsx
// Parent
<NavigationItem link="/" active>Burger Builder</NavigationItem>

// Child
return (
    <li className={ classes.NavigationItem }>
        <a
            href={ props.link }
            className={ props.active ? classes.active : null }
            >{ props.children }</a>
    </li>
);
```
# Section 12: Adding Routing to our Burger Project

## Navigating to the Checkout Page

By nesting your Component in the `<Route />`, that component will have the special access to the `props` but not it's child element. To access the props from the child element, we'll need to pass down the props, or simply use higher order component to wrap around the component.

Example BurgerBuilder that has Burger component
```jsx
import { withRouter } from 'react-router-dom';

const Burger = (props) => {
  /// code
}

export default withRouter(Buger)
```

## Parsing Ingredients via Query Parmas

We'll be using `pathname` and `search` within `props.history.push`

`encodeURIComponent` which simply encodes elements such that they can be used in the URL

Example
```jsx
const queryParams = [];
for (let i in this.state.ingredients) {
    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
}

const queryString = queryParams.join('&');

this.props.history.push({
    pathname: '/checkout',
    search: '?' + queryString
});
// Output: checkout?bacon=1&cheese=1&meat=1&salad=1
```

Then to parse the query in the route that uses it

```jsx
componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
        // ie. ['salad', '1']
        ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients});
}
```

## Navigating to the Contact Data Component

Remember if you're using nested route, instead of hardcoding the parent route, use `this.props.match.path` instead

```jsx
<Route path={this.props.match.path + '/contact-data'} />
```

## Order Submission & Passing Data Between Pages

To pass props to component within the `<Route />`

Example
```jsx
<Route 
    path={this.props.match.path + '/contact-data'} 
    render={() => (<ContactData ingredients={this.state.ingredients}/>)}/>
```

## Order Submission & Passing Data Between Pages

Example: More complex query passing
```jsx
// this will pass an object with totalPrice variable
const queryParams = [];
for (let i in this.state.ingredients) {
    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
}

queryParams.push('price=' + this.state.totalPrice);

const queryString = queryParams.join('&');

this.props.history.push({
    pathname: '/checkout',
    search: '?' + queryString
});
```

```jsx
componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let param of query.entries()) {
        // ie. ['salad', '1']
        if (param[0] === 'price') {
            totalPrice = param[1];
        } else {
            ingredients[param[0]] = +param[1];
        }
    }
    this.setState({ingredients, totalPrice});
}
```

Way to use `props.history` in the child by passing down props

Example:
```jsx
<Route path={this.props.match.path + '/contact-data'} 
  render={(props) => (<ContactData ingredients={this.state.ingredients} this.state.totalPrice} {...props} />)}/>
```

## Implementing Navigation Links

When using `<NavLink />` active class will be toggle. But styling the active class within css module can be tricky.

Example
```jsx
.NavigationItem a.active {
  ///style
}
```

This will actually generate unique ID for the active class so the style won't take place since `Navlink` only add pure `active` class. Therefore we'll need to set up the active class name.

Example
```jsx
// parent
<NavigationItem link="/" exact>Burger Builder</NavigationItem>

<NavLink 
    to={props.link}
    exact={props.exact}
    activeClassName={classes.active}>{props.children}</NavLink>
```

Note: keep in mind that if the link is direct to `'/'`, then you'll need to add the exact attribute to it or else every `NavLink` will have the styling.
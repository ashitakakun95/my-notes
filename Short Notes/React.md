# React

## Working with Multiple Page App

if you are creating a multi page project you would create multiple such projects here with create react app


## Styling React Components & Elements

### Using Radium for Media Queries

[radium - npm](https://www.npmjs.com/package/radium)

`npm install radium --save`

At first you'll need to import the dependency and then wrap it around your component

```jsx
import Radium from 'radium';

// higher order component
export default Radium(App);
```

Note: Higher Order Component is simply just a component that wraps around your component, adding or injecting some extra functionality.

In this case, some extra syntax which will parse your styles and understand some extra features you can.

Example

```jsx
render() {
  const style = {
    color: 'white',
    ':hover' : {
      backgroundColor: 'purple'
    }
  }
}
```

To working with `@keyframe`(animation) or `media queries`, you'll need to wrap your entire application `<App>` within `<StyleRoot>`

```jsx
// Person.js
const person = (props) => {
  const style = {
    '@media (min-width: 500px)': {
      width: '450px'
    }
  }
}

// App.js
import Radium, { StyleRoot } from 'radium';

return (
  <StyleRoot>
    <div className="App">
      Your code
    </div>
  </StyleRoot>
)
```

### Enabling and Using CSS Modules

Another option to style specifically onto one component without affecting other component, css that only applies to one and only one component is to use CSS module

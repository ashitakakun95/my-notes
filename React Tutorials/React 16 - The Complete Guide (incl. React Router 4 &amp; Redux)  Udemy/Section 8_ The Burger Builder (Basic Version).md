# Section 8: The Burger Builder (Basic Version)

## Setting up the Project

To use css module, we'll need to eject the project. `npm run eject`

Now, we'll configure the css module `config/webpack.config(both webpack config)`

```jsx
test: /\.css$/,
use: [
  require.resolve('style-loader'),
  {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 1,
        // add these two lines
      modules: true,
      localIdentName: '[name]__[local]__[hash:base64:5]'
    },
  },
```

## Adding Prop Type Validation

Note:
### Containers and Components

Typically you'll have `container` and `component` folders for your react app. `container` will be used to store `stateful` component whereas `component` will used to store `stateless component`.

But, one thing that should be understood is that `container` doesn't just mean that you're using the `class` keyword but instead you're managing the state with it and stateless component can use `class` declaration as well and you're using it for PropType Validation etc that doesn't deal with managing the state.

Example
```jsx
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render() {
        switch(this.props.type) {
            /// code
        }
        return ingredient;
    }
}

// this tells that you'll need a prop type named 'type' with String datatype
BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}
```
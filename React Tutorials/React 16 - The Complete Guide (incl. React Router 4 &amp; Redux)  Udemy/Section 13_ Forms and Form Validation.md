# Section 13: Forms and Form Validation

DOM >HTML >attributes are case insensitive and React 16 insists on lowercase for HTML attribute names. 

`inputtype` is a React `props`, but, in this case, it represents a DOM HTML input element (IMPORTANT distinction). 

When the React code is converted into standard HTML, the DOM >HTML >custom attribute should not be ... 

`<input inputType="input" ... >` 

For standard props names, camelCase can be used, this is a new React 16 rule. 

Later, this is **changed** (again) to `elementType`, and the input elements are `map()`ed. 

https://www.udemy.com/react-the-complete-guide-incl-redux/learn/v4/questions/4124814

## Setting up a JS config for the form

Example Input

```jsx
<Input inputtype="input" type="text" name="name" placeholder="Your name"/>
<Input inputtype="input" type="text" name="email" placeholder="Your email"/>
<Input inputtype="input" type="text" name="street" placeholder="Street"/>
<Input inputtype="input" type="text" name="postalCode" placeholder="Postal Code"/>
```

Then above the state we can create the pattern for the input

Take a look at the Example Code.
# Section 11: Multi-Page-Feeling in a Single-Page-App: Routing

The idea behind a single page application(SPA) is to have a single html file.

To have multiple page in SPA, the trick is not to have multiple html files but to render different pages for different path.

So we don't really have different files but simply we re-render parts off that single page or maybe

the entire single page depending on which path the user navigated to in our application.

`npm install react-router react-router-dom`, `react-router-dom` is used to render something.

Note: `react-router-dom` package are not created by Facebook.

Example of using the routing

```jsx
// App.js
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Blog />
                </div>
            </BrowserRouter>
        );
    }
}
```

Now the router has wrapped around the application, now we can use the router feature inside this wrapping components.

With this implementation, there should be more custom component which will load only when we visit the specific route.

So there should be more containers in this case.

### react-router vs react-router-dom

Section 11, Lecture 179
We installed both react-router  and react-router-dom . Technically, only react-router-dom  is required for web development. It wraps react-router  and therefore uses it as a dependency. 

We don't need to install react-router  on our own for it to work. You can omit this installation step, I left it in there for historic reasons and because I like to emphasize that the main package is named react-router. If you ever search for assistance, you probably want to search for "react router" - that's the name of the package.

Example

```jsx
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

class Blog extends Component {

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: 'quick-submit=true'
                            }}>New Post</Link></li>
                        </ul>
                    </nav>
                </header>
                <Route path="/" exact component={ Posts } />
                <Route path="/new-post" component={ NewPost } />
            </div>
        );
    }
}

export default Blog;
```

## Absolute vs Relative Paths (Article)

Section 11, Lecture 188
You learned about ```<Link>``` , you learned about the to  property it uses.

The path you can use in to can be either absolute or relative. 

Absolute Paths
By default, if you just enter to="/some-path"  or to="some-path" , that's an absolute path. 

Absolute path means that it's always appended right after your domain. Therefore, both syntaxes (with and without leading slash) lead to example.com/some-path .

Relative Paths
Sometimes, you might want to create a relative path instead. This is especially useful, if your component is already loaded given a specific path (e.g. posts ) and you then want to append something to that existing path (so that you, for example, get /posts/new ).

If you're on a component loaded via /posts , to="new"  would lead to example.com/new , NOT example.com/posts/new . 

To change this behavior, you have to find out which path you're on and add the new fragment to that existing path. You can do that with the url  property of props.match :

```jsx
<Link to={props.match.url + '/new'}>
```
will lead to example.com/posts/new  when placing this link in a component loaded on /posts . If you'd use the same ```<Link>```  in a component loaded via /all-posts , the link would point to /all-posts/new .

There's no better or worse way of creating Link paths - choose the one you need. Sometimes, you want to ensure that you always load the same path, no matter on which path you already are => Use absolute paths in this scenario.

Use relative paths if you want to navigate relative to your existing path.

## Parsing Query Parameters & the Fragment
    
Section 11, Lecture 192
You learned how to extract route parameters (=> :id  etc). 

But how do you extract search (also referred to as "query") parameters (=> ?something=somevalue  at the end of the URL)? How do you extract the fragment (=> #something  at the end of the URL)?

Query Params:
You can pass them easily like this:

```<Link to="/my-path?start=5">Go to Start</Link> ```

or

```jsx
<Link 
    to={{
        pathname: '/my-path',
        search: '?start=5'
    }}
    >Go to Start</Link>
```
React router makes it easy to get access to the search string: props.location.search .

But that will only give you something like ?start=5 

You probably want to get the key-value pair, without the ?  and the = . Here's a snippet which allows you to easily extract that information:
```jsx
componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
        console.log(param); // yields ['start', '5']
    }
}
```
URLSearchParams  is a built-in object, shipping with vanilla JavaScript. It returns an object, which exposes the entries()  method. entries()  returns an Iterator - basically a construct which can be used in a for...of...  loop (as shown above).

When looping through query.entries() , you get arrays where the first element is the key name (e.g. start ) and the second element is the assigned value (e.g. 5 ).

Fragment:
You can pass it easily like this:

```jsx<Link to="/my-path#start-position">Go to Start</Link>```

or

```jsx
<Link 
    to={{
        pathname: '/my-path',
        hash: 'start-position'
    }}
    >Go to Start</Link>
```
React router makes it easy to extract the fragment. You can simply access props.location.hash .

## Navigating Programmatically

Occasionally you might not want to wrap a ```<Link />``` tag around your element but instead you wanna add a event listner to it and navigate to the domain programmatically. The reason is because you might want to do something before redirect to the link like sending a http request etc.

Example
```jsx
postSelectedHandler = (id) => {
    this.props.history.push({pathname: '/' + id});
}
```

## Understanding Nested Routes

Sometimes we may want to nest our routes. Example in the App page we have route that navigate to render the `Posts` component, then inside the `Posts` component, we can also can create `<Route>` component which leads to its own path.

Note:

If the parent route is an `exact` route, then the child route, example `/:id` will not be reach. The reason is because the route is nested so it will go through the parent route first and the child route with ID will not match the parent route so it will never render the child component.

To fix this, we'll have to configure the route order using `<Switch>` and by that we remove the exact attribute and reorder the routes.

Note 2:

Let's say the parent's route starts with `/posts`, in order for the child route to have the same route but dynamically we can use

```jsx
// parent
<Route path="/posts" component={Posts} />
```

```jsx
// child
<Route path={this.props.match.url + '/:id'} component={fullPost} />
```

## Understanding Dynamic Routes

When we visit a certain route, the component will be render. Example `/posts` will render `Posts` component which includes a lists of `Post` element. Therefore,`ComponentDidMount` will be executed. When we clicked on the '`Post`', the route changed(Using `<Link>`) but `ComponentDidMount` will not be execute this time because React Router will not replace all the component all the time. Element on the page will not be re-render again. Instead, use `ComponentDidUpdate` so that the element can be update and re-render again.

## Redirect Requests

```jsx
import { Redirect } from 'react-router-dom';

<Switch>
    <Route path="/new-post" component={ NewPost } />
    <Route path="/posts" component={ Posts } />
    <Redirect from="/" to="/posts" />
</Switch>
```
`<Redirect />` should be nest within the `<Switch />` tag.

## Conditional Redirects

To use conditional redirect, maybe we would add new state to the component like `submitted`.

Example

```jsx
render() {
    let redirect = null;
    
    if (this.state.submitted) {
        redirect = <Redirect to="/posts" />
    }
    return (
        /// code
        { redirect }
    )
}
```

## Using the History Prop to Redirect(Replace)

Redirect will essentially replace the stack of the history prop, meaning that you won't able to get to the previous page after clicking the `back` button. Programmatically will be as follow

Example

```jsx
axios.post('/posts', data)
    .then(response => {
    this.props.history.replace('/posts');
})
```

So when you want it to push it to stack which allows to redirect to previous page

```jsx
axios.post('/posts', data)
    .then(response => {
        this.props.history.push('/posts');
    });
```

## Working with Guards

Example, route that only allowed access to authenticated user.

```jsx
// Blog.js
state = {
    auth: false
}

{ this.state.auth ? <Route path="..." /> : null }
```

or you can work on the component's `ComponentDidMount`

```jsx
componentDidMount() {
    // if unauth => this.props.history.replace('/posts');
}
```

## Handling 404 Page

Example
```jsx
<Switch>
    Route 1, 2, 3, 4,...
    // simply put it at the last because all the page are not match
    // omit the path attribute
    <Route render={() => {something} or component={404}} />
</Switch>
```

Note:

`Redirect` and Error Page will not work together

## Lazy Routing(Code Splitting)

When we create a `<Route />` component, even though we didn't visit the route, the component will still pre-load to the page which can be an performance issue as users might not visit all the page. (developer tools > Network to see all the request made)

By using lazy routing, we'll able to load the page only when user visit the route.

Note:

Lazy Routing/Code Splitting depends heavily on webpack configuration which comes along using `create-react-app`

```jsx
import Posts from './Post/Posts';
```
So in the usual code, whenever we write code like this, we're telling webpack behind the scenes about this dependencies which include it in the global bundle.

As for lazy loading, it will be the opposite, we'll load it only when needed. But still we'll need to tell webpack to dynamically prepare some extra bundle for this potentially loaded code.

Example

```jsx
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
    // dynamic import syntax
    return import('./NewPost/NewPost');
});

/// Within the class

<Switch>
    <Route path="/new-post" component={AsyncNewPost} />
</Switch>
```

This dynamic import syntax means whatever comes between the parentheses is only imported when the function passed in is executed which only execute only when the `AsyncNewPost` is invoke to render to the screen.

`render -> AsyncNewPost -> asyncComponent -> import`

Now check the developer tools if the component request made only when click(chunk.js)

## Routing and Server Deployment(& basename setup)

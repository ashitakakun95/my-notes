# React and Redux

Redux is another state container for redux.

In case which 
1. the app is very big that consists a lot of components
2. there are states that is often used around the app, which will be used around between the components

then you might wanna consider using `Redux` in your application.

Reason? Passing `state` as `props` from component to component and container to container in a bigger app can be very cumbersome.

It's not advisable to use `Redux` in smaller app because the setup can be overkill(packages, few more files and initialization) which can hurdle the development and complexity of the app.
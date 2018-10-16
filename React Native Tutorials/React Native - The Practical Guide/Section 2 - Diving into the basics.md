# Section 2 - Diving into the basics

## Creating a new project

`create-react-native-app your-app-name`
`npm start`
`npm eject` to have a pure react native project

https://facebook.github.io/react-native/docs/getting-started
Under `Components` Section, these are the component list that you can use in your react app

## MUST READ: Create-React-Native-App

### Section 2, Lecture 15

Important - don't skip this!

At the moment, please DON'T use create-react-native-app (as we'll do in the next lecture). In the next lecture, we'll eject (we'll run `npm run eject`) and currently, the setup we get there will not work (due to a bug).

----

You can essentially skip the next lecture and follow the steps below!

----

But no worries, you can still get a working setup by following the setup steps outlined here: https://facebook.github.io/react-native/docs/getting-started.html (choose "Building Projects with Native Code").

On that page, choose your operating system and then run the appropriate steps.

For example, for macOS, you would execute these commands:

`brew install node`

`brew install watchman`

`sudo npm install -g react-native-cli`

Adjust XCode as described in the linked article (https://facebook.github.io/react-native/docs/getting-started.html#xcode).

`react-native init yourproject`

`cd yourproject`

`react-native run-ios`

Whenever I run `npm run ios` in the course, you run `react-native run-ios`

Whenever I run `npm run android`, you run `react-native run-android`

This setup is then similar to the one I use in the course, no worries.

If you get an error when launching your app, please try these commands:

`npm install --save-dev @babel/core`
`npm install --save-dev @babel/runtime`
Thereafter, try running the app again (=> `react-native run-ios`). If that fails, simply run it again - the first run does some initialization work.

https://facebook.github.io/react-native/docs/getting-started.html

## How to Use the Attached Code

### Section 2, Lecture 17

Please don't skip this lecture!

Of course, you'll receive the code of this course. You can find it attached to some lectures throughout the course modules (whenever we finish some meaningful block essentially) and ALWAYS attached to the last lecture of each module.

The attached code, however, is NOT a finished project you could just run. The reason for this is that uploads would explode in size since I'd need to attach the iOS and Android projects, too.

But I provide everything you need: The entire source code we write. You can always create a new (ejected) project and copy my code into it. 

Or simply use my code files to compare them to yours - the filenames will be exactly the same as shown in the videos.


https://github.com/facebook/react-native/issues/21310

## A good development setup

using `ctrl + M` on the screen of the simulator to toggle developer menu

## Styling on React Native

https://github.com/vhpoet/react-native-styling-cheat-sheet

By default, the parent container will only has a width of child element, just like `inline-block` or `width: auto`

`<View>` has a default styling of `display: flex`?

## Listening to Touch Events

Unlike DOM element in the browser which elements can have onClick listener, not all React Native component has such listener. Example, from the documentation, `<View>` component will not have `onPress` property/event.

So if you want to add event listener to the component, one of the way by React Native is to wrap the item you wanted to add listener to to give it a 'touch' event.

```jsx
import {
    View,
    Text,
    StyleSheet,
    Touchable,
} from 'react-native';

const ListItem = (props) => {
    return (
        <Touchable
            onPress={props.onItemPressed}>
            <View 
                style={styles.listItem}
                >
                <Text>{props.placeName}</Text>
            </View>
        </Touchable>
    );
};
```

So `<TouchableWithoutFeedback>` basically allows us to register touch events on the element it wraps and you must only have one child element, not adjacent ones. This typically is a view or often is a view but theoretically, it could also just be a text, it doesn't have to be a view. Now `<TouchableWithoutFeedback>` is named like this because you get no visual feedback when touching.

There're some useful property like `onLongPress` etc.

There're other kind of `touchable` component with different animation like `<TouchableOpacity>` which gives nice opacity changes when touched.

`<Touchable>` is not a component you use as is - instead, you need to use one of its derived child classes. The error message is unfortunately not straightforward regarding this.

Example
``` jsx
<TouchableOpacity
    onPress={props.onItemPressed}>
    <View 
        style={styles.listItem}
        >
        <Text>{props.placeName}</Text>
    </View>
</TouchableOpacity>
```

## Using a ScrollView

Unlike browser, when the content gets too long(excced height), it doesn't provide a scroll. So we'll need to use `ScrollView` component.

Simply replace `<View>` with `<ScrollView>`

Example

```jsx
const placesOutput = props.places.map((place, index) => (
    <ListItem 
        key={index} 
        placeName={place}
        onItemPressed={() => props.onItemDeleted(index)} />
));

return (
    <ScrollView style={styles.listContainer}>
        {placesOutput}
    </ScrollView>
);
```

## Rendering Lists Correctly

Because wrapping up a long list(very long) in a single page can affect performance. 

By using `<ScrollView>`, it will render everything. Let's say 2000 item, then it will render everything inside a scroll container, as for `<FlatList>`, it will only render the item that render in the container first. Let's say the container has height of `100px` then it will render list for that height and allows you to render a subset of items and, on scroll, render additional items.

Using `<FlatList>` can be different

Example

```jsx
// we need to concat key value for the insert item
placeAddedHandler = (placeName) => {
    this.setState(prevState => {
        return {
            places: prevState.places.concat({key: Math.random(), value: placeName}),
        };
    });
};
```

to handle different kind of data list, we can use `<SectionList>` which perform like `<FlatList>`.

## Adding Static Image

Just like browser's image, the image will render in its original format size.

You also can set the version for the image which the app will automatically pick for you. Check it on documentation.

you also can set the `resizeMode` property for your image that works like background image size.

## Using Network Images

you just need to pass one more property, `uri` when passing the image url

Example
```jsx
placeAddedHandler = (placeName) => {
    this.setState(prevState => {
        return {
            places: prevState.places.concat({
                key: Math.random().toString(), 
                name: placeName,
                image: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg/1200px-Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg' }
            }),
        };
    });
};
```

Note: Do check out Guides > Image on documentation


## Adding a Modal


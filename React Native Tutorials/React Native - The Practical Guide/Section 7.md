Why use `StyleSheet.create` and not just passing normal `styles` object.

1. It will validate the styles
2. It 'sends them to native code' more efficiently

https://github.com/vhpoet/react-native-styling-cheat-sheet

There'll be default styling for individual platform. Example input by android will have underline styling. To disable that lookup the documentation and set to whatever value.

Example

```jsx
<TextInput 
    placeholder='Your Email'
    style={styles.input}
    underlineColorAndroid='transparent'
    />
```

You might want to create a component `src/components/UI/DefaultInput` which holds component for both platform.

---

The order of the attributes for the component matters. For example

```jsx
<TextInput 
    underlineColorAndroid='transparent'
    // we're setting this so that there's no need to explicity bind the eg. placeholder again
    {...props}
    style={styles.input}
/>
```

with the passing of `style={styles.myInput}` will not take effect because `style={styles.input}` come after `{...props}`.

In case which you want to explicitly pass style to the component,

```jsx
style={[style.input, {borderWidth: 1}]}
```

Unlike browser, you may set the parent element with `font-size` or `font-family` to apply to its respective child element, in mobile you can't. ie. Setting `fontSize` on `<View>` element will invoke error.

---

In order to apply `font-family` to text component, because we can't apply it at parent component, so we'll have to create a `HOC` that allow us to wrap around `<Text>` component.

```jsx
import React from 'react';
import { Text } from 'react-native';

const MainText = (props) => {
    return (
        <Text style={styles.mainText}>
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    mainText: {
        color: '#bbb',
        // fontFamily etc.
    }
})

export default MainText;
```

```jsx
<MainText>
    <HeadingText style={styles.textHeading}>Please Log In</HeadingText>
</MainText>
```

---

`<ImageBackground>` is like a `HOC` component which you need to wrap around component to apply background image.



Note: Remember to set the width or else an erro will be thrown.

---

Create your own custom button using `<TouchableHighlight>`.

Example

```jsx
import React from 'react';
import { 
    TouchableHighlight,
    Text,
    View,
    StyleSheet
} from 'react-native';

const ButtonWithBackground = (props) => {
    return (
        <TouchableHighlight onPress={props.onPress}>
            <View style={[styles.button, props.style]}>
                <Text>{props.children}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5
    }
});

export default ButtonWithBackground;
```

---

To style a `<ScrollView>`, you'll need to use `contentContainerStyle` instead of `style`

---

the idea of declaring function at the 'parent' component which and pass down into child component is that the 'parent' component can have the value of input

---

You can use one of the React Native's API to build different styling or component for different platform. Example using `<TouchableOpacity>` for android whereas `<TouchableNativeFeedback>` for iOS.

Example

```jsx
import { Platform } from 'react-native';

if (Platform.OS === 'android') {
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            {content}
        </TouchableNativeFeedback>
    );
}
if (Platform.OS === 'ios') {
    return (
        <TouchableOpacity onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    );
}
```

You also can do inline checking for different platform

```jsx
Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'map', 30)
```

https://nativebase.io/

## The Responsive 'Styling' Problem

The idea is to get the 'dimension(size)' of the screen then apply different style just like media queries in css

Example
```jsx
import { 
    Dimensions
} from 'react-native';


render() {

    let headingText = null;

    if (Dimensions.get('window').height > 500) {
        headingText = (
            <MainText>
                <HeadingText style={styles.textHeading}>Please Log In</HeadingText>
            </MainText>
        )
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={backgroundImage} 
                style={styles.backgroundImage}
            >
                {headingText}
                <ButtonWithBackground color='#29AAF4'>Switch to Login</ButtonWithBackground>
                <View style={styles.inputContainer}>
                    <DefaultInput 
                        placeholder='Your Email'
                        style={styles.input}
                        />
                    <View style={styles.passwordContainer}>
                        <View style={styles.passwordWrapper}>
                            <DefaultInput 
                                placeholder='Password'
                                style={styles.input}
                                />
                        </View>
                        <View style={styles.passwordWrapper}>
                            <DefaultInput 
                                placeholder='Confirm Password'
                                style={styles.input}
                                />
                        </View>
                    </View>
                    <ButtonWithBackground 
                        color='#29AAF4'
                        onPress={this.loginHandler}>Submit</ButtonWithBackground>
                </View>
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        borderWidth: 1,
        borderColor: '#bbb',
        backgroundColor: '#eee'
    },
    passwordContainer: {
        flexDirection: Dimensions.get('window').height > 500 ? 'column' : 'row',
        justifyContent: 'space-between'
    },
    passwordWrapper: {
        width: Dimensions.get('window').height > 500 ? '100%' : '45%'
    }
});
```

But with this approach, the responsiveness still doesn't work well. We'll need to reload the app for different potrait for it to work.

```jsx
state = {
    viewMode: Dimensions.get('window').height > 500 ? 'potrait' : 'landscape'
};

constructor(props) {
    super(props);
    Dimensions.addEventListener('change', (dims) => {
        this.setState({
            viewMode: Dimensions.get('window').height > 500 ? 'potrait' : 'landscape'
        })
    })
}

render() {

    let headingText = null;

    if (this.state.viewMode === 'potrait') {
        headingText = (
            <MainText>
                <HeadingText style={styles.textHeading}>Please Log In</HeadingText>
            </MainText>
        )
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={backgroundImage} 
                style={styles.backgroundImage}
            >
                {headingText}
                <ButtonWithBackground color='#29AAF4'>Switch to Login</ButtonWithBackground>
                <View style={styles.inputContainer}>
                    <DefaultInput 
                        placeholder='Your Email'
                        style={styles.input}
                        />
                    <View style={
                        this.state.viewMode === 'potrait'
                            ? styles.potraitPasswordContainer
                            : styles.landscapePasswordContainer
                        }>
                        <View style={                            
                            this.state.viewMode === 'potrait'
                                ? styles.potraitPasswordWrapper
                                : styles.landscapePasswordWrapper
                            }>
                            <DefaultInput 
                                placeholder='Password'
                                style={styles.input}
                                />
                        </View>
                        <View style={                            
                            this.state.viewMode === 'potrait'
                                ? styles.potraitPasswordWrapper
                                : styles.landscapePasswordWrapper
                            }>
                            <DefaultInput 
                                placeholder='Confirm Password'
                                style={styles.input}
                                />
                        </View>
                    </View>
                    <ButtonWithBackground 
                        color='#29AAF4'
                        onPress={this.loginHandler}>Submit</ButtonWithBackground>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        borderWidth: 1,
        borderColor: '#bbb',
        backgroundColor: '#eee'
    },
    landscapePasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    potraitPasswordContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    landscapePasswordWrapper: {
        width: '45%'
    },
    potraitPasswordWrapper: {
        width: '100%'
    }
});
```

## Cleaning Up Dimensions Listeners

Always detach event listener for component that doesn't work in the screen.

```jsx
constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
};

componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
};

updateStyles = (dims) => {
    this.setState({
        viewMode: dims.window.height > 500 ? 'potrait' : 'landscape'
    });
};
```

Note: You may want to refactor your code into function. ie. `updateStyles`

## Styling Navigation Items

Read the documentation on `tabStyle` for iOS and `appStyle` for android.

## Animation API

```jsx
import { Animated } from 'react-native';
```

## Configuring Text Input Components

Soft Keyboard is the keyboard within mobile. One of the problem is that we developer must think of is that the keyboard must not cover the input and suitable input should come along with it's type. ie. when inputting input, the keyboard should have @ key within keyboard or should it should be capitalize when first input.

The configuration can be found under Components > TextInput

You also can hide the input for password.

To Push the keyboard down when input,  we'll need to use `<KeyboardAvoidingView>`

and to dismiss keyboard when click somewhere else, well need to use the keyboard API

`import { KeyboardAvoidingView, Keyboard } from 'react-native';`

## KeyboardAvoidingView and ScrollView

Section 8, Lecture 129
Depending on which device you're using, you might encounter an issue on the SharePlace screen: The input for the place name might not scroll up when typing. Your soft keyboard might overlap it.

You can of course also use KeyboardAvoidingView  here. Actually, adding it should be super simple:

1) Add it to the imports

2) Replace the wrapping <View>  with <KeyboardAvoidingView behavior="padding" style={styles.container}> 

The problem just is the ScrollView . Your content won't scroll up automatically - but you can do that manually. So the input can be made visible.

Once you close the keyboard though, the padding is likely to stick around.

That's because ScrollView  + KeyboardAvoidingView  don't work together very well.

Check the following thread for a discussion on this + possible workarounds: https://github.com/facebook/react-native/issues/10765
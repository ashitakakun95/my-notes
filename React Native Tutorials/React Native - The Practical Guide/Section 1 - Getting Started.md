# Section 1 - Getting Started

https://facebook.github.io/react-native/docs/getting-started

`React Native` is a an awesome library which allows developers to build apps with React that ruuns on a native device, which are installed through an app store.

## What is React Native?

"Learn once, write everywhere"

The idea is that you learn React Native once then you can use it to write apps for the different platforms.

React native is not
- a web app running on mobile device
- a hybrid app like that build with Ionic or Cordova, where we have a web app running in a web view component in a native app wrapping our web app.

React native is a real native app. The JS code is going to stay JS and run in some extra thread spun up by the compoiled app, but the whole UI and everything is really compiled to native code. So, we're not building a web app running in some wrapper.

### Behind The Scene

```jsx
class App extends Component {
    render() {
        return (
            <View>
                <Text>Hello world!</Text>
            </View>
        )
    }
}
```

These are not DOM element, there's no `<div>` or `<span>` here. From those code, we're getting other component which can be compiled to native code because divs and spans won't be able to be compiled to native code.

## What Happens to JavaScript?

What about the JS logic that we write in React Native? Like logic or request that fetches data from a server. Is this also compiled to Java or Swift for the respective platform?

No.

JS is going to stay JS but the Native in the compiled app create a JS environment where our code can run similar to NodeJS where the code also runs without a browser.

## Creating Our First React Native App

`npm install -g create-react-native-app`

`create-react-native-app my-first-app`

Use cmd instead of git bash while doing this.

download Expo in your phone to scan the QR code provided.

after the create is done, cd into your app then `npm start`

then scan the QR code provided.

## Dealing with Limitations of React Native

- No or very little Cross-Platform Styling of Components
    - Unlike Ionic or other library, their component comes with very fancy animation and styling, with React Native, you'll need to implement that manually
- Only a basic set of pre-built components
    - just like styling, it only comes with some component and you'll need to build those component your own. ie Image Gallery
    - But there'll be third-party library for it.
- tools to create responsive designs but no responsiveness out of the box.

### React Native is a "Fast-Moving Target"

- New Versions Every Month
- Breaking Changes Do Happen
- High Dependency on Third-Party Packages That Also Change

Alternative comparison

1. Build Real Native App by learning Java and Swift respectively
2. Build PWA, issue is that users might not use a browser/OS supporting it
3. Use ionic or similar hybrid framework but it can have worse performance because of webview

## Course Requirement

If you want to develop an iOS app on Windows( the same is unfortunately true for Linux), this will not work; not that great at least.

You still can use the Expo app to preview the app but because Expo wraps your native app and doesn't actually install it on the device.

If you want to install it on the device or see it in a simulator, unfornately for iOS development, you'll need a Mac and there's no way around.

For android, you can build from both platform.

---

## Useful Resources & Links
### Section 1, Lecture 11

- Quickly get started (with create-react-native-app): https://facebook.github.io/react-native/docs/getting-started.html
- Keep the official docs in mind for the rest of the course: https://facebook.github.io/react-native/docs/tutorial.html
- The create-react-native-app Github repo: https://github.com/react-community/create-react-native-app
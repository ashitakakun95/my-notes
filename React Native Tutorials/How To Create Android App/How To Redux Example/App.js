import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';

// Register Screens
Navigation.registerComponent('my-first-app.AuthScreen', () => AuthScreen);

// Start a App
Navigation.startSingleScreenApp({
    screen: {
        screen: 'my-first-app.AuthScreen',
        title: 'Welcome'
    }
})
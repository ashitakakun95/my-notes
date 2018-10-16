# Section 5 - Linking and Using Third Party Libraries

## Installing Libraries

https://github.com/oblador/react-native-vector-icons

`npm install react-native-vector-icons --save`

Solely installing the package won't work, we'll need to add some things to our iOS and Android projects and code to connect this library to our native applications.

## Automatic Linking
Section 5, Lecture 59
In this module (and in this course in general), you learn how to manually link libraries. It's always important to be aware of happens behind the scenes and it's also not that difficult.

Additionally, a lot of libraries take some extra steps during the linking process which can't be automated.

For libraries that don't require such extra steps, there is an automated way of linking available though.

You'll need to install an extra package: react-native-cli 

It's actually installed locally in your project already but if you want to run commands with it, you need to install it globally.

Install it globally via npm install -g react-native-cli 

Thereafter, in your project folder, you can run react-native link  to automatically link all libraries that require linking.

Important: ALWAYS check the docs (e.g. on the Github repo page) of the library you're using! You definitely have to ensure that no additional steps are required!


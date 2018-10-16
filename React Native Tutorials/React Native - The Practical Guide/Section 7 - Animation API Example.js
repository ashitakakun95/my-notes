import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated
} from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
    // this constructor will needed for that screen that has menu button
    constructor(props) {
        super(props);
        // set an event that should be executed whenever some nav event occured
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    state = {
        // this state will determine whether the find place button should be render
        placesLoaded: false,
        removeAnimation: new Animated.Value(1)
    };

    // this funciton as well needed for that screen that has menu button
    onNavigatorEvent = (event) => {
        // log out the event to see what type of button triggered
        // console.log(event);
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left'
                })
            }
        }
    }

    itemSelectedHandler = (key) => {
        const selectedPlace = this.props.places.find((place) => {
            return place.key === key
        });

        this.props.navigator.push({
            screen: 'awesome-places.PlaceDetailScreen',
            title: selectedPlace.name,
            passProps: {
                selectedPlace
            }
        });
    }

    placesSearchHandler = () => {
        // this.setState({
        //     placesLoaded: true
        // });
        Animated.timing(this.state.removeAnimation, {
            toValue: 0,
            duration: 500, //miliseconds
            useNativeDriver: true
        }).start();
    };

    render() {
        let content = (
                <Animated.View
                    style={{
                        opacity: this.state.removeAnimation,
                        transform: [
                            {
                                scale: this.state.removeAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [12, 1]
                                })
                            }
                        ]
                    }}
                >
                    <TouchableOpacity onPress={this.placesSearchHandler}>
                        <View style={styles.searchButton}>
                            <Text style={styles.searchButtonText}>Find Places</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
        );

        if (this.state.placesLoaded) {
            content = (
                <PlaceList 
                    places={this.props.places}
                    onItemSelected={this.itemSelectedHandler}
                />
            );
        }

        return (
            <View style={
                this.state.placesLoaded
                 ? null
                 : styles.buttonContainer}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButton: {
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: 'orange',
        fontWeight: 'bold',
        fontSize: 26
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}

export default connect(mapStateToProps)(FindPlaceScreen);
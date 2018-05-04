import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import Background from '../background.js';

import Wallpaper from '../Wallpaper';
import Geocoder from 'react-native-geocoder';
const getLeftButtonsForAlarmList = () => {
  let leftButtons = []
  if(Platform.OS === 'android') {
    leftButtons = [{
      icon: require('../img/menu.png'),
      id: 'settingsMenu'
    }]
  }
  return leftButtons
}
class Main extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
        selectedTab: 'home',
        initialPosition: 'unknown',
        lastPosition: 'unknown',
        cityName: 'unknown'
    };
  }
  componentDidMount = () => {

     navigator.geolocation.getCurrentPosition(
        (position) => {
           const initialPosition = JSON.stringify(position);
           this.setState({ initialPosition });
        },
        (error) => alert(error.message),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
     );
     this.watchID = navigator.geolocation.watchPosition((position) => {
        const lastPosition = JSON.stringify(position);
        var cityName = {
           lat: position.coords.latitude,
           lng: position.coords.longitude
         };
        Geocoder.geocodePosition(cityName).then(res => {
          this.setState({cityName:res[0].locality});
       })
       .catch(err => console.log(err))

        this.setState({ lastPosition });
     });
  }
  componentWillUnmount = () => {
     navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
    if(this.state.cityName === 'unknown'){
      return (
        <View style={[styles.container2, styles.horizontal]}>
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
      )
    }else{
    return (
      <Wallpaper>
      <Background cityName={this.state.cityName}>
      </Background>
      </Wallpaper>

    );
  }
  }
  }
export default Main;



const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 50
   },
   boldText: {
      fontSize: 30,
      color: 'red',
   }
})

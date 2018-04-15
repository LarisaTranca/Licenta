import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated, Dimensions } from 'react-native';
import Geocoder from 'react-native-geocoder';
import type { WeatherModel } from '../../models/view';
import Background from '../background.js';
type State = {
  shift: Animated.Value;
  current: number;
};
class Main extends React.Component {
  state = {
        initialPosition: 'unknown',
        lastPosition: 'unknown',
        cityName: 'unknown'
     }
     watchID: ?number = null;
     props: Props;
     state: State;

     constructor(props: Props) {
       super(props);

       this.state = {
         shift: new Animated.Value(0),
         current: 0
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

       if(this.state.cityName !== 'unknown'){
         return (
           <Background cityName={this.state.cityName}>
           </Background>
         )
       }
        // return (
        //    <View style = {styles.container}>
        //       <Text style = {styles.boldText}>
        //          Initial position:
        //       </Text>
        //
        //       <Text>
        //          {this.state.initialPosition}
        //       </Text>
        //
        //       <Text style = {styles.boldText}>
        //          Current position:
        //       </Text>
        //       <Text>
        //          {this.state.lastPosition}
        //       </Text>
        //       <Text style = {styles.boldText}>
        //          City name:
        //       </Text>
        //       <Text>
        //          {this.state.cityName}
        //       </Text>
        //    </View>
        // )
     }
     onScroll(e) {
       this.state.shift.setValue(e.nativeEvent.contentOffset.x);
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

import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated, Dimensions, Platform, AsyncStorage } from 'react-native';
import Background from '../background.js';
import Wallpaper from '../Wallpaper';
import Geocoder from 'react-native-geocoder';
import ForecastBackgroundImage from '../forecastBackgroundImage';
import LineChartExample from '../transitions/LineChartExample';
import Separator from '../transitions/Separator';
import api from './Login/api';
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
    this.props.navigator.setButtons(this.navigatorButtons(this.props.navigator));
    this.state = {
        selectedTab: 'home',
        initialPosition: 'unknown',
        lastPosition: 'unknown',
        cityName: 'unknown',
        icon: '',
        temperature: ''
    };
  }

  navigatorButtons = (navigator) => {
    return {
      leftButtons: [
        {
          id: 'custom-button',
          component: 'CustomButton',
          passProps: {
            text: 'Hi!',
            navigator
          }
        }
      ]
    };
  }

  componentDidMount() {
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
        AsyncStorage.setItem('location', JSON.stringify(res[0]), ()=>{
          this.setState({cityName:res[0].locality});
          var targetDate = new Date();
          api.getWeather(cityName.lat, cityName.lng).then(function(response){
            this.setState({weather: response});
            var findTemp = response.data.filter(function(fctime){
              return fctime.time == targetDate;
            })[0];
            var temp = (findTemp.temperature-32)*5/9;
            var icon = findTemp.icon;
            this.setState({temperature: temp});
            this.setState({icon: icon});
          }.bind(this));
        });
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
      <ForecastBackgroundImage icon={this.state.icon}>
      <Background cityName={this.state.cityName} temperature={this.state.temperature} icon={this.state.icon}>
      </Background>
      <Text style={styles.text}>TIMETABLE</Text>
      {Separator()}
       <LineChartExample weather={this.state.weather}/>
      </ForecastBackgroundImage>

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
   },
   text: {
    fontSize:20,
    color:'white'
   }
})

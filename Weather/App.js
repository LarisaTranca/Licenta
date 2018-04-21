/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  ActivityIndicator,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Entypo'
import Main from './components/screens/mainScreen';
import Locations from './components/screens/locationsScreen';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
const deviceW = Dimensions.get('window').width
import Geocoder from 'react-native-geocoder';
import Wallpaper from './components/Wallpaper';
import HomeScreen from './components/screens/homeScreen';
const basePx = 375
function px2dp(px) {
  return px *  deviceW / basePx
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cityName: this.props.cityName } ;
  }
  componentWillReceiveProps(next) {
    if (this.props.cityName !== next.cityName) {
      this.setState({
        cityName: next.cityName,
      });
    }
  }
  render() {
      return (
        <Wallpaper>
            <Main cityN={this.state.cityName}></Main>
          </Wallpaper>
      );
  }
}

class Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Profile
        </Text>
      </View>
    )
  }
}
class Location extends React.Component {
  render() {
    return (
      <Locations></Locations>
    )
  }
}
export default class App extends React.Component  {

     watchID: ?number = null;
     props: Props;

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
         <TabNavigator style={styles.container}>
           <TabNavigator.Item
             selected={this.state.selectedTab === 'home'}
             title="Home"
             selectedTitleStyle={{color: "#3496f0"}}
             renderIcon={() => <Icon name="home" size={px2dp(22)} color="#666"/>}
             renderSelectedIcon={() => <Icon name="home" size={px2dp(22)} color="#3496f0"/>}
             badgeText="1"
             onPress={() => this.setState({selectedTab: 'home'})}>
             <Home cityName={this.state.cityName}/>
           </TabNavigator.Item>
           <TabNavigator.Item
             selected={this.state.selectedTab === 'profile'}
             title="Profile"
             selectedTitleStyle={{color: "#3496f0"}}
             renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666"/>}
             renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0"/>}
             onPress={() => this.setState({selectedTab: 'profile'})}>
             <Profile/>
           </TabNavigator.Item>
           <TabNavigator.Item
             selected={this.state.selectedTab === 'locations'}
             title="Locations"
             selectedTitleStyle={{color: "#3496f0"}}
             renderIcon={() => <Icon2 name="location" size={px2dp(22)} color="#666"/>}
             renderSelectedIcon={() => <Icon2 name="location" size={px2dp(22)} color="#3496f0"/>}
             onPress={() => this.setState({selectedTab: 'locations'})}>
             <Location/>
           </TabNavigator.Item>
           </TabNavigator>

    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
});
AppRegistry.registerComponent('App', () => App);

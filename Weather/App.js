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
import { registerScreens } from './screens';

import { Navigation } from 'react-native-navigation';
const Icon = require('react-native-vector-icons/Ionicons');
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Main from './components/screens/mainScreen';
import Locations from './components/screens/locationsScreen';
const deviceW = Dimensions.get('window').width
const basePx = 375
function px2dp(px) {
  return px *  deviceW / basePx
}
var settingsIcon;
var settingsOutlineIcon;
var peopleIcon;
var iosNavigateOutline;
var iosNavigate;

registerScreens(); // this is where you register all of your app's screens
async function prepareIcons() {
  const icons = await Promise.all([
    Icon.getImageSource('ios-home', 30),
    Icon.getImageSource('ios-search', 30),
    Icon3.getImageSource('newspaper-o', 30),
    Icon3.getImageSource('user-o', 30),
    Icon2.getImageSource('location', 30),
  ]);
  const [home, explore, feed, user, location] = icons;
  return { home, explore, feed, user, location };
}
async function startApp() {
  const icons = await prepareIcons();
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Home',
      screen: 'mainScreen', // this is a registered name for a screen
      icon: icons.home,
      selectedIcon: require('./components/img/clouds.jpg'), // iOS only
      title: 'Weather',
    },
    {
      label: 'Locations',
      screen: 'locationsScreen',
      icon: icons.location,
      selectedIcon: require('./components/img/clouds.jpg'), // iOS only
      title: 'Locations'
    },{
      label: 'Profile',
      screen: 'profileScreen',
      icon: icons.user,
      selectedIcon: require('./components/img/clouds.jpg'), // iOS only
      title: 'Profile'
    },
    {
      label: 'News Feed',
      screen: 'feedScreen',
      icon: icons.feed,
      selectedIcon: require('./components/img/clouds.jpg'), // iOS only
      title: 'News Feed'
    }
  ],
  appStyle: {
    orientation: 'portrait', // Sets a specific orientation to the entire app. Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
    bottomTabBadgeTextColor: 'red', // Optional, change badge text color. Android only
    bottomTabBadgeBackgroundColor: 'green', // Optional, change badge background color. Android only
      tabBarSelectedButtonColor: '#551A8B',
      tabBarBackgroundColor: '#fff',
      navBarHeight: 50,
      navBarBackgroundColor: '#fff',
      navBarTextColor: '#000000',
    //backButtonImage: require('./pathToImage.png') // Change the back button default arrow image with provided image. iOS only
    hideBackButtonTitle: true/false // Hide back button title. Default is false. If `backButtonTitle` provided so it will take into account and the `backButtonTitle` value will show. iOS only
  },
  tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
    tabBarButtonColor: '#ffff00', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
    tabBarSelectedButtonColor: '#ff9900', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
    tabBarBackgroundColor: '#551A8B', // optional, change the background color of the tab bar
    initialTabIndex: 1, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
  },
  drawer: { // optional, add this if you want a side menu drawer in your app
    left: { // optional, define if you want a drawer from the left
      screen: 'example.FirstTabScreen', // unique ID registered with Navigation.registerScreen
      passProps: {}, // simple serializable object that will pass as props to all top screens (optional),
      fixedWidth: 500, // a fixed width you want your left drawer to have (optional)
    },
    right: { // optional, define if you want a drawer from the right
      screen: 'example.SecondTabScreen', // unique ID registered with Navigation.registerScreen
      passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
      fixedWidth: 500, // a fixed width you want your right drawer to have (optional)
    },
    style: { // ( iOS only )
      drawerShadow: true, // optional, add this if you want a side menu drawer shadow
      contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
      leftDrawerWidth: 50, // optional, add this if you want a define left drawer width (50=percent)
      rightDrawerWidth: 50, // optional, add this if you want a define right drawer width (50=percent)
      shouldStretchDrawer: true // optional, iOS only with 'MMDrawer' type, whether or not the panning gesture will “hard-stop” at the maximum width for a given drawer side, default : true
    },
    type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
    animationType: 'door', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
                                        // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
    disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
  }
});
}
startApp();
AppRegistry.registerComponent('App', () => App);

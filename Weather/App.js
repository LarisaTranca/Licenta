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
  Image,
  AsyncStorage
} from 'react-native';
import { registerScreens } from './screens';

import { Navigation } from 'react-native-navigation';
const Icon = require('react-native-vector-icons/Ionicons');
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Main from './components/screens/mainScreen';
import Locations from './components/screens/locationsScreen';
import CustomButton from './components/transitions/CustomButton';
const deviceW = Dimensions.get('window').width;
import api from './components/screens/Login/api';
import Geocoder from 'react-native-geocoder';
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
  console.disableYellowBox = true;
  const icons = await Promise.all([
    Icon.getImageSource('ios-home', 20),
    Icon.getImageSource('ios-search', 20),
    Icon3.getImageSource('newspaper-o', 20),
    Icon3.getImageSource('user-o', 20),
    Icon2.getImageSource('location', 20),
  ]);
  const [home, explore, feed, user, location] = icons;
  return { home, explore, feed, user, location };
}
async function startApp() {
  const icons = await prepareIcons();
  
  AsyncStorage.getItem('userInfo').then((data)=>{
    var userInfo, listData;var user_id;
    if(data){
      userInfo = data;
      user_id= JSON.parse(data).id;
    }else{
       api.fakeUser({"location": "Timisoara"}).then(function(response){
        userInfo = JSON.stringify(response.user[0]);
        user_id = userInfo.id;
       });
    }
  if(Platform.OS === 'ios'){
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Home',
      screen: 'mainScreen', // this is a registered name for a screen
      icon: icons.home,
      // selectedIcon: require('./components/img/clouds.jpg'), // iOS only
      title: 'Weather'
    },
    {
      label: 'Locations',
      screen: 'locationsScreen',
      icon: icons.location,
      // selectedIcon: require('./components/img/clouds.jpg'), // iOS only
      title: 'Locations'
    },{
      label: 'Profile',
      screen: 'profileScreen',
      icon: icons.user,
      // selectedIcon: require('./components/img/clouds.jpg'), // iOS only
      title: 'Profile'
    },
    {
      label: 'News Feed',
      screen: 'feedScreen',
      icon: icons.feed,
      // selectedIcon: require('./components/img/clouds.jpg'), // iOS only
      title: 'News Feed'
    }
  ],
  appStyle: {
    orientation: 'portrait', // Sets a specific orientation to the entire app. Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
    bottomTabBadgeTextColor: 'red', // Optional, change badge text color. Android only
    bottomTabBadgeBackgroundColor: 'green', // Optional, change badge background color. Android only
      navBarHeight: 60,
      navBarBackgroundColor: '#002b4c',
      navBarTextColor: '#fff',
    backButtonImage: require('./components/img/left-arrow.png'), // Change the back button default arrow image with provided image. iOS only
    hideBackButtonTitle: false // Hide back button title. Default is false. If `backButtonTitle` provided so it will take into account and the `backButtonTitle` value will show. iOS only
  },
  tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
    tabBarButtonColor: '#859cc1', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
    tabBarSelectedButtonColor: '#ff505c', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
    tabBarBackgroundColor: '#002b4c', // optional, change the background color of the tab bar
    initialTabIndex: 0, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
  },
  drawer: { // optional, add this if you want a side menu drawer in your app
    left: { // optional, define if you want a drawer from the left
      screen: 'Menu', // unique ID registered with Navigation.registerScreen
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
  },
  passProps: {
    userInfo: userInfo,
  }
});
}else{
  Navigation.startSingleScreenApp({
  screen: {
      label: 'Home',
      screen: 'mainScreen', // this is a registered name for a screen
      icon: icons.home,
      title: 'Weather',
      navigatorStyle: {
              tabBarBackgroundColor: '#003a66',
              navBarButtonColor: '#859cc1',navBarHeight: 30,
              tabBarButtonColor: '#ffffff',
              navBarTextColor: '#000000',
              tabBarSelectedButtonColor: '#ff505c',
              navigationBarColor: '#003a66',
              navBarBackgroundColor: '#003a66',
              statusBarColor: '#002b4c',
              tabFontFamily: 'BioRhyme-Bold',
              drawUnderTabBar: true,
              topBarCollapseOnScroll: true,selectedTopTabIndicatorColor: "#ffffff",
   selectedTopTabTextColor: "#ffffff",
   navBarTextColor: '#859cc1',
   collapsingToolBarCollapsedColor: '#0f2362',
          },
          navigatorButtons: {
           leftButtons: [
             {
               id: 'sideMenu',
               component: 'CustomButton',
             },
           ],
         },
   topTabs: [
     {
       screenId: 'mainScreen',
       title: 'Home',
       icon: icons.home,
     },
     {
       screenId: 'locationsScreen',
       title: 'Locations',
       icon: icons.location,
     },
     {
       label: 'Profile',
       screenId: 'profileScreen',
       icon: icons.user,
       selectedIcon: require('./components/img/clouds.jpg'), // iOS only
       title: 'Profile'
     },
     {
       label: 'News Feed',
       screenId: 'feedScreen',
       icon: icons.feed,
       selectedIcon: require('./components/img/clouds.jpg'), // iOS only
       title: 'News Feed'
     }
   ],
  },
  drawer: {
    // optional, add this if you want a side menu drawer in your app
    left: {
      // optional, define if you want a drawer from the left
      screen: 'Menu', // unique ID registered with Navigation.registerScreen
      passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
      disableOpenGesture: false, // can the drawer be opened with a swipe instead of button (optional, Android only)
      fixedWidth: 500 // a fixed width you want your left drawer to have (optional)
    },
    right: {
      // optional, define if you want a drawer from the right
      screen: 'example.SecondTabScreen', // unique ID registered with Navigation.registerScreen
      passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
      disableOpenGesture: false, // can the drawer be opened with a swipe instead of button (optional, Android only)
      fixedWidth: 500 // a fixed width you want your right drawer to have (optional)
    },
    style: {
      // ( iOS only )
      drawerShadow: true, // optional, add this if you want a side menu drawer shadow
      // contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
      leftDrawerWidth: 50, // optional, add this if you want a define left drawer width (50=percent)
      rightDrawerWidth: 50 // optional, add this if you want a define right drawer width (50=percent)
    },
    type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
    animationType: 'door', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
    // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
    disableOpenGesture: false // optional, can the drawer, both right and left, be opened with a swipe instead of button
  },
  passProps: {
    userInfo: userInfo,
  }, // simple serializable object that will pass as props to all top screens (optional)
  animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});
}
      });
}
startApp();
AppRegistry.registerComponent('App', () => App);
